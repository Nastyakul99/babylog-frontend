
const API_URL = 'https://kulav.ru';

export const makeRequest = async ({
  params,
  endpoint,
  requestOptions,
}) => {
  const url = new URL(API_URL + '/' + endpoint)
  url.search = new URLSearchParams(params).toString()

  return (await fetch(url, requestOptions)).json()
}

//TODO: не подходит для GET
export const makeSimpleRequest = async (endpoint, ...params) => {
  const method = endpoint.metgod;
  const request = new endpoint.requestClass(...params);
  const body = await request.createRequest(method);
  const requestOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body,
  }
  return makeRequest({ endpoint: endpoint.uri, requestOptions });
}