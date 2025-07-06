import { ENDPOINTS } from "./endpoints";
import { HTTP_METHODS } from "./httpMethod";

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

export const makeSimpleRequest = async (endpoint, ...params) => {
  const method = endpoint.metgod;
  const requestOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
  }

  if (endpoint.requestClass != null) {
    const request = new endpoint.requestClass(...params);

    const bodyOrSearch = await request.createRequest(method);
    if (endpoint.metgod === HTTP_METHODS.GET) {
      return makeRequest({ endpoint: endpoint.uri, requestOptions, params: bodyOrSearch });
    } else {
      requestOptions.body = bodyOrSearch;
      return makeRequest({ endpoint: endpoint.uri, requestOptions });
    }
  }
  return makeRequest({ endpoint: endpoint.uri, requestOptions });
}