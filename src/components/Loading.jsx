import React from 'react';
import { MdAutoFixHigh } from "react-icons/md";

const Loading = ({ image }) => {
    return (
        <div className="relative h-full">
            {image && <div className="animate-blur h-full"><img src={image.src} className="max-h-full" /></div>}
            <div className="absolute left-1/2 top-1/2 -translate-1/2">
            <div className="animate-bounce">
                <MdAutoFixHigh size={32} color="#000"/>
                </div>
            </div>
        </div>
    )
}

export default Loading;