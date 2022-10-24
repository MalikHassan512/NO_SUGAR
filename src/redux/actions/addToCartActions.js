export const addItem = item => {
  return {
    type: 'addItem',
    payload: item,
  };
};

export const removeItem = item_uuid => {
  return {
    type: 'removeItem',
    payload: item_uuid,
  };
};

export const clearItem = item_uuid => {
  return {
    type: 'clearItem',
    payload: item_uuid,
  };
};

export const resetCart = () => {
  return {
    type: 'resetCart',
  };
};
