import Client from 'shopify-buy';
import {getData} from '../../screens/NetworkRequest';
import {useSelector} from 'react-redux';

export const getGoalValue = (token, params) => {
  return async dispatch => {
    const data = await getData(token, 'goal/', params);

    dispatch({
      type: 'GET_GOAL',
      payload: data,
    });
    return data;
  };
};
