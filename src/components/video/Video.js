import React, { useState } from 'react'
import ReactPlayer from 'react-player'

const Video = ({isPlaying}) => {

    const [ videoList, setVideoList ] = useState([
        'q76bMs-NwRk',
        'Tn8IDh21AVY',
        'd9p65OA696U'
    ])

    const [ video, setVideo ] = useState(videoList[0])

    const shuffleVideo = () => {
        let index = Math.floor(Math.random() * videoList.length)
        setVideo(videoList[index])
    }

    return (
        <div className='video_player_container'>
            <div className='buttons video_buttons'>
                <h3 className='video_player_button'>Shuffle Video</h3>
                <button
                    className='reset'
                    onClick={shuffleVideo}
                >
                    Shuffle
                </button>
            </div>
            <ReactPlayer
                url={`https://www.youtube.com/embed/${ video }`}
                playing={isPlaying}
                onEnded={() => shuffleVideo}
            />
        </div>
    )
  
}

export default Video
