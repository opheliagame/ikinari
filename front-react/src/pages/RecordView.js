import { useEffect, useRef, useState } from 'react';
import images from '../data/files.json'
import Frame from '../component/Frame';
import { ReactMediaRecorder } from "react-media-recorder";


function RecordView() {
  const recorderWindow = useRef(null);
  const [selected, setSelected] = useState(null)

  const handleClick = (item) => {
    setSelected(item)
  }

  return (
    <div className="w-screen h-screen grid grid-cols-[2fr_1fr]">
      <div className="w-full h-full">
        {/* {selected ? <Frame item={selected} setItem={setSelected} /> : null} */}
        <ReactMediaRecorder 
          // customMediaStream={recorderWindow.current ? recorderWindow.current.captureStream() : null}
          screen
          render={({status, startRecording, stopRecording, mediaBlobUrl}) => (
            <div ref={recorderWindow} className='w-full h-full relative'>
              <div className='absolute bottom-2 left-2 z-10'>
                <button className='bg-white p-2 text-black' onClick={status == "recording" ? stopRecording : startRecording}>
                  {status == "recording" ? 'stop' : 'start'}

                </button>

              </div>

              {selected ? <Frame item={selected} setItem={setSelected} /> : null}

              <video src={mediaBlobUrl} controls autoPlay loop />
            </div>

          )}
        />
      
      </div>
      <div className="overflow-y-auto">
        {images.map((item, index) => (
          <div key={index} className="relative cursor-pointer" onClick={() => handleClick(item)}>
            <p>{ item.thumbnailFilePath }</p>
          </div>
        ))}
      </div>
    </div>
  );

}

export default RecordView