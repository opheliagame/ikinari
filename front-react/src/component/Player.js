import { useState, useEffect } from "react"
import images from '../data/files.json'
import Frame from "./Frame"
import Timeline from "./Timeline"

function Player() {
  const [isDebug, setIsDebug] = useState(false)
  
  return (
    <>
      {
        isDebug ?
        <div className="flex flex-row gap-2 justify-stretch">
          {/* <button onClick={toggleIsPlaying}>{ isPlaying ? 'pause' : 'play' }</button> */}

          <button onClick={() => setIsDebug(false)}>close</button>
        </div>
        : null
      }
      
      <div className="w-full h-full">
        <Timeline isDebug={isDebug} />
      </div>
        
    </>
  );

}

export default Player