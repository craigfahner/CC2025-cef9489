let midiOuts;

let stateCcOn = [true, true, true, true, true, true];

let stateMidiCcNumber = 20;
let stateMidiChannels = [1, 2, 3, 4, 5, 6];
let stateMidiValues = [-1, -1, -1, -1, -1, -1];

//Init WebMIDI
WebMidi.enable(function (err) {
  if (err) {
    console.error("WebMidi could not be enabled.", err);
  } else {
    console.log("WebMidi enabled, outputs:", WebMidi.outputs);

    // Get the output port (your MIDI device)
    midiOuts = WebMidi.outputs;

    console.log("MIDI out", midiOuts);

    // Check if an output is available
    if (!midiOuts) {
      console.error("No MIDI output available.");
      return;
    }
    
    //set all to zero
    for (let i= 0; i < stateMidiChannels.length; i++){
      sendStateCC(i, 0);
    }
    
  }
});

function convertMlResultsToMidiCC(results) {
  
  sendStateCC(0, state.noise);
  sendStateCC(1, state.muscle);
  sendStateCC(2, state.focus);
  sendStateCC(3, state.clear);
  sendStateCC(5, state.dream);
  
  //calculate meditation
  if (
    eeg.alpha > eeg.delta &&
    eeg.alpha > eeg.theta &&
    eeg.alpha > eeg.beta &&
    eeg.alpha > eeg.gamma
  ) {
    
    sendStateCC(4, 1.0);
  } else {
    sendStateCC(4, 0.0);
  }
  
}

//smoothing
let upInc = 3;
let dnInc = 1

function sendValueAsMidi(cc, value){
  
}

function sendStateCC(stateID, stateValue) {
  //is channel open?
  let channelOpen = stateCcOn[stateID];

  //if open...
  if (channelOpen) {
    //create midi value by mapping down the state mVolts
    let newMidiValue = map(stateValue, 0.0, 1.0, 0, 127);
    newMidiValue = Math.min(127, Math.max(0, newMidiValue));
    newMidiValue = Math.round(newMidiValue);

    //don't send same value repeatedly
    if (newMidiValue != stateMidiValues[stateID]) {
      
      //smoothing
      if (newMidiValue > stateMidiValues[stateID] + upInc){
        stateMidiValues[stateID] += upInc;
      } else if (newMidiValue < stateMidiValues[stateID] - dnInc) {
        stateMidiValues[stateID] -= dnInc;
      } else {
        stateMidiValues[stateID] = newMidiValue;
      }
      
      //get state channel
      let stateMidiChannel = stateMidiChannels[stateID];

      //send to all midi outs
      for (let i = 0; i < midiOuts.length; i++) {
        let midiOut = midiOuts[i];

        midiOut.sendControlChange(
          stateMidiCcNumber,
          stateMidiValues[stateID],
          stateMidiChannel
        );

        // console.log(
        //   "Sent CC message:",
        //   "Channel",
        //   stateMidiChannel,
        //   "CC#",
        //   stateMidiCcNumber,
        //   "Value",
        //   newMidiValue
        // );
      }
    }
  }
}

//TOGGLE STREAMS
//managers if the state data stream is being sent out
//default is off, because ableton will map to all streaming cc'd when doing MIDI mapping

function updateStateCcOn(stateID, newState) {
  console.log("State", stateID, "is now", newState);
  stateCcOn[stateID] = newState;
}

//Test MIDI button
function testMidiButtonClicked(buttonIndex) {
  //send random value between 0 and 1 to midi CC function
  //this will make sure that it's a different value each time
  console.log("State", buttonIndex, "is send a test message for MIDI mapping");
  sendStateCC(buttonIndex, random(1.0))
}
