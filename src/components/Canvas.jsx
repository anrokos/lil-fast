import React, { useRef, useState, useEffect } from 'react';
import { useCanvas } from '../context/CanvasContext';

const Canvas = ({ loading, onDrawEnd }) => {
    const { setCanvasRef, color, brushSize, clearCanvas, addShape, shapeType } = useCanvas();
    const canvasRef = useRef(null);
    useEffect(() => {
        setCanvasRef(canvasRef);
    }, [setCanvasRef]);

    const [isDrawing, setIsDrawing] = useState(false);

    const setCanvasSize = () => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    }

    useEffect(() => {
        clearCanvas();
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize)
        return () => {
            window.removeEventListener('resize', setCanvasSize)
        }
    }, []);

    const draw = (e) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (shapeType && startPoint) {
            const width = Math.abs(x - startPoint.x);
            const height = Math.abs(y - startPoint.y);
            addShape(shapeType, startPoint.x, startPoint.y, width, height);
        } else {
            ctx.lineTo(x, y);
            ctx.strokeStyle = color;
            ctx.lineWidth = brushSize;
            ctx.lineCap = 'round';
            ctx.stroke();
        }
    };

    const [startPoint, setStartPoint] = useState(null);

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (shapeType) {
            setStartPoint({ x, y });
            setIsDrawing(true);
        } else {
            const ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(x, y);
            setIsDrawing(true);
        }
    };

    const stopDrawing = (event) => {
        if (shapeType && startPoint) {
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const width = Math.abs(x - startPoint.x);
            const height = Math.abs(y - startPoint.y);
            addShape(shapeType, startPoint.x, startPoint.y, width, height);
        }
        setIsDrawing(false);
        setStartPoint(null);
    };

    const onEnd = (event) => {
        stopDrawing(event)
        onDrawEnd()
    }


    return (
        <canvas
            ref={canvasRef}
            width={500}
            height={500}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={onEnd}
            onMouseOut={stopDrawing}
            className={`relative top-0 left-0 w-full h-full border rounded-lg ${loading ? 'pointer-events-none cursor-not-allowed' : ''}`} />
    )
}

export default Canvas;

