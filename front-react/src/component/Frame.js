import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

function Frame({ onClickPlay }) {
  const player = useSelector((state) => state.player.value)
  const timeline = player.timeline;
  const sceneIndex = player.sceneIndex;
  const isPlaying = player.isPlaying
  
  const scene = timeline[sceneIndex];

  const filePath = scene != null ? scene.objectURL : null;


  // if (scene == undefined) {
  //   return (
  //     <div>
  //       {/* TODO */}
  //       nothing here
  //     </div>
  //   );
  // }

  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full flex flex-col justify-center items-center bg-black">
        <div
          className="w-full h-full bg-contain bg-center relative"
          style={{ backgroundImage: `url(${filePath})` }}
        >
          <div className="absolute left-0 bottom-0 h-16 w-full bg-zinc-400 bg-opacity-50 text-zinc-200 flex flex-row justify-between items-center">
            
            <div className="h-full py-2 px-4">
              <FontAwesomeIcon
                icon={isPlaying ? faPause : faPlay}
                className="h-full cursor-pointer"
                onClick={onClickPlay}
              />
            </div>
            <div>right</div>
      <span>timeline length {timeline.length} scene number {sceneIndex}</span>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Frame;
