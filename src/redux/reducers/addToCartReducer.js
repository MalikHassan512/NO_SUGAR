const initialState = {
  items: [],

  total_price: 0,
  total_items: 0,
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'addItem': {
      if (
        state?.items.filter(item => item?.uuid === action?.payload?.uuid) === []
      ) {
        return {
          items: [...state?.items],
        };
      } else {
        return {
          items: [...state?.items, action?.payload],
        };
      }
    }
    case 'removeItem': {
    }
    case 'clearItem': {
    }
    case 'resetCart': {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};

export default CartReducer;
