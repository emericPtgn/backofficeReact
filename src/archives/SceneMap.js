import EmojiPicker from "emoji-picker-react";
import MyMap from "../page/map/Map";
import DisplayInfosMap from "../page/scene/DisplayInfoMap";

const SceneMap = ({containerRef, emojiPickerRef, emojiPickerKey, marker, scene, 
    handleClick, reactions, handleReactionClick, onEmojiClick, previewConfig}) => {
    return (
      <>
      <div ref={containerRef}>
          <div>
            <div ref={emojiPickerRef}>
              <EmojiPicker key={emojiPickerKey} reactionsDefaultOpen={true} reactions={reactions} 
              onReactionClick={handleReactionClick} previewConfig={previewConfig} onEmojiClick={onEmojiClick}/>
            </div>
            <DisplayInfosMap marker={marker} scene={scene} />
          </div>
          <MyMap handleClick={handleClick} item={scene} />
      </div>
      </>
    )
  }

export default SceneMap;