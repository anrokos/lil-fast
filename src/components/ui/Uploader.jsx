import React, { Fragment, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdClose } from "react-icons/md";


const Uploader = ({ onUpload, onDelete }) => {
    const [paths, setPaths] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        const images = acceptedFiles.map(file => URL.createObjectURL(file))
        setPaths(images);
        onUpload(images);
    }, [setPaths]);

    const handleOnDelete = () => {
        onDelete()
        setPaths([])
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 });

    return (
        <Fragment>
            {paths.length ? (paths.map(path =>
                <div className="inline-block relative" key={path}>
                    <img src={path} className="w-24 h-24" />
                    <button className="absolute -right-8 top-0 hover:opacity-90">
                        <MdClose size={32} color="f10" onClick={handleOnDelete} />
                    </button>
                </div>)) :
                (<div {...getRootProps()} className=" text-xs text-gray-500 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer">
                    <input {...getInputProps()} />

                    {isDragActive ? (
                        <p>Drop the images here ...</p>
                    ) : (
                        <p>Drag 'n' drop an image here, or click to select a file</p>
                    )}
                </div>)
            }
        </Fragment>

    );
};

export default Uploader;