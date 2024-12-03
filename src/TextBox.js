import React, { useState } from 'react';

export const TextBox = ({
  id,
  text,
  fontSize,
  fontStyle,
  position,
  updateText,
  updateFontStyle,
  updateFontSize,
  updatePosition,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text);

  const handleTextChange = (e) => setCurrentText(e.target.value);

  const handleSaveText = () => {
    updateText(id, currentText);
    setIsEditing(false);
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragEnd = (e) => {
    const canvas = e.target.closest('.canvas');
    const canvasRect = canvas.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    updatePosition(id, { top: y, left: x });
  };

  return (
    <div
      className="text-box"
      style={{
        fontSize: fontSize + 'px',
        fontFamily: fontStyle,
        position: 'absolute',
        top: position.top,
        left: position.left,
      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="text-box-header">
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <select
          value={fontStyle}
          onChange={(e) => updateFontStyle(id, e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
          <option value="Tahoma">Tahoma</option>
          <option value="Trebuchet MS">Trebuchet MS</option>
          <option value="Comic Sans MS">Comic Sans MS</option>
        </select>
      </div>
      {isEditing ? (
        <div>
          <textarea
            value={currentText}
            onChange={handleTextChange}
            rows="4"
            cols="20"
          />
          <button onClick={handleSaveText}>Save</button>
        </div>
      ) : (
        <p>{text}</p>
      )}
    </div>
  );
};