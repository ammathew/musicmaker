
current_src = "";

recording = false;


function playSound( chakra ) {
    if ( chakra == "one" ) {
        if ( recording == true ) {
            recording = false
        } else {
            recording = true;
        }
    }

    if ( typeof audio != 'undefined' ) {
        audio.src="";
    }
    audio = simHertz( chakraFreqMap[ chakra ]   );
    audio.play();
}


var chakraFreqMap = {
    "one" :256,
    "two" : 288,
    "three" : 320,
}

function simHertz(hz) {
    var audio = new Audio();
    audio.loop = true;
    var wave = new RIFFWAVE();
    var data = [];

    wave.header.sampleRate = 44100;

    var seconds = .5;

    for (var i = 0; i < wave.header.sampleRate * .05; i ++) {
        data[i] = Math.round(128 + 127 * Math.sin(i * 2 * Math.PI * hz / wave.header.sampleRate));
    }
    for (var i = 0; i < wave.header.sampleRate * ( seconds - .1 ); i ++) {
        data[i] = Math.round(128 + 127 * Math.sin(i * 2 * Math.PI * hz / wave.header.sampleRate));
    }

    wave.Make(data);
    audio.src = wave.dataURI;
    return audio;
}

