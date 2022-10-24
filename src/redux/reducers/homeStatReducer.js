const initialState = {
  activity: [],
};

const getActivityReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ACTIVITY':
      return {...state, activity: action.payload};

    default:
      return state;
  }
};

export default getActivityReducer;
