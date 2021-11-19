const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default async function post(endpoint, data) {
    const promise = fetch(BASE_API_URL + endpoint, {
      method: "POST",
      body: data,
    });
    return promise.then((resp) => resp.json());
  }

export default async function get(endpoint) {
    const promise = fetch(BASE_API_URL + endpoint);
    return promise.then((resp) => resp.json());
  }