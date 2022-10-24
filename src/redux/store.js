import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import appReducer from './reducers/rootReducer';

const initialState = appReducer({}, {});
const clearAll = async () => {
  try {
    await storage.clear();
  } catch (e) {
    // clear error
    console.log('clear error', e);
  }
};
const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    // storage.removeItem('persist:root');
    clearAll();
    return (state = undefined);
  }

  return appReducer(state, action);
};
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth', 'craving', 'cart'],
};

const middlewares = [thunk];
let appliedMiddlewares = applyMiddleware(...middlewares);

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, {}, appliedMiddlewares);
let persistor = persistStore(store);

export {store, persistor};
