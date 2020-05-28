let audioCtx: AudioContext;
const tempo = 100.0;
const secondsPerBeat = 60.0 / tempo;
let lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
let scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)
let currentNote = 0;
let nextNoteTime = 0.0; // when the next note is due.
let timerID: number;
let isPlaying = false;
let rcListener: () => void;
let trListener: (runningTime: number) => void;

function nextNote() {
    // Add beat length to last beat time
    nextNoteTime += secondsPerBeat;
    // Advance the beat number, wrap to zero
    if (++currentNote >= 30) {
        currentNote = 0;
    }
    if (currentNote === 0) rcListener();
}

function playSweep() {
    let osc = audioCtx.createOscillator();
    let gain = audioCtx.createGain();
    osc.connect(gain);
    osc.type = "sine";
    osc.frequency.value = currentNote === 0 ? 320 : 277;
    gain.connect(audioCtx.destination);
    gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.9);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.9);
}

function scheduler() {
    // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
    while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime) {
        playSweep();
        nextNote();
    }
    trListener(audioCtx.currentTime);
    timerID = window.setTimeout(scheduler, lookahead);
}

export const playOrPause: (audioContext: AudioContext, timeRunListener: (runningTime: number) => void, roundCompleteListener: () => void) => boolean = (audioContext: AudioContext, timeRunListener: (runningTime: number) => void, roundCompleteListener: () => void) => {
    rcListener = roundCompleteListener || (() => {});
    trListener = timeRunListener || (() => {});
    audioCtx = audioContext;
    isPlaying = !isPlaying;
    if (isPlaying) {
        // check if context is in suspended state (autoplay policy)
        if (audioCtx.state === "suspended") {
            audioCtx.resume();
        }
        currentNote = 0;
        nextNoteTime = audioCtx.currentTime;
        scheduler(); // kick off scheduling
        return true;
    } else {
        window.clearTimeout(timerID);
        timeRunListener(0);
        return false;
    }
};
