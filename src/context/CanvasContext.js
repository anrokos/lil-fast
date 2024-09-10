import { createContext, useState, useContext, useEffect } from "react";

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
  const [canvasRef, setCanvasRef] = useState(null);

  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);

  const clearCanvasDrawnings = () => {
    clearCanvas()
    if (uploadedImage) {
      addImageToCanvas()
    }
  }
  const clearCanvas = () => {
    if (!canvasRef) return
    const canvas = canvasRef.current;
    if (!canvas) return
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const addShape = (shapeType, x, y, width, height) => {
    if (!canvasRef) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;

    switch (shapeType) {
      case 'rectangle':
        ctx.fillRect(x, y, width, height);
        break;
      case 'circle':
        ctx.beginPath();
        ctx.arc(x, y, width / 2, 0, 2 * Math.PI);
        ctx.fill();
        break;
    }
  };

  const [uploadedImage, setUploadedImage] = useState(null)
  const [isImageLoading, setIsImageLoading] = useState(false)

  const createImage = (path) => {
    if (!path) return
    setIsImageLoading(true)
    const image = new Image();
    image.src = path;
    image.onload = () => {
      setUploadedImage(image)
      setIsImageLoading(true)
    }
  }

  const addImageToCanvas = () => {
    if (!canvasRef || !uploadedImage) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Calculate scaling to fit the image within the canvas
    const scale = Math.min(canvas.width / uploadedImage.width, canvas.height / uploadedImage.height);
    const x = (canvas.width - uploadedImage.width * scale) / 2;
    const y = (canvas.height - uploadedImage.height * scale) / 2;

    ctx.drawImage(uploadedImage, x, y, uploadedImage.width * scale, uploadedImage.height * scale);
  };

  const getCanvasBlob = (blobCallback) => {
    if (!canvasRef) return
    return canvasRef.current.toBlob(blob => {
      blobCallback(blob)
    }, "image/jpeg", 0.75)
  }

  useEffect(() => {
    addImageToCanvas()
  }, [uploadedImage])

  const [shapeType, setShapeType] = useState(null)

  const onShapeAdd = (type) => {
    if (shapeType === type) {
      setShapeType(null)
      return
    }
    setShapeType(type)
  }

  return (
    <CanvasContext.Provider value={{
      canvasRef,
      setCanvasRef,
      uploadedImage,
      setUploadedImage,
      isImageLoading,
      createImage,
      clearCanvasDrawnings,
      clearCanvas,
      addShape,
      shapeType,
      color,
      setColor,
      brushSize,
      setBrushSize,
      getCanvasBlob,
      onShapeAdd
    }}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);