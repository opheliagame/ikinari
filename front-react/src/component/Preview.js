import { useDispatch, useSelector } from "react-redux";

function Preview() {
  const scene = useSelector((state) => state.preview.value);

  return (
    <div className="h-full w-full flex flex-col bg-white">
      <p className="flex-none">Preview Pane</p>
      {scene == null ? (
        <div>nothing here</div>
      ) : (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-contain">
            <div
              className="w-full h-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${scene.objectURL})` }}
            ></div>
          </div>

          <p className="flex-none">{scene.name}</p>
        </div>
      )}
    </div>
  );
}

export default Preview;
