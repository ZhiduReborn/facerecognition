import React from 'react';
import {Component} from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageToBase64 from 'image-to-base64';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Particles from 'react-particles-js';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import './App.css';

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

const initialState = {
  input: '',
  imageUrl : '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  base64: '',
  user: {
    id:'',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: 0,
      joined: data.joined
    }});
  }

  calculateFaceLocation = (face) => {
    const clarifaiFace = face.region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    };
  }

  displayFaceBox = (data) => {
    const faces = data.outputs[0].data.regions;
    var boxes = faces.map(this.calculateFaceLocation)

    this.setState({ boxes: boxes });
  }

  onFileUpload = (event) => {
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imageUrl : reader.result
      });
      
      ImageToBase64(reader.result)
      .then((response)=>{
        fetch('https://evening-forest-26315.herokuapp.com/imageupload', {
            method: 'post', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              photo: response
            })
          })
          .then( res => res.json())
          .then( res => this.imageHelper(res) )
          .catch( err => console.log(err) );
      }).catch( err => console.log(err));
    }

    reader.readAsDataURL(file);
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    if (this.state.input !== '') {
      this.setState( { imageUrl: this.state.input });
      fetch('https://evening-forest-26315.herokuapp.com/imageurl', {
            method: 'post', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              input: this.state.input
            })
          })
          .then( res => res.json())
        .then( response => this.imageHelper(response))
        .catch( err => console.log(err) );
    }
  }

  imageHelper = (cres) => {
    if (cres){
      //update server
      fetch('https://evening-forest-26315.herokuapp.com/image', {
        method: 'put',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          id: this.state.user.id
        })
      }).then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })

      //display box
      this.displayFaceBox(cres);
    }
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } 
    
    if (route=== 'home') {
      this.setState({ isSignedIn: true });
    } else {
      this.setState({ isSignedIn: false });
    }

    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
          <Particles className='particles' params={particlesOptions} />
          <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
          {
            this.state.route === 'home' ?
              <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm 
                  onFileUpload={this.onFileUpload}
                  onInputChange={this.onInputChange} 
                  onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition boxes={this.state.boxes} imageURL={this.state.imageUrl} />
              </div>
              :
              (
                this.state.route === 'register' ?
                  <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> :
                  <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
              )
          } 
      </div>
    );
  }
}

export default App;
