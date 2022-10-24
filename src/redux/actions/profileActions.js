import {getData} from '../../screens/NetworkRequest';

export const setProfile = val => {
  return {
    type: 'SET_PROFILE',
    payload: val,
  };
};

export const getProfile = token => {
  return async dispatch => {
    console.log('token', token);
    const data = await getData(token, 'user-profile/');

    dispatch({
      type: 'GET_PROFILE',
      payload: data,
    });
    return data;
  };
};
