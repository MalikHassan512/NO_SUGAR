const initialState = {
  image: '',
  name: ' ',
  profile_data: {},
};

const profileReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'SET_PROFILE': {
      return {
        image: payload?.image, 
        name: payload?.name,
      };
    }
    case 'GET_PROFILE':
      return {...state, profile_data: payload};

    default: {
      return state;
    }
  }
};

export default profileReducer;
