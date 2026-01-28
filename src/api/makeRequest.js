import { HTTP_METHODS } from "./httpMethod";

// eslint-disable-next-line no-undef
const API_URL = process.env.REACT_APP_HOST;

export const makeRequest = async ({
  params,
  endpoint,
  requestOptions,
}) => {
  const url = new URL(API_URL + '/' + endpoint);
  if (params) {
    url.search = new URLSearchParams(params).toString();
  }

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP! статус: ${response.status}`);
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) return await response.json();
    return null;
  } catch (error) {
    console.error('Ошибка API запроса:', error);
    throw error;
  }
};

export const makeSimpleRequest = async (endpoint, ...params) => {
  const method = endpoint.method;
  const requestOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
  };

  if (endpoint.requestClass != null) {
    const request = new endpoint.requestClass(...params);

    const bodyOrSearch = await request.createRequest(method);
    if (endpoint.method === HTTP_METHODS.GET) {
      return makeRequest({ endpoint: endpoint.uri, requestOptions, params: bodyOrSearch });
    } else {
      requestOptions.body = bodyOrSearch;
      return makeRequest({ endpoint: endpoint.uri, requestOptions });
    }
  }
  return makeRequest({ endpoint: endpoint.uri, requestOptions });
};