import React from 'react'

const index = ({title, label, time, handleDecrease, handleIncrease}) => {

    const time_title = title === "Session" ? 'session' : 'break'

    return (
        <div className='time-input'>
            <h3 id={`${label}-label`}>{time_title} length</h3>
            <span id={`${title}-length`}>{time}</span>

            <div className='buttons'>
                <button
                    id={`${title}-decrement`}
                    className='decrease'
                    onClick={handleDecrease}
                >
                    Decrease value
                </button>

                <button
                    id={`${title}-increment`}
                    className='increase'
                    onClick={handleIncrease}
                >
                    Increase value
                </button>
            </div>

        </div>
    )
}

export default index
