const initialState = {
  order: '1',
  uuid: '',
};

const cravingReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'SET_CRAVING': {
      return {
        order: payload?.order,
        uuid: payload?.uuid,
      };
    }

    default: {
      return state;
    }
  }
};

export default cravingReducer;
