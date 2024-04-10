import React, { useRef, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import './SignaturePad.css';
import img1 from './img1.png';

const SignaturePad = () => {
  const signaturePadRef = useRef(null);
  const [canvasData, setCanvasData] = useState(null);
  const [brushRadius, setBrushRadius] = useState(2); // State to hold the brush radius

  const handleSave = () => {
    // Get the save data after adding the white background
    const linesData = signaturePadRef.current.getSaveData();
    setCanvasData(linesData); // Pass the saveData directly

    // Save the image data to local machine
    const imgData = signaturePadRef.current.canvasContainer.children[1].toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'signature.png';
    link.click();
  };

  const handleClear = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  const handleChangeBrushSize = (event) => {
    setBrushRadius(parseInt(event.target.value)); // Update the brush radius based on user input
  };

  return (
      <div className="signature-pad-form">
        <div className="header-container"> {/* New container for h1 and img */}
          <img src={img1} className='img1' alt="Description of the image" />
          <h1>Digital Signature</h1>
        </div>
        <p>Convert handwritten signature into a digital signature in a stroke.</p>
    
        <div className="canvas-container">
          <CanvasDraw
            ref={signaturePadRef}
            canvasWidth={500}
            canvasHeight={200}
            brushRadius={brushRadius} // Use brush radius from state
            brushColor="#000000"
            lazyRadius={0.1}
            hideGrid={true}
            hideInterface={false}
            immediateLoading={true}
            saveData={canvasData} // Pass the saveData directly
            backgroundColor="#FFFFFF" // Set the background color to white
            className="canvas-draw" // Add a class name to style the canvas
          />
        </div>
        <div className="brush-size-container">
          <label htmlFor="brush-size">Stroke Size:</label>
          <input
            type="range"
            id="brush-size"
            min="1"
            max="10"
            value={brushRadius} // Set the value of the range input to the brush radius
            onChange={handleChangeBrushSize} // Handle changes to the range input
          />
          {/* <span>{brushRadius}</span> */}
        </div>
        <div className="button-container">
          <button className="clear-button" onClick={handleClear}>Clear</button>
          <button className="submit-button" onClick={handleSave}>Submit</button>
        </div>
      </div>
    );    
};

export default SignaturePad;

