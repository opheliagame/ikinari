import { useEffect, useRef, useState } from 'react';
import images from '../data/files.json'

function Frame({ index, beat, position }) {

  const [item, setItem] = useState(images[index])
  const [descWords, setDescWords] = useState(item.descriptions.map(desc => desc.split(',')).flat(1))
  // const item = images[index]
  // const descWords = item.descriptions.map(desc => desc.split(',')).flat(1)


  // const [isFinished, setIsFinished] = useState(false)
    // const descWords = item ? item.descriptions.map(desc => desc.split(',')).flat(1) : []

  useEffect(() => {
    setItem(images[index])
    setDescWords(images[index].descriptions.map(desc => desc.split(',')).flat(1))
  }, [index])

  return (
    <div className="w-full h-full">

      <div className="relative w-full h-full flex flex-col justify-center items-center bg-black" >
        {(beat % 2 == 0) ?
          <div className='w-full h-full bg-contain bg-center relative' style={{ backgroundImage: `url(${item.filePath})` }}>
            <div className="absolute left-0 bottom-12 w-full">
            </div>

            {/* TODO get rid of this button */}
            {/* <div className='absolute right-0 top-0 cursor-pointer bg-black'>
              <p className='text-white' onClick={() => setItem(null)}>X</p>
            </div> */}

          </div>
          :
          <div className='text-center text-8xl font-bold text-yellow-300'>
            <p>{descWords[position] == "null" ? '' : descWords[position]}</p>
          </div>
        }
      </div>
    </div>
  );


}

export default Frame