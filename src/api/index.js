import Config from '../config';

let apiUrl = Config.useApiStubs ? '/static/apiStubs' : `${Config.baseUrl}/api`;

export const getSchema = () => {
  const url = Config.useApiStubs ? `${apiUrl}/getJob.json` : `${apiUrl}/getSchema/1`;
  return get(url);
};

const getOptions = (httpMethod, body, headers) => {
  const options = {
    method: httpMethod,
    mode: 'cors',
    cache: 'default',
  };

  if (body) {
    options.body = body;
  }

  if (headers) {
    options.headers = headers;
  }

  return options;
};

const getPostHeaders = () => {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  return headers;
};

const getFormEncodingPostHeaders = () => {
  const headers = new Headers();
  headers.append('Accept', 'application/x-www-form-urlencoded');
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  return headers;
};

export const get = (url) => {
  const request = new Request(url, getOptions('GET'));
  return fetch(request)
    .then((response) => {
      if (response.status !== 200 && response.status !== 204) {
        return Promise.reject(new ResponseError('Error'));
      }

      if (response.status === 204) {
        return null;
      }

      return response.json();
    })
    .catch((err) => {
      return Promise.reject(new ResponseError(`Bad call: ${err.message}`));
    });
};

export const postData = (url, formValues, postDataFormat = 'json') => {
  if (Config.useApiStubs) {
    return Promise.resolve({ success: true });
  }

  let options = {};
  const data = JSON.stringify(formValues);
  options = getOptions('POST', data, getPostHeaders());

  const request = new Request(url, options);
  return fetch(request)
    .then((response) => {
      if (response.status !== 200 && response.status !== 204) {
        return Promise.reject(new ResponseError('Error'));
      }

      if (response.status === 204) {
        return null;
      }

      return response.json();
    })
    .catch((err) => {
      return Promise.reject(new ResponseError(`Bad call: ${err.message}`));
    });
};
