window.OneSignal = window.OneSignal || [];


function changeServiceWorkerFilePath() {
    OneSignal.SERVICE_WORKER_PATH = 'PageTest/OneSignalSDKWorker.js';
    OneSignal.SERVICE_UPDATER_WORKER_PATH = 'PageTest/OneSignalSDKUpdaterWorker.js';
    OneSignal.SERVICE_WORKER_PARAM = { scope: '/PageTest/' };
};

OneSignal.push(function () {
    changeServiceWorkerFilePath();
    OneSignal.init({
        appId: "5bc53e0e-df54-43b0-9da3-90efd72057ad",
        autoRegister: false,
        notifyButton: {
          enable: true,
        },
      });
});

document.write(navigator.userAgent);

