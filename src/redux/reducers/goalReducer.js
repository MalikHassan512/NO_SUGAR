const initialState = {
  goal: {},
};

const getGoalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_GOAL':
      return {...state, goal: action.payload};

    default:
      return state;
  }
};

export default getGoalReducer;
