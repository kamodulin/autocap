import React from 'react';


function ImageUpload(props) {
    const { image, onChange } = props;
    return (
        <div className="flex flex-wrap p-8 content-center justify-center border-2 border-gray-300 border-dashed rounded-md">

            {image ?
                <div className="space-y-1 text-center">
                    <p className="font-medium">Preview</p>
                    <img src={image} alt="Upload" className="w-1/2 rounded-md mx-auto" />
                </div>
                :
                <div className="space-y-1 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div className="text-sm text-gray-600">
                        <label className="inline-block relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>Upload an image</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={onChange}></input>
                        </label>
                    </div>
                    <p className="text-xs text-gray-500">We accept JPG and PNG files.</p>
                </div>
            }
        </div>
    );
}

export default ImageUpload;