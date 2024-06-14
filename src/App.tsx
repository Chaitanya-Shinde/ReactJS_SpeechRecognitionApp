import { useEffect, useState } from 'react';
import './App.css'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import useClipboard from "react-use-clipboard";

function App() {

  const startListening = () => SpeechRecognition.startListening({continuous: true, language: 'en-IN'})
  const stopListening = () => SpeechRecognition.stopListening();
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [textResult, setTextResult] = useState('');
  const [isCopied, setCopied] = useClipboard(textResult);


  if(!browserSupportsSpeechRecognition){
    console.log("Browser doesn't support");
    return null;
  }

  useEffect(() => {
    setTextResult(transcript);
  }, [transcript]);

  return (
    <div className='container'>
      <h1>Speech Recognizer</h1>
      <p>This is a simple speech recognizer app made using react and react-speech-recognizer hook</p>
      <textarea defaultValue={transcript} className="text-content">
        
      </textarea>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <div className="btnContainer">
        
        <button onClick={startListening} type="button">Start recording</button>
        <button onClick={stopListening} type="button">Stop recording</button>
        <button onClick={resetTranscript} type="button">Clear Text</button>      
        <button onClick={setCopied}>
          Copy Text 
        </button>
        
      </div>
      <h2>{isCopied ? "Text copied! 👍" : ""}</h2>
    </div>
  )
}

export default App