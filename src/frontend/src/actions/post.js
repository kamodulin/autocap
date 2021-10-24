export default async function post(endpoint, data) {
    const promise = fetch(endpoint, {
      method: "POST",
      body: data,
    });
    return promise.then((resp) => resp.json());
  }