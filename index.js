var alarm = {
    //PROPERTIES
    sound : null, //alarm sound
    aNow : null, //html current time
    aWrap : null, //html wrapper
    aSet : null, //html set alarm
    aToggle : null, //html submit
    aTime : null, //alarm time

    //INITIALIZE
    init : () => {
        //ALARM SOUND
        alarm.sound = new Audio("alarm.wav");

        //GET HTML ELEMENTS
        alarm.aNow = document.getElementById("aNow");
        alarm.aWrap = document.getElementById("aWrap");
        alarm.aSet = document.getElementById("aSet");
        alarm.aToggle = document.getElementById("aToggle");

        //TICKER
        setInterval(alarm.tick, 1000);
    },

    //TICKER
    tick : () => {
        //CURRENT TIME
        let now = new Date(),
        h = now.getHours(),
        m = now.getMinutes(),
        s = now.getSeconds();

        //SHOW IN HH:MM:SS FORMAT
        let hm = (h<10 ? "0"+h : h) + ":" + (m<10 ? "0"+m : m),
        hms = hm + ":" + (s<10 ? "0"+s : s);
        alarm.aNow.innerHTML = hms;

        // CHECK ALARM TIME
        if (hm == alarm.aTime && alarm.sound.paused) {
            alarm.sound.play();
            alarm.aToggle.value = "Stop Alarm";
            alarm.aWrap.classList.add("sounding");
        }
    },

    //TOGGLE ALARM
    toggle : () => {
        //STOP ALARM
        if(alarm.aTime){
            alarm.aTime = null;
            alarm.sound.pause();
            alarm.sound.currentTime = 0;
            alarm.aSet.disabled = false;
            alarm.aToggle.value = "Set Alarm";
            alarm.aWrap.classList.remove("sounding");
        }

        //SET ALARM
        else {
            alarm.aTime = alarm.aSet.value;
            alarm.aSet.disabled = true;
            alarm.aToggle.value = "Alarm Set";
        }
        return false;
    }
};

//START
window.addEventListener("load", alarm.init);