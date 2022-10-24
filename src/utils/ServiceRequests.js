import axios from 'axios';

/**
 * Custom HTTP Service Requests utility which uses axios at core.
 * This service adds authentication token to the request header and
 * takes an optional argument of query params and structures an
 * appropriate URL.
 *
 * @name ServiceRequests
 * @param {string} baseURL - Base URL of services.
 * @example
 * import ServiceRequests from 'utils/ServiceRequests';
 * request = new ServiceRequests('https://my-url');
 * const service = new ServiceRequests('http://10.1.11.31:8080/');
 * service.get('my-end-point/').then(..).catch(..);
 */
class ServiceRequests {
  /**
   * Class Constructor
   *
   * @param {string} baseURL - Base URL of services.
   * @param {string} authToken - LocalStorage Key for Auth Token.
   * @example
   * request = new ServiceRequests('https://my-url');
   * const service = new ServiceRequests('http://10.1.11.31:8080/');
   * service.get('my-end-point/').then(..).catch(..);
   */

  constructor(token) {
    this.service = axios.create({
      baseURL: 'https://nosugar.9exgen.com/api/',
      headers:
        token === ''
          ? null
          : {
              authorization: `Token ${token}`,
              'Content-Type':
                'application/json; charset=UTF-8,multipart/form-data',
              // authorization: `Token a6359fc696d421e1e973e6a9b404e889a078f9db`,
              'Access-Control-Allow-Credentials': 'true',
            },
    });
    // if (this.authToken) {
    // this.service = axios.create({
    //   baseURL,
    //   headers: {
    //     authorization: `Token ${this.authToken}`,
    //     "Access-Control-Allow-Credentials": "true",
    //   },
    // });
    // } else {
    //   this.service = axios.create({
    //     baseURL,
    //     headers: {
    //       "Access-Control-Allow-Credentials": "true",
    //     },
    //   });
    // }
  }

  /**
   * Set Auth Token
   *
   */
  static setAuthToken = token => {
    this.authToken = token;
  };

  /**
   * For Get Requests.
   *
   */
  get(url, params) {
    return this.service.get(`${url}`, {
      params: params,
    });
  }

  /**
   * For Post Requests.
   *
   */
  post(url, payload) {
    return this.service.post(url, payload);
  }

  /**
   * For Put Requests.
   *
   */
  put(url, payload) {
    return this.service.put(url, payload);
  }

  patch(url, payload) {
    return this.service.patch(url, payload);
  }
  /**
   * For Delete Requests
   *
   */
  delete(url) {
    return this.service.delete(url);
  }
}
export class UnAuthServiceRequests {
  /**
   * Class Constructor
   *
   * @param {string} baseURL - Base URL of services.
   * @param {string} tokenKey - LocalStorage Key for Auth Token.
   * @example
   * request = new ServiceRequests('https://my-url');
   * const service = new ServiceRequests('http://10.1.11.31:8080/');
   * service.get('my-end-point/').then(..).catch(..);
   */
  constructor(baseURL) {
    // const tokenKey = "dummy";
    // const userAuth = window.localStorage.getItem("session_token");
    this.service = axios.create({
      baseURL,
      headers: {
        // authorization: `Token ${userAuth}`,
        // "Access-Control-Allow-Credentials": "true",
        // "Content-Type":"application/json",
        // "Access-Control-Allow-Origin": '*'
      },
    });
  }

  /**
   * For Get Requests.
   *
   */
  get(url, params) {
    return this.service.get(`${url}`, {
      params: params,
    });
  }

  /**
   * For Post Requests.
   *
   */
  post(url, payload) {
    return this.service.post(url, payload);
  }

  /**
   * For Put Requests.
   *
   */
  put(url, payload) {
    return this.service.put(url, payload);
  }

  /**
   * For Delete Requests
   *
   */
  delete(url) {
    return this.service.delete(url);
  }
}

export default ServiceRequests;
