
import React from 'react';
import './App.css';

const buttonConfigs = [
  { key: "Q", soundName: "Clap", soundLink: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
  { key: "W", soundName: "Open-HH", soundLink: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
  { key: "E", soundName: "Heater-1", soundLink: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  { key: "A", soundName: "Heater-2", soundLink: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  { key: "S", soundName: "Heater-3", soundLink: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  { key: "D", soundName: "Heater-4", soundLink: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
  { key: "Z", soundName: "Kick-n'-Hat", soundLink: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  { key: "X", soundName: "Kick", soundLink: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
  { key: "C", soundName: "Closed-HH", soundLink: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" },
]


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      soundPlaying: ""
    }
    this.createDrumPadButton = this.createDrumPadButton.bind(this);
    this.playSound = this.playSound.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  createDrumPadButton({key, soundName, soundLink}) {
    return (
      <button key={key} id={soundName} className="drum-pad" onClick={() => this.playSound(key)} >{key} 
        <audio id={key} src={soundLink} className="clip" ></audio> 
      </button>
    )
  }  

  componentDidMount() {
    console.log("mount"); 
    document.addEventListener("keydown", this.handleKeyDown); 
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  playSound(letter) {
    if (document.getElementById(letter) !== null) {
      document.getElementById(letter).play();
      const {soundName} = buttonConfigs.find(({key}) => key.toUpperCase() === letter);
      this.setState(
        {soundPlaying: soundName }
      ); 
      document.getElementById(soundName).classList.add("active");
      setTimeout(
        () => {
          document.getElementById(soundName).classList.remove("active");
        },
        300
      )
    }
  }

  handleKeyDown(event) {
    this.playSound(event.key.toUpperCase()); 
  }
  
  render() {
    const drumPadButtons = buttonConfigs.map((buttonConfig) => this.createDrumPadButton(buttonConfig));

    return (
      <div id="drum-machine">
        <div id="pad-container">
          {drumPadButtons}
        </div>
        <div id="display">
          <p>Last time you heard this sound: </p>
          <br></br>
          <p>{this.state.soundPlaying}</p>
        </div>
      </div>
    )
  }
}

export default App;
