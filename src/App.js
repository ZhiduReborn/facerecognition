import React from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
  apiKey: '4d2caa434a5341c8883be08712072b00'
});



const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 600
      }
    }
  },
  interactivity: {
    detect_on:"window",
    events: {
      onclick: {
        enable: true,
        mode: 'repulse'
      }
    },
    modes: {
      repulse: {
        distance: 120,
        duration: 0.1
      }
    }
  }
}

function App() {
  return (
    <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        <FaceRecognition />
        
    </div>
  );
}

export default App;
