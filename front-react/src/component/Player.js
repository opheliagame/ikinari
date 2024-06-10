import { useState, useEffect } from "react"
import images from '../data/files.json'
import Frame from "./Frame"

function Player() {
  const [isDebug, setIsDebug] = useState(true)

  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const [item, setItem] = useState(images[index])
  const [limit, setLimit] = useState(() => {
    const descWords = item.descriptions.map(desc => desc.split(',')).flat(1)
    return descWords.length
  })
  const [position, setPosition] = useState(0)
  const [beat, setBeat] = useState(0)

  const toggleIsPlaying = () => {
    setIsPlaying(!isPlaying)
  }

  const playNext = () => {
    console.log("playing next")
    setIndex(index => {
        const nextIndex = (index + 1) % images.length
      setItem(images[nextIndex])
      setLimit(images[nextIndex].descriptions.map(desc => desc.split(',')).flat(1).length)
      return nextIndex
    })
    
  }

  useEffect(() => {
    if(!isPlaying) {
      return
    }
    setItem(images[index])
    setLimit(images[index].descriptions.map(desc => desc.split(',')).flat(1).length)
    setPosition(0)
    setBeat(0)

    // TODO make the beat variable 
    const timerid = setInterval(() => {
      setBeat(beat => {
        if (beat % 2 != 0) {
          console.log("here")
          setPosition(position => {
            return (position + 1) % limit
          })
        }
        
        if(beat != 0 && beat == ((limit * 2) - 1)) {
          console.log("setting is finished")
          console.log("beat ", beat)
          console.log("limit ", limit)
          playNext()
        }

        return beat + 1
      })
      
    }, 500);

    return () => clearInterval(timerid)
  }, [index, isPlaying])

  return (
    <>
      {
        isDebug ?
        <div className="flex flex-row gap-2 justify-stretch">
          <button onClick={toggleIsPlaying}>{ isPlaying ? 'pause' : 'play' }</button>

          <button onClick={() => setIsDebug(false)}>close</button>
        </div>
        : null
      }
      <Frame index={index} beat={beat} position={position} />
    </>
  );

}

export default Player