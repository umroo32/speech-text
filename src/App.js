import useClipboard from "react-use-clipboard";
import "./App.css";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useState } from "react";
function App() {
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition()
  
  const [textCopy, setTextCopy] = useState()
  const [isCopied, setCopied] = useClipboard(textCopy);

  const StartListening = () =>{
    SpeechRecognition.startListening({continuous: true, language: 'en-IN'});
  }
  const StopListening = () =>{
    SpeechRecognition.stopListening();
    setTextCopy(transcript)
  }
  if(!browserSupportsSpeechRecognition){
    return null
  }

  return (
    <div className="text-light container">
      <div className="text-center my-5" style={{ fontSize: "1.5rem" }}>
        <h1 style={{ fontSize: "4rem" }}>Convert Your Speech Into Text</h1>
        <p>
          A React hook that converts speech from the microphone to text
          <br /> and makes it available to your React components.
        </p>
      </div>
      <div className="row my-5">
        <div className="col-8 mx-auto">
          <div className="form-floating text-light text-center" >
         {!transcript? <label className="px-5 " htmlFor="floatingTextarea">
              Type Here: or Speak to type:
            </label>: null}
            <textarea className="py-3 text-light border-0 rounded-4 px-3" style={{caretColor: "transparent",backgroundColor:'#183D3D',width: '50rem',height:'10rem'}}
           value={transcript}/>
            
            
          </div>
          <div className="d-flex justify-content-around my-3">
            <button style={{ fontWeight: "500" }} onClick={setCopied}  className="btn btn-info" >
               {isCopied ? "Copied" : "Copy To Clipboard"}
            </button>
            <button
            onClick={StartListening}
              type="button"
              className="btn btn-primary"
              style={{ fontWeight: "500" }}
            >
              start Listening!
            </button>
            <button
            onClick={StopListening}
              type="button"
              className="btn btn-danger"
              style={{ fontWeight: "500" }}
            >
              Stop Listening!
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
