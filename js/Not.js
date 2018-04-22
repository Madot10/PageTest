window.OneSignal = window.OneSignal || [];

var initOptions = {
    appId: "ddecc811-167e-42a9-92ba-955bef5af634",
    autoRegister: false,
    notifyButton: {
      enable: true,
    },
  };
/*
function changeServiceWorkerFilePath() {
    OneSignal.SERVICE_WORKER_PATH = 'UCalculadora//OneSignalSDKWorker.js';
    OneSignal.SERVICE_UPDATER_WORKER_PATH = 'UCalculadora//OneSignalSDKUpdaterWorker.js';
    OneSignal.SERVICE_WORKER_PARAM = { scope: '/UCalculadora/' };
};
*/

function changeServiceWorkerFilePath() {
    OneSignal.SERVICE_WORKER_PATH = 'PageTest/OneSignalSDKWorker.js';
    OneSignal.SERVICE_UPDATER_WORKER_PATH = 'PageTest/OneSignalSDKUpdaterWorker.js';
    OneSignal.SERVICE_WORKER_PARAM = { scope: '/PageTest/' };
};

OneSignal.push(function () {
    changeServiceWorkerFilePath();
    OneSignal.init(initOptions);

    OneSignal.on('subscriptionChange', function (isSubscribed) {
        //Change
        if(isSubscribed){
            //Esta suscrito
            OneSignal.sendTag("user_completed","false");
           // LauchModal();
            OpenDiv('notificaciones');
            
        }
    });
});

//Chequear estado de suscripcion. DEVUELVE BOOLEAN
function checkSusc(){
    let state;

    OneSignal.push(function(){

        OneSignal.getUserId(function(userId){
            console.log('User id: '+userId);
            if(userId = null){
                state = false;
            }else{
                state=true;
            }
        });
    });

    return state;
}

//Estado del prop permision DEVUELVE BOOLEAN
function statePermission(){
    let stPer;

    OneSignal.push(["getNotificationPermission", function(permission) {
        //console.log("Site Notification Permission:", permission);
        // (Output) Site Notification Permission: default
        if(permission == 'denied'){
            //negada
            stPer = false;
        }else{
            //aceptada o normal
            stPer = true;
        }
    }]);

    return stPer;
}

function lauchPermission(){
    let IsAcept = statePermission();

    if(IsAcept){
        //No suscrito y poder mostrar el prop
        OneSignal.push(function() {
           OneSignal.registerForPushNotifications();
          });
    }else{
        //No suscrito y negado el prop

    }
}