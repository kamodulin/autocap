import React from 'react';
// import Button from './components/Button';
import ImageUpload from './components/ImageUpload';
import Settings from './components/Settings';
import post from './actions/post.js'

const models = {
  vision: ["MobileNetV3", "InceptionV3", "VGG16"],
  language: ["RNN", "RNN with attention", "BERT"]
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreview: null,
      image: null,
      vision: models.vision[0],
      language: models.language[0],
      captionLoading: false,
    }
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleModelChange(e) {
    if (e.target.name === "vision") {
      this.setState({ vision: e.target.value });
    } else if (e.target.name === "language") {
      this.setState({ language: e.target.value });
    }
  }

  handleImageChange(e) {
    this.setState({
      image: e.target.files[0],
      imagePreview: URL.createObjectURL(e.target.files[0])
    });
  }

  destroyImage() {
    if (this.state.image) {
      URL.revokeObjectURL(this.state.imagePreview);
      this.setState({
        image: null,
        imagePreview: null
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData();

    for (let [key, value] of Object.entries(this.state)) {
      formData.append(key, value);
    }

    this.setState({ captionLoading: true });

    post(`/submit`, formData).then(res => {
      console.log(res);
      this.setState({ captionLoading: false });
    })
      .catch(err => {
        console.log(err);
        this.setState({ captionLoading: false });
      });
  }

  render() {
    return (
      <div className="container max-w-5xl mx-auto flex flex-wrap sm:flex-nowrap items-stretch my-4 space-y-6 sm:space-y-0 sm:divide-x divide-gray-300">
        <div className="flex-grow px-6">
          <ImageUpload image={this.state.imagePreview} onChange={this.handleImageChange} />
          <div className="relative mt-2">
            <div className="flex space-x-4 mt-1">
              {/* this is very messy, need to clean up later
                also, may want to use something like animate-pulse for the caption. it's useful for a skeleton loader */}
              {this.state.imagePreview && this.state.image ?
                this.state.captionLoading ?
                  <button type="button" className="hover:bg-gray-200 hover:text-gray-800 group flex items-center rounded-md bg-gray-100 text-gray-600 text-sm font-medium px-4 py-2 cursor-not-allowed" disabled="">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing
                  </button>
                  :
                  <>
                    <button className="hover:bg-green-200 hover:text-green-800 group flex items-center rounded-md bg-green-100 text-green-600 text-sm font-medium px-4 py-2" onClick={this.handleSubmit} >
                      Submit
                    </button>
                    <button className="hover:bg-red-200 hover:text-red-800 group flex items-center rounded-md bg-red-100 text-red-600 text-sm font-medium px-4 py-2" onClick={() => this.destroyImage()} >
                      Discard
                    </button>
                  </>
                :
                <>
                  <button className="hover:bg-gray-200 hover:text-gray-800 group flex items-center rounded-md bg-gray-100 text-gray-600 text-sm font-medium px-4 py-2">
                    Random Google Image
                  </button>
                  <button className="hover:bg-gray-200 hover:text-gray-800 group flex items-center rounded-md bg-gray-100 text-gray-600 text-sm font-medium px-4 py-2">
                    Random MS-COCO Image
                  </button>
                </>
              }
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 space-y-6 px-6">
          <Settings models={models} currentModels={[this.state.vision, this.state.language]} onChange={this.handleModelChange} />
        </div>
      </div>
    );
  }
}

export default App;