window.OneSignal = window.OneSignal || [];
var initOptions = {
  appId: "97dce7c1-ab1c-4609-9436-d45ee3aa7143",
  autoRegister: true,
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