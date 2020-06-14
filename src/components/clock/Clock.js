import React from 'react'

const Clock = ({handlePlay, handleReset, clock, cycle, isPlaying}) => {

    const convertToTime = (count) => {
        let minutes = Math.floor(count / 60)
        let seconds = count % 60

        minutes = minutes < 10 ? ('0' + minutes) : minutes
        seconds = seconds < 10 ? ('0' + seconds) : seconds

        return `${ minutes }:${ seconds }`
    }


    return (
        <div className='running-clock'>
            <h2 id='timer-label'>{ cycle }</h2>

            <div id="time-left">
                { convertToTime(clock) }
            </div> 

            <div className='buttons'>
                <button
                    id="start_stop"
                    className={ isPlaying ? 'pause' : 'play' }
                    onClick= {handlePlay}
                >
                    { isPlaying ? 'Pause' : 'Play' }
                </button>

                <button
                    id='reset'
                    className='reset'
                    onClick={ handleReset }
                >
                    Reset
                </button>
            </div>
            
        </div>
    )
}

export default Clock
