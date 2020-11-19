import Cookies from 'js-cookie';

export const fetch = async (url, options = {}) => {
  options.headers = options.headers || 'GET';
  options.method = options.method || {};

  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] =
      options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-Token');
  }

  const res = await window.fetch(url, options);

  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const data = await res.json()
    res.data = data;
  }
  if (res.status >= 400) throw res;

  return res;
}