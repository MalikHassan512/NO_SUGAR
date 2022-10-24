import ServiceRequests from '../../utils/ServiceRequests';

export const getData = (token, name, params) => {
  const request = new ServiceRequests(token);
  return new Promise(async (res, rej) => {
    try {
      const {data} = await request.get(name, params || {});

      res(data);
    } catch (error) {
      rej(error);
      console.log(error);
    }
  });
};

export const postData = (token, name, params) => {
  const request = new ServiceRequests(token);
  return new Promise(async (res, rej) => {
    try {
      const data = await request.post(name, params);
      res(data);
    } catch (error) {
      rej(error.response.data);
      console.log(error);
    }
  });
};
export const patchData = (token, name, params) => {
  const request = new ServiceRequests(token);
  return new Promise(async (res, rej) => {
    try {
      const data = await request.patch(name, params);
      res(data);
    } catch (error) {
      rej(error.response.data);
      console.log(error);
    }
  });
};
export const getPaginationData = (req, name, params) => {
  return new Promise(async (res, rej) => {
    try {
      const {data} = await req.get(name, params);
      res(data);
    } catch (error) {
      rej(error.response.data);
    }
  });
};
export const updateData = (token, name, values) => {
  const request = new ServiceRequests(token);
  return new Promise(async (res, rej) => {
    try {
      const {data} = await request.put(name, values);
      res(data);
    } catch (error) {
      rej(error.response.data);
    }
  });
};
