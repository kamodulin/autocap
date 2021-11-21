import React from 'react';
import Image from './components/Image';
import Caption from './components/Caption';
import Settings from './components/Settings';
import { post } from './actions/requests'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vision: null,
      language: null,
      image: null,
      captionStatus: null,
      caption: null,
      attentionArray: null,
      attentionOverlay: null,
    }
  }

  onModelChange = (type, value) => {
    if (type === "vision") {
      this.setState({
        vision: value
      });
    } else if (type === "language") {
      this.setState({
        language: value
      });
    }
  }

  onImageChange = (image) => {
    this.setState({
      image: image
    });
    if (!image) {
      this.setState({
        captionStatus: null,
        caption: null,
        attentionArray: null,
        attentionOverlay: null,
      });
    }
  }

  onWordHover = (idx) => {
    if (idx !== null && this.state.attentionArray) {
      this.setState({
        attentionOverlay: this.state.attentionArray[idx]
      });
    } else {
      this.setState({
        attentionOverlay: null
      });
    }
  }


  onSubmit = () => {
    this.setState({
      captionStatus: "processing"
    });

    var payload = {
      vision: this.state.vision,
      language: this.state.language,
      image: this.state.image
    }

    let formData = new FormData();

    for (let [key, value] of Object.entries(payload)) {
      formData.append(key, value);
    }

    post("/predict", formData).then(res => {
      this.setState({
        captionStatus: "success",
        caption: res.caption,
        attentionArray: res.attentionArray
      });
    })
      .catch(err => {
        this.setState({
          captionStatus: "error"
        });
      });
  }

  render() {
    return (
      <div id="App">
        <h2 className="text-2xl font-medium leading-6 text-black mx-auto">
          AutoCap: Automatic Image Captioning 📸✨
        </h2>
        <div id="container">
          <div id="content">
            <Image attentionOverlay={this.state.attentionOverlay} onChange={this.onImageChange} onSubmit={this.onSubmit} />
            <Caption caption={this.state.caption} status={this.state.captionStatus} onWordHover={this.onWordHover} />
          </div>
          <div id="settings">
            <Settings onChange={this.onModelChange} />
          </div>
        </div>
      </div>

    );
  }
}

export default App;