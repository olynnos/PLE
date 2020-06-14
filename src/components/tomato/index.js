import React from 'react'
import './Tomato.scss'

const index = () => {
    return (
        <div className="tomato-container">
            <div className="tomato">
                <span className="green" />

                <span className="face-container">
                    <span className="glasses">
                    <span className="cristal" />
                    <span className="cristal" />
                    </span>

                    <span className="sunglasses">
                    <span className="cristal" />
                    <span className="cristal" />
                    </span>

                    <span className="eye" />
                    <span className="eye" />

                    <span className="smile" />
                </span>
            </div>
        </div>
    )
}

export default index
