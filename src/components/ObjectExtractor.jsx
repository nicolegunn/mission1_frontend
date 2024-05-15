import React, { useState, useRef, useEffect } from "react";

export default function ObjectExtractor({ image, boundingBox }) {
  const [extractedObject, setExtractedObject] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!image || !boundingBox) return;

    // Check if image is a valid URL or data URI
    const isValidImage = (url) => {
      const img = new Image();
      img.src = url;
      return img.complete || img.width + img.height > 0;
    };

    if (!isValidImage(image)) {
      console.error("Invalid image URL or data URI:", image);
      return;
    }

    const ctx = canvasRef.current.getContext("2d");
    const { x, y, w, h } = boundingBox;

    // Create a new image element
    const img = new Image();
    img.onload = () => {
      // Draw the image on the canvas
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      // Draw bounding box
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);

      // Extract object
      const extractedImageData = ctx.getImageData(x, y, w, h);
      setExtractedObject(extractedImageData);
    };
    img.src = image; // Set the image src after defining the onload handler
  }, [image, boundingBox]);

  return (
    <div>
      {extractedObject && (
        <canvas
          ref={canvasRef}
          width={boundingBox.w}
          height={boundingBox.h}
          style={{ border: "1px solid black" }}
        />
      )}
    </div>
  );
}
