# AutoCap: Automatic Image Captioning - An AC215 DevOps project

## File structure
```
AC215_AutoCap/
├── deployment/
│   ├── scripts/ # includes scripts for docker image deployment and K8s cluster creation
│   ├── Dockerfile
│   ├── docker-shell.sh
│   └── README.md # setup deployment config and steps to deploy app to GCP
├── extension/ # browser extension files
│   └── safari/
├── models
├── notebooks
├── references
├── src/ # main source code
│   ├── api/
│   ├── frontend/
│   └── README.md # instructions for local development
├── submissions/
│   ├── milestone1_AutoCap/
│   ├── milestone2_AutoCap/
│   └── milestone3_AutoCap/
├── .gitignore
├── LICENSE
└── README.md
```

## Components
### Main source code
These components are located within `src`.
- **API** - Flask API served with `gunicorn`. Our API exposes two endpoints, `/models` and `/predict`. A GET request to `/models` returns a JSON object which includes all of the vision and language models that are available. A POST request to `/predict` that includes image data and specific vision and language models will return an image caption and an attention array.
- **Frontend** - Single-page React application. Static files are served with `nginx`. Main components of this app include an image uploader, attention overlay, and caption. More specifically, our image uploader will make a POST request to our `/predict` API endpoint with the vision and language models selected in the settings pane. The response of this request will update the caption component. Further, hovering over each word within the caption will update the attention overlay component that sits above the image.

### Browser Extension
Located within `extension`. Installation instructions are in the works.

We have developed a Safari browser extension to automatically add alternative text to images that do not already have this attribute. Hopefully, this will allow people with visual impairments that heavily rely on screen readers to better understand the content of images on webpages they visit.