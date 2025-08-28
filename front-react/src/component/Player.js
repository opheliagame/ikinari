import { useRef, useState, useEffect } from "react";
import AudioAnalyzer from "./AudioAnalyzer";
// import images from '../data/files.json'
import Frame from "./Frame";
import { useDispatch, useSelector } from "react-redux";
import { incrementScene, togglePlay } from "../store";

function Player({ isDebug }) {
  const audioFileRef = useRef(null);

  const timeline = useSelector((state) => state.player.value).timeline;
  const scene = useSelector((state) => state.player.value).sceneIndex;
  const dispatch = useDispatch();
  // const [images, setImages] = useState(timeline)

  const [isPlaying, setIsPlaying] = useState(false);
  const [rms, setRms] = useState(0);
  const [beat, setBeat] = useState(0); // external source - timeline
  // const [index, setIndex] = useState(0)   // position -> index
  // const [item, setItem] = useState(images[index])   // index -> item
  // const [limit, setLimit] = useState(() => {   // index -> limit
  //   const descWords = item.descriptions.map(desc => desc.split(',')).flat(1)
  //   return descWords.length
  // })
  const [limit, setLimit] = useState(() => {
    // index -> limit
    const descWords = [].map((desc) => desc.split(",")).flat(1);
    return descWords.length;
  });
  const [position, setPosition] = useState(0); // beat, limit -> position

  // useEffect(() => {
  //   // beat -> index
  //   if(beat != 0 && beat == ((limit * 2) - 1)) {
  //     playNext()
  //   }
  // }, [beat])

  // useEffect(() => {
  //   // index -> item, index -> limit
  //   // setItem(images[index])
  //   // // setLimit(images[index].descriptions.map(desc => desc.split(',')).flat(1).length)
  //   // setLimit(0)
  // }, [images])

  // useEffect(() => {
  //   // beat, limit -> position
  //   if (beat % 2 != 0) {
  //     setPosition(position => {
  //       // console.log("here")
  //       // console.log("position")
  //       // console.log((position + 1) % limit)
  //       return (position + 1) % (limit == 1 ? 2 : limit)
  //     })
  //   }
  // }, [beat])

  // useEffect(() => {
  //   // position -> index
  //   if(position == (limit - 1)) {
  //     playNext()
  //   }
  // }, [position])

  const toggleIsPlaying = () => {
    setIsPlaying(!isPlaying);
  };

  const playAudioFile = () => {
    console.log("playing audio")
    if (isPlaying) {
      audioFileRef.current.pause();
    } else {
      audioFileRef.current.play();
    }
    toggleIsPlaying();
  };

  const playNext = () => {
    console.log("playing next");

    console.log(scene);
    console.log(timeline);
    console.log(timeline.length);
    if (scene === -1) {
      // dispatch(setCurrentScene({
      //   index: 0,
      //   sc: timeline[0],
      // }))
      console.log("-1");

      dispatch(incrementScene(0));
    } else {
      const nextIndex = scene + 1;
      console.log(nextIndex);
      // dispatch(setCurrentScene({
      //   index: nextIndex,
      //   sc: timeline[nextIndex],
      // }))

      dispatch(incrementScene(nextIndex));
    }
  };

  const calculateBeat = (rms) => {
    setRms(rms);
    if (rms > 0.15) {
      // setBeat(beat => beat + 1)
      playNext();
    }
  };

  function play() {
    dispatch(togglePlay())

    playAudioFile()
  }

  return (
    <>
      {isDebug ? (
        <>
          <p>{rms}</p>
        </>
      ) : null}

      <div className="w-full h-full flex flex-col">
        <audio
          ref={audioFileRef}
          controls
          loop
          id="audio"
          className="hidden"
          src="asset/tabla.mp3"
        ></audio>
        <AudioAnalyzer ref={audioFileRef} onCallback={calculateBeat} />
        <div className="aspect-video">
          <Frame onClickPlay={play} />
        </div>

        {/* <div className="w-full absolute bottom-10 flex flex-row justify-center text-white">
          <button className="text-xl" onClick={playAudioFile}>
            { !isPlaying ? <p>&#x25BA;</p> : <p>&#x23F8;</p>}
          </button>
        </div> */}
      </div>

      <slot></slot>
    </>
  );
}

export default Player;
