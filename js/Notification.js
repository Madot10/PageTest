window.OneSignal = window.OneSignal || [];
var initOptions = {
  appId: "5bc53e0e-df54-43b0-9da3-90efd72057ad",
  autoRegister: false,
  notifyButton: {
    enable: true
  }
};


function changeServiceWorkerFilePath() {
    OneSignal.SERVICE_WORKER_PATH = 'PageTest/OneSignalSDKWorker.js';
    OneSignal.SERVICE_UPDATER_WORKER_PATH = 'PageTest/OneSignalSDKUpdaterWorker.js';
    OneSignal.SERVICE_WORKER_PARAM = { scope: '/PageTest/' };
};

OneSignal.push(function () {
    changeServiceWorkerFilePath();
    OneSignal.init(initOptions);
});

function log() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(location.href + ':');
    console.log.apply(console, args);
  }
  log('iFrame page loaded and script running.');
  /* From: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#Example */
  var OneSignal = window.OneSignal || [];
  // Called sometime after postMessage is called
  function receiveMessage(event) {
    log('Received a postMessage message:', event);
    // Do we trust the sender of this message?
    // TODO: Be sure to implement this in the future!
    // if (event.origin !== "a.com" || // event.origin !== "b.com" || // event.origin !== "c.com") // return;
    // event.source is window.opener
    // event.data is {command: 'query', extra: {}}
    // Assuming you've verified the origin of the received message (which
    // you must do in any case), a convenient idiom for replying to a
    // message is to call postMessage on event.source and provide
    // event.origin as the targetOrigin.
    if (event.data.command === 'query') {
      OneSignal.push(function () {
        Promise.all([
          OneSignal.isPushNotificationsEnabled(),
          OneSignal.getTags(),
          OneSignal.getUserId()
        ]).then(function (results) {
          log('Got subscription state, tags, and user ID from iFrame:', results);
          event.source.postMessage({
              command: 'reply',
              extra: results
            },
            event.origin);
        })
               .catch(function (e) {
                 log('Error in retrieving iframe state:', e);
               });
      });
    } else if (event.data.command === 'subscribe') {
      log("Setting a tag on this user record to mark that he's subscribing on:" , event.data.extra.origin);
      OneSignal.push(function() {
        var tags = {};
        tags[event.data.extra.origin] = true;
          /*
           The user is already subscribed to push notifications on https://push.yoursite.com.
           All sites opening a popup to https://push.yoursite.com share a subscription.
           To simulate separate subscriptions for sites, we'll just tag the subscriber as
           having subscribed on multiple sites using our tagging system (key-value attribute pairs)
           and when we send notifications we can target users with only a specific site's tag.
           The tag key is the site's origin. e.g. http://abc.com.
           */
        OneSignal.sendTags(tags);
      });
    }
  }
  window.addEventListener("message", receiveMessage, false);
  OneSignal.push(function() {
    OneSignal.on('initialize', function() {
      window.addEventListener("message", receiveMessage, false);
    });
  });