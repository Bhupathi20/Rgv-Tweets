import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import buildspaceLogo from '../assets/buildspace-logo.png';
import RGVLogo from '../assets/RGV.jpg';

const Home = () => {
  const [userInput, setUserInput] = useState('');

  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>Ramuism</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Tweet Like RGV</h1>
          </div>

          <div className="header-subtitle">
            <h2>Since I have been drinking a lot of vodka, please forgive and forget my tweets.</h2>
            <div className="badg">
              <Image src={RGVLogo}  className ="RGVlogo" />
          </div>
          </div>
        </div>
        
        <div className="prompt-container">
          <textarea placeholder="Example: A tweet on Womens Day" className="prompt-box" 
          value={userInput} onChange = {onUserChangedText}/>

            <div className="prompt-buttons">
              <a
                className={isGenerating ? 'generate-button loading' : 'generate-button'}
                onClick={callGenerateEndpoint}
              >
                <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
                </div>
              </a>
            </div>

          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
              <p>{apiOutput}</p>
              </div>
            </div>
          )}

        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://twitter.com/Bhupattii"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            {/* <Image src={buildspaceLogo} 
            alt="buildspace logo" /> */}
            <p>Built by Bhupathi</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
