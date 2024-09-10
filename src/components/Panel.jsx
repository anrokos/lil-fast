import React, { useState } from 'react';
import { MdBrush, MdCircle, MdFormatPaint, MdDelete, MdOutlineRectangle, MdShapeLine, MdOutlineRadioButtonUnchecked } from "react-icons/md";

import { Input, Select, Button, Switch, Uploader } from './ui';
import { useCanvas } from '../context/CanvasContext';
import { usePrompt } from '../context/PromptContext';
import Checkbox from './ui/Checkbox';


const Panel = ({ reinterpretCanvas, reinterpretOnDraw, isLoading }) => {
    const { color, brushSize, setColor, setBrushSize, shapeType, onShapeAdd, createImage, clearCanvasDrawnings, clearCanvas } = useCanvas();
    const { prompt, setPrompt, numIterations, setNumIterations } = usePrompt()
    const [autoReinterpret, setAutoReinterpret] = useState(false)


    const onUpload = (pathes) => {
        clearCanvas()
        createImage(pathes[0])
    }

    const onClearUploadedImage = () => {
        clearCanvas()
    }


    return (
        <div className="flex gap-2">
            <div className="space-y-3 w-1/2 border rounded-lg p-4">
                <div className="flex justify-between gap-12">
                    <div className="flex items-center gap-2">
                        <MdFormatPaint size={18} />
                        <Input
                            type="color"
                            value={color}
                            className="w-8 h-8 rounded-md !p-1"
                            onChange={(e) => setColor(e.target.value)}
                        />
                        <Button icon={<MdDelete color="f20" size={18} />} onClick={clearCanvasDrawnings} />
                    </div>


                    <div className="flex items-center gap-2">
                        <MdShapeLine size={16} className="mr-1" />
                        <Button
                            className={shapeType === 'circle' && '!bg-blue-300'}
                            icon={<MdOutlineRadioButtonUnchecked color="000" size={18} />}
                            onClick={() => onShapeAdd('circle')} />
                        <Button
                            className={shapeType === 'rectangle' && '!bg-blue-300'}
                            icon={<MdOutlineRectangle color="000" size={18} />}
                            onClick={() => onShapeAdd('rectangle')} />
                    </div>

                    <div className="flex items-center gap-2">
                        <MdBrush size={18} />
                        <Switch
                            options={[
                                { icon: <MdCircle size={8} />, value: 2 },
                                { icon: <MdCircle size={12} />, value: 5 },
                                { icon: <MdCircle size={16} />, value: 10 }
                            ]}
                            checked={brushSize}
                            onChange={(value) => setBrushSize(Number(value))}
                        />
                    </div>
                </div>

                <h3 className="text-sm text-gray-500">Add an image</h3>
                <Uploader onUpload={onUpload} onDelete={onClearUploadedImage} />
            </div>
            <div className="space-y-3 w-1/2 border rounded-lg p-4">
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                        <h3 className="text-sm text-gray-500">Reinterpret image</h3>
                        <Checkbox label="Reinterpret on draw" onChange={() => {
                            setAutoReinterpret(!autoReinterpret)
                            reinterpretOnDraw(!autoReinterpret)
                        }} />
                    </div>
                    <Input
                        type="textarea"
                        placeholder="Enter prompt"
                        height={100}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full"
                    />
                    <Select
                        value={numIterations}
                        onChange={(e) => setNumIterations(Number(e.target.value))}
                        className="w-full"
                    >
                        <option value="2">Rapid</option>
                        <option value="10">Enhanced</option>
                    </Select>
                </div>
                <Button
                    loading={isLoading}
                    onClick={reinterpretCanvas}>
                    Reinterpret
                </Button>
            </div>
        </div >
    )
}

export default Panel;