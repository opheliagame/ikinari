import { useState, useEffect } from "react"
import Timeline from "../component/Timeline";
import Player from "../component/Player";
import {Responsive as ResponsiveGridLayout }from "react-grid-layout";
import GridLayout from "react-grid-layout";
import Preview from "../component/Preview";
import Header from "../component/Header";


function PlayView() {
  const [isDebug, setIsDebug] = useState(false)
  // const ResponsiveGridLayout = WidthProvider(Responsive);
  // {
  //   isDebug ?
  //   <div className="flex flex-row gap-2 justify-stretch">
  //     {/* <button onClick={toggleIsPlaying}>{ isPlaying ? 'pause' : 'play' }</button> */}

  //     <button onClick={() => setIsDebug(false)}>close</button>
  //   </div>
  //   : null
  // }
  // <div className="w-full h-full">
  //       <Player isDebug={isDebug} />
  //     </div>

  // layout is an array of objects, see the demo for more complete usage
  const layout1 = [
    // { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
    // { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    // { i: "c", x: 4, y: 0, w: 1, h: 2 }
    { i: "player", x: 0, y: 0, w: 6, h: 12, static: true,  },
    { i: "timeline", x: 6, y: 0, w: 2.5, h: 12, static: true },
    { i: "preview", x: 9, y: 0, w: 2, h: 12},
  ];

  const layouts = {
    lg: layout1,
    md: layout1,
    sm: layout1,
    xs: layout1,
    xxs: layout1,
  }
        {/* <ResponsiveGridLayout
        className="layout w-screen h-screen"
        width={10}
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 4, xxs: 12 }}
        
      >
        <div key="player">
          <Player />
        </div>
        <div key="timeline">
          <Timeline />
        </div>
      </ResponsiveGridLayout> */}
     
     {/* <GridLayout
        className="layout"
        layout={layout1}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        <div key="player">
          <Player />
        </div>
        <div key="timeline">
          <Timeline />
        </div>
        <div key="preview">
          <Preview />
        </div>
      </GridLayout> */}

  return (
    <div className="w-screen h-screen flex flex-col">


      <div className="flex-1 max-h-full w-full flex flex-col">
        <div className="flex-none h-8">
          <Header />
        </div>

        <div className="flex-1 max-h-full h-full flex flex-row">
          <div className="max-h-full w-2/3">
            <Player />

          </div>

          <div className="w-1/3 max-h-full flex flex-col flex-between relative">
            <div className="flex-1 max-h-full">
              <Timeline />

            </div>

            <div className="absolute bottom-0 h-64 w-full">
              <Preview />

            </div>

            {/* <div className="flex-1 h-64">
              <Preview />

            </div> */}

          </div>


        </div>


      </div>

    </div>
  );

}

export default PlayView