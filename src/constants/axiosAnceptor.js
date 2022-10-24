import {useEffect} from 'react';
import {useSelector} from 'react-redux';

import axios from 'axios';
import {url} from './url';

export const useAxiosInterceptors = () => {
  const token = useSelector(state => state.auth?.token);

  useEffect(() => {
    axios.interceptors.request.use(req => {
      req.headers.authorization = `Token ${token}`;
      req.headers['Content-Type'] =
        'application/json; charset=UTF-8,multipart/form-data';
      req.baseURL = url;
      return req;
    });
  }, [token]);
};
