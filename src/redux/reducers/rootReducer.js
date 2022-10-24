import {combineReducers} from 'redux';
import authReducer from './authReducer';
import countryReducer from './countryReducer';
import cravingReducer from './cravingReducer';
import cartReducer from './addToCartReducer';
import shopifyReducer from './shopifyReducer';
import profileReducer from './profileReducer';
import getActivityReducer from './homeStatReducer';
import gaolReducer from './goalReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  country: countryReducer,
  craving: cravingReducer,
  cart: cartReducer,
  shopifyState: shopifyReducer,
  profile: profileReducer,
  activityValue: getActivityReducer,
  goals: gaolReducer,
});

export default rootReducer;
