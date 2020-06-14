import React, { useState, useEffect} from 'react';
import './App.scss';

import Tomato from './components/tomato'
import TimeInput from './components/time_input'
import Clock from './components/clock'
import Video from './components/video/Video'
import Sound from './assets/sound/sound.mp3'

function App() {

  const [ cycle, setCycle ] = useState('Session')
  const [ sessionTime, setSessionTime ] = useState(1)
  const [ breakTime, setBreakTime ] = useState(1)
  const [ clockCount, setClockCount ] = useState(0)
  const [ started, setStarted ] = useState(false)
  const [ isPlaying, setIsPlaying ] = useState(false)
  const [ loop, setLoop ] = useState(null)
  const [ playVideo, setPlayVideo ] = useState(false)
  const [ sessionCount, setSessionCount ] = useState(0)
  const [ breakCount, setBreakCount ] = useState(0)

  useEffect( () => {

    setClockCount(sessionTime * 10)
    return () => {
      clearInterval(loop)
    }

  }, [ sessionTime, loop ])

  const updateCount = (value) => {
    setClockCount(value * 10)
  }

  const handelSessionDecrease = () => {
    if(sessionTime - 1 > 0){
      setCycle('Session')
      setSessionTime(sessionTime - 1)
    }
    updateCount((sessionTime - 1))
  }

  const handleSessionIncrease = () => {
 
    if(sessionTime + 1 < 61){
      setCycle('Session')
      setSessionTime(sessionTime + 1)
    }

    updateCount((sessionTime + 1))
  }

  const handleBreakDecrease = () => {

    if(breakTime - 1 > 0){
      setCycle('Break')
      setBreakTime(breakTime - 1)
    }

    updateCount((breakTime - 1))
  }

  const handleBreakIncrease = () => {

    if(breakTime + 1 < 61){
      setCycle('Break')
      setBreakTime(breakTime + 1)
    }

    updateCount((breakTime + 1))
  }

  // const handlePlay = () => {

  //   if(!started) {
  //     setClockCount(sessionTime * 60)
  //     setCycle('Session')
  //     setStarted(true)
  //   }
    
  //   if(isPlaying) {
  //     clearInterval(loop);
  //     setLoop(null)
  //     setIsPlaying(false)
  //   } else {
  //     setIsPlaying(true)

  //     setLoop(
  //       setInterval(() => {

  //         setClockCount( prevTime => {

  //           const newTime = prevTime - 1

  //           if(newTime >= 0) {
  //             return (newTime)
  //           }else{
  //             // playSound()

  //             if(cycle === 'Session'){
  //               setCycle('Break')

  //               // setPlayVideo(false)
  //               return (
  //                 breakTime * 60
  //               )
  //             }else if(cycle === 'Break'){
  //               setCycle('Session')

  //               // setPlayVideo(true)
  //               return(
  //                 sessionTime * 60
  //               )
  //             }
  //           }

  //         })      
  //       }, 100)
  //     )
  //   }

  // }

  const handlePlay = () => {

    if(!isPlaying){
      setIsPlaying(true)
    }else{
      setIsPlaying(false)
    }

  }


  const playSound = () => {
    let audio = document.getElementById('beep')
    audio.currentTime = 0
    audio.play()
  }

  const handleReset = () => {
    setCycle('Session')
    setSessionTime(25)
    setBreakTime(5)
    setClockCount(25 * 60)
    setStarted(false)
    setIsPlaying(false)

    clearInterval(loop)
    setLoop(null)

    let audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  }


  const breakProps = {
    title: "Break",
    time: breakTime,
    label: 'break',
    handleIncrease: handleBreakIncrease,
    handleDecrease: handleBreakDecrease
  }

  const sessionProps = {
    title: 'Session',
    time: sessionTime,
    label: 'session',
    handleIncrease: handleSessionIncrease,
    handleDecrease: handelSessionDecrease
  }

  return (
    <div className={`App ${cycle}`}>
      <main id='clock' className="clock">
        <h1>FocusBuddy</h1>
        <Tomato />
        <div className="clock-container">
          <Clock 
            handlePlay={handlePlay}
            handleReset={handleReset}
            clock={clockCount}
            cycle={cycle}
            isPlaying={playVideo}
          />
          <audio id='beep' preload='auto' src={Sound} />
          <div>
            <p>{sessionCount}</p>
            <p>{breakCount}</p>
          </div>
          <div className='set-timer'>
            <TimeInput {...sessionProps} />
            <TimeInput {...breakProps} />
          </div>
          <hr/>
          {/* <Video isPlaying={isPlaying}/> */}
        </div>
      </main>
    </div>
  );
}

export default App;
