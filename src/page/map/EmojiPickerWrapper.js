import { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import DeleteButton from '../../component/common/button/DeleteButton2';
import DeleteButton2 from '../../component/common/button/DeleteButton2';
import DisplayInfosMap from './DisplayInfoMap';

const EmojiPickerWrapper = ({item, resetEmojiPicker, onEmojiClick, onDeleteMarker, emojiPickerKey }) => {
    const emojiPickerRef = useRef(null);
    const containerRef = useRef(null);
    const reactions = ["1f600", "1f601", "1f602", "1f603"];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                resetEmojiPicker();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [resetEmojiPicker]);
    
    return (
        <div className='emoji-wrapper' ref={emojiPickerRef}>
            <EmojiPicker
                key={emojiPickerKey}
                reactionsDefaultOpen={true}
                reactions={reactions}
                onEmojiClick={onEmojiClick}
                previewConfig={{ showPreview: false }}
                onReactionClick={onEmojiClick}
            />
            <div style={{width: '30px', height : '30px'}}>
                <DeleteButton2 tooltip="Effacer marker" onClick={onDeleteMarker} />
            </div>
        </div>
    );
};

export default EmojiPickerWrapper;