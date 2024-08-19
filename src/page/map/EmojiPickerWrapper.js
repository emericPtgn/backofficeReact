import { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';

const EmojiPickerWrapper = ({ onEmojiClick, onDeleteMarker }) => {
    const [emojiPickerKey, setEmojiPickerKey] = useState(0);
    const emojiPickerRef = useRef(null);
    const containerRef = useRef(null);
    const reactions = ["1f600", "1f601", "1f602", "1f603"];

    const resetEmojiPicker = () => setEmojiPickerKey(prevKey => prevKey + 1);

    const handleReactionClick = () => { resetEmojiPicker() };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                emojiPickerRef.current &&
                !emojiPickerRef.current.contains(event.target) &&
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                const emojiPickerRect = emojiPickerRef.current.getBoundingClientRect();
                const { clientX, clientY } = event;

                if (
                    clientX < emojiPickerRect.left ||
                    clientX > emojiPickerRect.right ||
                    clientY < emojiPickerRect.top ||
                    clientY > emojiPickerRect.bottom
                ) {
                    resetEmojiPicker();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []); 

    return (
        <div ref={containerRef}>
            <div ref={emojiPickerRef}>
                <EmojiPicker
                    key={emojiPickerKey}
                    reactionsDefaultOpen={true}
                    reactions={reactions}
                    onEmojiClick={onEmojiClick}
                    previewConfig={{ showPreview: false }}
                    onReactionClick={handleReactionClick}
                />
                <button onClick={onDeleteMarker}>supprimer marker</button>
            </div>
        </div>
    );
};

export default EmojiPickerWrapper;
