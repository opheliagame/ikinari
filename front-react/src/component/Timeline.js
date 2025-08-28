import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addScene, setPreviewScene } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faPlus } from "@fortawesome/free-solid-svg-icons";

function Timeline({ isDebug }) {
  const timeline = useSelector((state) => state.player.value).timeline;
  const dispatch = useDispatch();

  const timelineRef = useRef();

  useEffect(() => {
    const onPaste = (e) => {
      e.preventDefault();
      console.log("pasted");

      console.log(e.clipboardData.getData("text"));
    };

    const onDrop = (ev) => {
      ev.preventDefault();

      console.log("dropped");

      let objectURLs = [];

      if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        [...ev.dataTransfer.items].forEach((item, i) => {
          // If dropped items aren't files, reject them
          if (item.kind === "file") {
            const file = item.getAsFile();
            const objectURL = URL.createObjectURL(file);
            objectURLs.push({
              objectURL: objectURL,
              name: file.name,
            });

            console.log(`… file[${i}].name = ${file.name}`);
            console.log(`… object url = ${objectURL}`);
          }
        });
      } else {
        // Use DataTransfer interface to access the file(s)
        [...ev.dataTransfer.files].forEach((file, i) => {
          const objectURL = URL.createObjectURL(file);
          objectURLs.push(objectURL);

          console.log(`… file[${i}].name = ${file.name}`);
        });
      }

      objectURLs.forEach((i) => {
        dispatch(
          addScene({
            objectURL: i.objectURL,
            name: i.name,
          })
        );
      });
    };

    function dragOverHandler(ev) {
      // Prevent default behavior (Prevent file from being opened)
      ev.preventDefault();
    }

    timelineRef.current.addEventListener("paste", onPaste);
    timelineRef.current.addEventListener("drop", onDrop);
    timelineRef.current.addEventListener("dragover", dragOverHandler);

    return () => timelineRef.current.removeEventListener("paste", onPaste);
  }, []);

  function addSceneWithFileSelector() {
    // TODO open file explorer and add scenes in timeline
  }

  return (
    <div ref={timelineRef} className="w-full h-full flex flex-col">
      <div className="flex-none flex flex-row justify-between">
        <p>Timeline</p>
        <div className="flex flex-row gap-2">
          <p>{timeline.length} scenes</p>
          <div className="">
            <FontAwesomeIcon icon={faPlus} className="cursor-pointer" onClick={addSceneWithFileSelector}/>
          </div>
        </div>
      </div>


      <div className="flex-1 bg-zinc-100 overflow-y-auto">
        <div className="h-full ">
          {timeline.map((t) => (
            <div key={t}>
              <Scene objectURL={t.objectURL} name={t.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Scene({ objectURL, name }) {
  const dispatch = useDispatch();

  function setScene() {
    dispatch(
      setPreviewScene({
        objectURL: objectURL,
        name: name,
      })
    );
  }

  return (
    <div className="h-full cursor-pointer overflow-y-auto" onClick={setScene}>
      <div className="py-1 px-2 h-6 flex flex-row gap-2 text-sm">
        <FontAwesomeIcon icon={faGripVertical} />
        <img src={objectURL} alt="" />
        <p>{name}</p>
      </div>
    </div>
  );
}

export default Timeline;
