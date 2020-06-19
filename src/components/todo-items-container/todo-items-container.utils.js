export const makeAPICall = ({ URL, method, body = null }) => {
  return fetch(URL, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })
    .then((res) => res.json())
    .then((objJSON) => objJSON);
};
