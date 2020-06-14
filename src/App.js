import React, { Component } from 'react';
import './App.scss';

import Tomato from './components/tomato'
import TimeInput from './components/time_input'
import Clock from './components/clock'
import Video from './components/video/Video'
import Sound from './assets/sound/sound.mp3'

class App extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        cycle: 'Session',
        sessionTime: 5,
        breakTime: 5,
        clockCount: 0,
        started: false,
        isPlaying: false,
        sessionCount: 0,
        breakCount: 0,
        playVideo: false,
        totalSessionTime: 0,
        totalBreakTime: 0
      }
  
      this.loop = undefined;
  
      this.handleBreakDecrease = this.handleBreakDecrease.bind(this);
      this.handleBreakIncrease = this.handleBreakIncrease.bind(this);
      this.handleSessionDecrease = this.handleSessionDecrease.bind(this);
      this.handleSessionIncrease = this.handleSessionIncrease.bind(this);
      this.handlePlay = this.handlePlay.bind(this);
      this.handleReset = this.handleReset.bind(this);
    }
  
    componentDidMount() {
      const sessionTime = this.state.sessionTime;
  
      this.setState({
        clockCount: sessionTime * 2
      });
    }
  
    componentWillUnmount() {
      clearInterval(this.loop);
    }
  
    handleSessionDecrease = () => {
      const sessionTime = this.state.sessionTime;
  
      if(sessionTime - 1 > 0) {
        this.setState({
          cycle: 'Session',
          sessionTime: sessionTime - 1
        });
  
        this.updateCount((sessionTime - 1));
      }
    }
  
    handleSessionIncrease = () => {
      const sessionTime = this.state.sessionTime;
  
      if(sessionTime + 1 < 61) {
        this.setState({
          cycle: 'Session',
          sessionTime: sessionTime + 1
        });
  
        this.updateCount((sessionTime + 1))
      }
    }
  
    handleBreakDecrease = () => {
      const breakTime = this.state.breakTime;
  
      if(breakTime - 1 > 0) {
        this.setState({
          cycle: 'Break',
          breakTime: breakTime - 1
        });
  
        this.updateCount((breakTime - 1))
      }
    }
  
    handleBreakIncrease = () => {
      const breakTime = this.state.breakTime;
  
      if(breakTime + 1 < 61) {
        this.setState({
          cycle: 'Break',
          breakTime: breakTime + 1
        });
  
        
        this.updateCount((breakTime + 1))
      }
  
    }
  
    updateCount(value) {
      this.setState({
        clockCount: value * 60
      });
    }
  
    handlePlay = () => {
      const isPlaying = this.state.isPlaying;
      const sessionTime = this.state.sessionTime;
      const started = this.state.started;
  
      if(!started) {
        this.setState({
          clockCount: sessionTime * 2,
          cycle: 'Session',
          started: true
        });
      }
      
      if(isPlaying) {
        clearInterval(this.loop);
  
        this.setState({
          isPlaying: false,
        });
      }
      else {
        this.setState({
          isPlaying: true,
          playVideo: true
        });
  
        this.loop = setInterval(() => {
          const clockCount = this.state.clockCount;
          const cycle = this.state.cycle;
          const breakTime = this.state.breakTime;
          const sessionTime = this.state.sessionTime;
          const sessionCount = this.state.sessionCount;
          const breakCount = this.state.breakCount;
          const totalSessionTime = this.state.totalSessionTime;
          const totalBreakTime = this.state.totalBreakTime;
  
          if(clockCount === 0) {
            this.setState({
              cycle: cycle === 'Session' ? 'Break' : 'Session',
              clockCount: cycle === 'Session' ? (breakTime * 2) : (sessionTime * 2),
              playVideo: cycle === 'Session' ? false : true
            });

            cycle === 'Session' ? this.setState({totalSessionTime: totalSessionTime + sessionTime}) : this.setState({totalBreakTime: totalBreakTime + breakTime})
            cycle === 'Session' ? this.setState({sessionCount: sessionCount + 1}) : this.setState({breakCount: breakCount + 1})
            // this.playSound();
          } 
          else {
            this.setState({
              clockCount: clockCount - 1,
            });
          }        
        }, 1000);
      }
    }
  
    playSound() {
      let audio = document.getElementById('beep');
      audio.currentTime = 0;
      audio.play();
    }
  
    handleReset = () => {
      this.setState({
        cycle: 'Session',
        sessionTime: 25,
        breakTime: 5,
        clockCount: 25 * 60,
        started: false,
        isPlaying: false
      });
  
      clearInterval(this.loop);
  
      let audio = document.getElementById('beep');
      audio.pause();
      audio.currentTime = 0;
    }
  
    render() {
      const breakProps = {
        title: 'Break',
        time: this.state.breakTime,
        handleDecrease: this.handleBreakDecrease,
        handleIncrease: this.handleBreakIncrease
      }
  
      const sessionProps = {
        title: 'Session',
        time: this.state.sessionTime,
        handleDecrease: this.handleSessionDecrease,
        handleIncrease: this.handleSessionIncrease
      }
  
      return (
        <div className={`App ${ this.state.cycle }`}>
          <main id="clock" className="clock">
            <h1>FocusBuddy</h1>
  
            <Tomato />
  
            <div className="clock-container">
              <Clock
                handlePlay={ this.handlePlay }
                handleReset={ this.handleReset }
                clock={ this.state.clockCount }
                cycle={ this.state.cycle }
                isPlaying={ this.state.isPlaying }
              />
  
              <audio id="beep" preload="auto" src={ Sound } />

              <div>
                <p>Session Count: {this.state.sessionCount} / { this.state.totalSessionTime }</p>
                <p>Break Count: {this.state.breakCount} / { this.state.totalBreakTime}</p>
              </div>

              <div className="set-timer">
                <TimeInput {...sessionProps} />
                <TimeInput {...breakProps} />
              </div>

              <Video isPlaying={this.state.playVideo}/>
            </div>
          </main>
        </div>
        
      );
    }
  }
  
  export default App;
  