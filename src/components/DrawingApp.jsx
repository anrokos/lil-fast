import React, { useState } from 'react';
import { usePrompt } from '../context/PromptContext';
import { useCanvas } from '../context/CanvasContext';
import { sendToServer } from '../utils/actions'
import Loading from './Loading';
import Canvas from './Canvas';
import Panel from './Panel';

const DrawingApp = () => {
    const { uploadedImage, getCanvasBlob } = useCanvas();
    const { prompt, numIterations } = usePrompt();
    const [outputImage, setOutputImage] = useState(null)
    const [reinterpretingOnDraw, setReinterpretingOnDraw] = useState(false)


    const [isReinterpreting, setIsReinterpreting] = useState(false)

    const getOutputImage = async (canvasBlob) => {
        const responseImage = await sendToServer(canvasBlob, prompt, numIterations)
        setOutputImage(responseImage)
        setIsReinterpreting(false)
    }
    const reinterpretCanvas = async () => {
        setIsReinterpreting(true)
        getCanvasBlob(getOutputImage)
    }

    const onDrawEnd = () => {
        if (!reinterpretingOnDraw) return;
        reinterpretCanvas()
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 h-[500px]">
                <div className="w-1/2">
                    <Canvas isLoading={reinterpretingOnDraw && isReinterpreting} onDrawEnd={onDrawEnd} />
                </div>
                <div className="w-1/2 border rounded-lg">
                    {isReinterpreting ? <Loading image={uploadedImage} /> :
                        outputImage && <img src={outputImage} className="w-full h-full" />}
                </div>
            </div>
            <Panel
                isLoading={isReinterpreting}
                reinterpretCanvas={reinterpretCanvas}
                reinterpretOnDraw={setReinterpretingOnDraw}
            />
        </div>
    )
}

export default DrawingApp;