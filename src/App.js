import React, { useState } from 'react';
import './App.css';
import { TextBox } from './TextBox';

const App = () => {
  const [texts, setTexts] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [fontStyle, setFontStyle] = useState('Arial');
  const [fontSize, setFontSize] = useState(16); 

  const addText = () => {
    const newText = {
      id: Date.now(),
      text: 'New Text',
      fontSize: fontSize,
      fontStyle: fontStyle,
      position: { top: 100, left: 100 },
    };
    updateHistory([...texts, newText]);
  };

  const updateText = (id, newText) => {
    const updatedTexts = texts.map((text) =>
      text.id === id ? { ...text, text: newText } : text
    );
    updateHistory(updatedTexts);
  };

  const updateFontStyle = (id, newFontStyle) => {
    const updatedTexts = texts.map((text) =>
      text.id === id ? { ...text, fontStyle: newFontStyle } : text
    );
    updateHistory(updatedTexts);
  };

  const updateFontSize = (id, newFontSize) => {
    const updatedTexts = texts.map((text) =>
      text.id === id ? { ...text, fontSize: newFontSize } : text
    );
    updateHistory(updatedTexts);
  };

  const updatePosition = (id, newPosition) => {
    const updatedTexts = texts.map((text) =>
      text.id === id ? { ...text, position: newPosition } : text
    );
    updateHistory(updatedTexts);
  };

  const updateHistory = (newTexts) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(newTexts);
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
    setTexts(newTexts);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setTexts(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setTexts(history[historyIndex + 1]);
    }
  };

  const handleFontSizeChange = (change) => {
    const newFontSize = fontSize + change;
    setFontSize(newFontSize);
    const updatedTexts = texts.map((text) => ({
      ...text,
      fontSize: newFontSize,
    }));
    updateHistory(updatedTexts);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <button onClick={addText}>Add Text</button>
        <div className="font-controls">
          <button onClick={undo}>Undo</button>
          <button onClick={redo}>Redo</button>
          <select
            value={fontStyle}
            onChange={(e) => setFontStyle(e.target.value)}
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
          <button onClick={() => handleFontSizeChange(2)}>Increase Font Size</button>
          <button onClick={() => handleFontSizeChange(-2)}>Decrease Font Size</button>
        </div>
      </nav>
      <div className="canvas">
        {texts.map((text) => (
          <TextBox
            key={text.id}
            id={text.id}
            text={text.text}
            fontSize={text.fontSize}
            fontStyle={text.fontStyle}
            position={text.position}
            updateText={updateText}
            updateFontStyle={updateFontStyle}
            updateFontSize={updateFontSize}
            updatePosition={updatePosition}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
