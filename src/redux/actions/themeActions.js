export const changePrimaryColor = (primary_color) => {
  return {
    type: "CHANGE_PRIMARY_COLOR",
    payload: primary_color,
  };
};

export default {
  changePrimaryColor,
};
