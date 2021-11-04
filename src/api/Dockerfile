FROM python:3.8-slim-buster

ENV PYENV_SHELL=/bin/bash

RUN set -ex; \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends build-essential git && \
    pip install --no-cache-dir --upgrade pip && \
    pip install pipenv

WORKDIR /app

COPY ["Pipfile", "Pipfile.lock", "./"]

RUN pipenv install

COPY . .

# EXPOSE 5000

ENTRYPOINT ["/bin/bash"]
CMD ["-c", "pipenv run python3 app.py"]