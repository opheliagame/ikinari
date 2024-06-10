import { useEffect, useRef, useState } from 'react';
import './App.css';
import images from './data/files.json'
import Frame from './component/Frame'


function App() {
  const [selected, setSelected] = useState(null)

  const handleClick = (item) => {
    setSelected(item)
  }

  return (
    <div className="App w-screen h-screen overflow-y-auto">

      <div className="grid grid-cols-6 md:grid-cols-8 gap-3">
        {images.map((item, index) => (
          <div key={index} className="relative cursor-pointer" onClick={() => handleClick(item)}>
            <img src={item.thumbnailFilePath} alt={item.descriptions} />
            {/* <p className="absolute left-0 bottom-0 uppercase text-sm text-white">{item.descriptions}</p> */}
          </div>
        ))}
      </div>

      {selected ? <Frame item={selected} setItem={setSelected} /> : null}

    </div>
  );
}

export default App;
