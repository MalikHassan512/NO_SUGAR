import {DefaultTheme} from 'react-native-paper';
import color from 'color';
const initialState = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#47b853',
    accent: '#47b853',
    primary_light: color('#47b853').alpha(0.26).rgb().string(),
  },
};

const themeReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'CHANGE_PRIMARY_COLOR': {
      return {
        ...state,
        colors: {
          ...state.colors,
          primary: payload ? payload : state.colors.primary,
          primary_light: payload
            ? color(payload).alpha(0.26).rgb().string()
            : state.colors.primary,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default themeReducer;
