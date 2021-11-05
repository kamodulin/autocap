import React from 'react';
import ImageUpload from './components/ImageUpload';
import Caption from './components/Caption';
import Settings from './components/Settings';
import post from './actions/post.js'

function isEmpty(object) {
  return !Object.values(object).some(x => x !== null && x !== '');
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableModels: {
        vision: null,
        language: null
      },
      modelSettings: {
        vision: null,
        language: null
      },
      image: null,
      captionProcessing: false,
      caption: null,
    }

    this.onModelChange = this.onModelChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/models').then(res => res.json()).then(res => {
      var vision = res.vision;
      var language = res.language;
      this.setState({
        availableModels: {
          vision: vision,
          language: language
        },
        modelSettings: {
          vision: vision[0],
          language: language[0]
        },
        modelsLoaded: true
      });
    });
  }

  onModelChange(type, value) {
    if (type === "vision") {
      this.setState({
        modelSettings: {
          vision: value,
          language: this.state.modelSettings.language
        }
      });
    } else if (type === "language") {
      this.setState({
        modelSettings: {
          vision: this.state.modelSettings.vision,
          language: value
        },
      });
    }
  }

  onImageChange(image) {
    this.setState({
      image: image
    });
    if (!image) {
      this.setState({
        caption: null
      });
    }
  }

  onSubmit() {
    this.setState({ captionProcessing: true });

    var payload = {
      vision: this.state.modelSettings.vision,
      language: this.state.modelSettings.language,
      image: this.state.image
    }

    let formData = new FormData();

    for (let [key, value] of Object.entries(payload)) {
      formData.append(key, value);
    }

    post(`/submit`, formData).then(res => {
      this.setState({ captionProcessing: false, caption: res.caption });
    })
      .catch(err => {
        console.log(err);
        this.setState({ captionProcessing: false });
      });
  }

  render() {
    return (
      <div id="App">
        <h2 className="text-2xl font-medium leading-6 text-black mx-auto">
          AutoCap: Automatic Image Captioning
        </h2>
        <div id="container">
          <div className="flex-grow pr-6">
            <ImageUpload onChange={this.onImageChange} onSubmit={this.onSubmit} />
            <Caption processing={this.state.captionProcessing} caption={this.state.caption} />
          </div>
          <div className="flex-shrink-0 space-y-6 pl-6">
            {!isEmpty(this.state.availableModels) && <Settings models={this.state.availableModels} onChange={this.onModelChange} />}
          </div>
        </div>
      </div>
    );
  }
}

export default App;