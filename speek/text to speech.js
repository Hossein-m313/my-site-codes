function speek(text) {
  const synth = window.speechSynthesis;
  let voices = [];
  const populateVoiceList = () => {
    voices = synth.getVoices();
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = "0.7";
    speech.pitch = "0";
    speech.voice = voices[1];
    synth.speak(speech);
  };
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

speek("this is a project with some bugs");
