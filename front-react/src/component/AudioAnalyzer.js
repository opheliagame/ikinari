// src/AudioAnalyzer.js
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import Meyda from 'meyda';
import { useSelector } from 'react-redux';

const AudioAnalyzer = forwardRef(({ onCallback }, ref) => {
  const [isDebug, setIsDebug] = useState(onCallback == null ? true : false)
  const [features, setFeatures] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);
  const buttonRef = useRef(null)
  const audioFileRef = useRef(null)
  const audioContextRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const analyzerNodeRef = useRef(null);
  const meydaAnalyzerRef = useRef(null);

  const player = useSelector(state => state.player.value)
  const isPlaying = player.isPlaying

  const initAudio = async () => {
    console.log("creating new audio context")
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // sourceNodeRef.current = audioContextRef.current.createMediaStreamSource(stream);
    const currentAudioFile = ref != null ? ref.current : audioFileRef.current
    
    if(sourceNodeRef.current != null) return

    sourceNodeRef.current = audioContextRef.current.createMediaElementSource(currentAudioFile);
    analyzerNodeRef.current = audioContextRef.current.createAnalyser();

    sourceNodeRef.current.connect(analyzerNodeRef.current);
    sourceNodeRef.current.connect(audioContextRef.current.destination)

    meydaAnalyzerRef.current = Meyda.createMeydaAnalyzer({
      audioContext: audioContextRef.current,
      source: sourceNodeRef.current,
      bufferSize: 512,
      featureExtractors: ['rms', 'zcr', 'spectralCentroid', 'spectralFlatness'],
      callback: (features) => {
        setFeatures(features);
        if (onCallback != null) {
          onCallback(features.rms)
        }
      },
    });

    meydaAnalyzerRef.current.start();

  };

  if(isPlaying) {
    if(isInitialized) return

    // if(isInitialized == false) {
      initAudio()
      setIsInitialized(true)

    // }
  }

  // useEffect(() => {
  //   if (!audioContextRef.current) {
  //     console.log("init audio analyzer")

  //     initAudio();
  //     setIsInitialized(true)
  //     // buttonRef.current.click()
  //   }


  //   return () => {
  //     if (meydaAnalyzerRef.current) {
  //       meydaAnalyzerRef.current.stop();
  //     }
  //     if (audioContextRef.current) {
  //       audioContextRef.current.close();
  //     }
  //   };
  // }, []);

  

  return (
    <div>
      {

        <>
          {/* <button

            ref={buttonRef}
            onClick={() => {
              console.log("clicking button")
              initAudio()
              setIsInitialized(true)
            }}>
            Start Audio Analysis
          </button> */}
          {
            ref == null
              ?
              <audio
                ref={audioFileRef}
                controls
                loop
                id="audio"
                className='hidden'
                src="asset/tabla.mp3">
              </audio>
              : null
          }

          {
            isDebug
              ?
              <>
                <h1>Audio Analyzer</h1>
                {
                  (
                    <pre>{JSON.stringify(features, null, 2)}</pre>
                  )
                }
              </>
              : null
          }

        </>
        // : null
      }

    </div>
  );
});

export default AudioAnalyzer;
