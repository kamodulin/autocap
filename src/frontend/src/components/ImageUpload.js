import React from 'react';

class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preview: null,
            file: null
        }

        this.onChange = this.onChange.bind(this);
        this.destroyImage = this.destroyImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        var file = event.target.files[0];
        var preview = URL.createObjectURL(event.target.files[0]);
        this.setState({
            preview: preview,
            file: file
        })
        this.props.onChange(file);
    }

    destroyImage() {
        this.props.onChange(null);
        if (this.state.preview && this.state.file) {
            this.setState({
                preview: null,
                file: null
            });
        }
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onSubmit();
    }

    render() {
        return (
            <>
                <div className="flex flex-wrap p-8 content-center justify-center border-2 border-gray-300 border-dashed rounded-md">
                    {this.state.preview ?
                        <div className="space-y-1 text-center">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Image preview</h3>
                            <img src={this.state.preview} alt="Uploaded file" className="w-1/2 rounded-md mx-auto" />
                        </div>
                        :
                        <div className="space-y-1 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <div className="text-sm text-gray-600">
                                <label className="inline-block relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                    <span>Upload an image</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={this.onChange}></input>
                                </label>
                            </div>
                            <p className="text-xs text-gray-500">We accept JPG and PNG files.</p>
                        </div>
                    }
                </div>
                <div className="relative mt-4">
                    <div className="flex space-x-4">
                        {this.state.preview ?
                            <>
                                <button className="green-button" onClick={this.onSubmit} >
                                    Submit
                                </button>
                                <button className="red-button" onClick={this.destroyImage} >
                                    Discard
                                </button>
                            </>
                            :
                            <>
                                <button className="gray-button">
                                    Random Google Image
                                </button>
                                <button className="gray-button">
                                    Random MS-COCO Image
                                </button>
                            </>
                        }
                    </div>
                </div>
            </>
        )

    }
}

export default ImageUpload;