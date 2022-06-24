export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}
function queryStringify(data = {}) {
  return Object.entries(data).map(([key, value]) => `${key}=${value}`).join('&');
}
type Options = {
  method: Methods;
  data?: any;
  retries?: number,
  isFile?: boolean,
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

class HTTPTransport {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: Methods.GET });
  }

  put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: Methods.PUT });
  }

  post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: Methods.POST });
  }

  delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: Methods.DELETE });
  }

  async request(url: string, options: Options = { method: Methods.GET }, timeout = 5000):
    Promise<XMLHttpRequest> {
    let targetUrl = `${this.baseURL}${url}`;

    return new Promise<XMLHttpRequest>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const { method, data, isFile = false } = options;

      if (data && method === Methods.GET) {
        targetUrl += `?${queryStringify(data)}`;
      }

      const handleLoad = () => {
        resolve(xhr);
      };

      const handleError: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null = (err) => {
        reject(err);
      };

      xhr.open(method, targetUrl, true);
      if (!isFile) {
        xhr.setRequestHeader('content-type', 'application/json');
      }

      xhr.setRequestHeader('accept', 'application/json');
      xhr.responseType = 'json';

      xhr.withCredentials = true;
      xhr.timeout = timeout;
      xhr.onload = handleLoad;
      xhr.onabort = handleError;
      xhr.onerror = handleError;
      xhr.ontimeout = handleError;

      if (method === Methods.GET || !data) {
        xhr.send();
      } else {
        xhr.send(isFile ? data : JSON.stringify(data));
      }
    });
  }

  fetchWithRetry(url: string, options: Options): Promise<XMLHttpRequest> {
    const { retries = 1 } = options;

    function onError() {
      const retriesLeft = retries - 1;

      if (retriesLeft < 1) {
        throw new Error('Exceeded the number of attempts');
      }

      return this.fetchWithRetry(url, { ...options, retries: retriesLeft });
    }

    return this.request(url, options).catch(onError);
  }
}

export default HTTPTransport;