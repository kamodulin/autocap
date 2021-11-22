import React from 'react';
import Image from './components/Image';
import Caption from './components/Caption';
import Settings from './components/Settings';
import { post } from './actions/requests'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      visionModel: null,
      languageModel: null,
      caption: {
        status: null,
        text: null
      },
      attention: {
        data: null,
        idx: null
      }
    }
  }

  onModelChange = (type, value) => {
    if (type === "vision") {
      this.setState({ visionModel: value });
    } else if (type === "language") {
      this.setState({ languageModel: value });
    }
  }

  onImageChange = (image) => {
    this.setState({
      image: image
    });
    if (!image) {
      this.setState({
        caption: {
          status: null,
          text: null
        },
        attention: {
          data: null,
          idx: null
        }
      });
    }
  }

  onWordHover = (idx) => {
    var attention = { ...this.state.attention };
    if (idx !== null && this.state.attention.data) {
      attention.idx = this.state.attention.data[idx];
    } else {
      attention.idx = null;
    }
    this.setState({ attention });
  }

  onSubmit = () => {
    this.setState({ caption: { status: "processing", text: null } });

    var payload = {
      vision: this.state.visionModel,
      language: this.state.languageModel,
      image: this.state.image
    }

    let formData = new FormData();
    for (let [key, value] of Object.entries(payload)) {
      formData.append(key, value);
    }

    post("/predict", formData).then(res => {
      var caption = {
        status: "success",
        text: res.caption
      }

      var attention = {
        data: res.attention,
        idx: null
      }

      this.setState({ caption: caption, attention: attention });
    }).catch(err => {
      this.setState({ caption: { status: "error", text: null } });
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
            <Image attention={this.state.attention} onChange={this.onImageChange} onSubmit={this.onSubmit} />
            <Caption caption={this.state.caption} onWordHover={this.onWordHover} />
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