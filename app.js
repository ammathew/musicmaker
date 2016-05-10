
current_src = "";

recording = false;

/* timing */
seconds = 0;
t = 0;
var audio;

function add() {
    seconds++;
    timer();
}
function timer() {
    t = setTimeout(add, 1000);
    console.log( t );
}

function startStop() {
    if (recording == true ) {
        stopRecording();
        setTimeout( createMelody( records ), 10000 );
        recording = false
    } else {
        recording = true;
        records = []
        startRecording();
    }
}

function startRecording() {
    timer();
};
function stopRecording() {
    clearTimeout(t);
}

function playSound( chakra ) {
    if ( typeof audio != 'undefined' ) {
        audio.src="";
    }
    simHertz( chakra, chakraFreqMap[ chakra ]   );
    audio.play();
};

var chakraFreqMap = {
    "one" :256,
    "two" : 288,
    "three" : 320,
    "four" : 341.3,
    "five" : 384,
    "six" : 426.7,
    "seven" : 480,
}

function simHertz(chakra, hz) {
    audio = new Audio();
    audio.loop = true;
    var wave = new RIFFWAVE();
    var data = [];

    wave.header.sampleRate = 44100;

    var seconds = .5;

    for (var i = 0; i < wave.header.sampleRate; i ++) {
        data[i] = Math.round(128 + 127 * Math.sin(i * 2 * Math.PI * hz / wave.header.sampleRate));
    }
//    for (var i; i < wave.header.sampleRate * ( seconds - .1 ); i ++) {
//        data[i] = Math.round(128 + 127 * Math.sin(i * 2 * Math.PI * 0 / wave.header.sampleRate));
//    }
    
    var aa = {};
    aa[ chakra ] = t;
    
    records.push( aa ); 

    wave.Make(data);
    audio.src = wave.dataURI;
  //  return audio;
}

function createMelody( records ) {
    console.log( 'in create melody' );
    audio.src="";
    audio = new Audio();
    audio.loop = true;
    var wave = new RIFFWAVE();
    var data = [];

    wave.header.sampleRate = 44100;

    var seconds = 5;

    var i=0;
    var x=1;
    
    _.each( records, function( record ) {
        
        
        for(var key in record) {
            
            console.log( key );
            
            for ( wave.header.sampleRate * (x-1) + i ; i <  wave.header.sampleRate * x ; i ++) {
                data[i] = Math.round(128 + 127 * Math.sin(i * 2 * Math.PI * chakraFreqMap[ Object.keys( record )[0] ] / wave.header.sampleRate));
            }   
        }
        x = x + 1
    });
 

    wave.Make(data);
   
    audio.src = wave.dataURI;
    audio.play();


}
