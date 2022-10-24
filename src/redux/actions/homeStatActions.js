import Client from 'shopify-buy';
import {getData} from '../../screens/NetworkRequest';
import {useSelector} from 'react-redux';

export const getActivityValue = (token, params) => {
  return async dispatch => {
    const data = await getData(token, 'user-progress/', {
      ...params,
      p_code: 'all',
    });

    dispatch({
      type: 'GET_ACTIVITY',
      payload: data,
    });
    return data;
  };
};
