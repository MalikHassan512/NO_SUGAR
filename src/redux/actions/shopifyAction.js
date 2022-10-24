import Client from 'shopify-buy';

const client = Client.buildClient({
  storefrontAccessToken: '31219e7f8b50538677c869daefc37835',
  domain: 'the-no-sugar-company-us.myshopify.com',
});

export const getProducts = numbers => {
  return async (dispatch, getState) => {
    const {country} = getState()?.country;
    // const resp = await client.product.fetchAll(numbers);

    const resp = await client.product.fetchQuery({
      query: `vendor:${country}`,
      first: numbers,
    });
    dispatch({
      type: 'PRODUCTS_FOUND',
      payload: resp,
    });
    return resp;
  };
};
export const getCollections = () => {
  return async (dispatch, getState) => {
    const {country} = getState()?.country;
    // const resp = await client.product.fetchAll(numbers);

    const resp = await client.collection.fetchAll();
    console.log('collection', resp);
    dispatch({
      type: 'COLLECTION_FOUND',
      payload: resp,
    });
    return resp;
  };
};
export const getPaginatedProducts = product => {
  return async dispatch => {
    const resp = await client.fetchNextPage(product);
    dispatch({
      type: 'PAGINATED_PRODUCT_FOUND',
      payload: resp,
    });
    return resp;
  };
};
export const getProduct = id => {
  return async dispatch => {
    const resp = await client.product.fetch(id);
    dispatch({
      type: 'PRODUCT_FOUND',
      payload: resp,
    });
    return resp;
  };
};

export const checkout = () => {
  return dispatch => {
    client.checkout.create().then(resp => {
      dispatch({
        type: 'CHECKOUT_FOUND',
        payload: resp,
      });
    });
  };
};

export const shopInfo = () => {
  return dispatch => {
    client.shop.fetchInfo().then(resp => {
      dispatch({
        type: 'SHOP_FOUND',
        payload: resp,
      });
    });
  };
};

export const addVariantToCart = (checkoutId, lineItemsToAdd) => {
  return async dispatch => {
    const response = await client.checkout.addLineItems(
      checkoutId,
      lineItemsToAdd,
    );
    dispatch({
      type: 'ADD_VARIANT_TO_CART',
      payload: response,
    });
    return response;
  };
};

export const updateQuantityInCart = (lineItemId, quantity, checkoutId) => {
  const lineItemsToUpdate = [
    {id: lineItemId, quantity: parseInt(quantity, 10)},
  ];

  return async dispatch => {
    const resp = await client.checkout.updateLineItems(
      checkoutId,
      lineItemsToUpdate,
    );
    dispatch({
      type: 'UPDATE_QUANTITY_IN_CART',
      payload: resp,
    });
    return resp;
  };
};

export const removeLineItemInCart = (checkoutId, lineItemId) => {
  return dispatch => {
    client.checkout.removeLineItems(checkoutId, [lineItemId]).then(resp => {
      dispatch({
        type: 'REMOVE_LINE_ITEM_IN_CART',
        payload: resp,
      });
    });
  };
};

export const handleCartClose = () => {
  return {
    type: 'CLOSE_CART',
  };
};

export const handleCartOpen = () => {
  return {
    type: 'OPEN_CART',
  };
};

export const handleSetCount = count => {
  return {
    type: 'CART_COUNT',
    payload: count,
  };
};
