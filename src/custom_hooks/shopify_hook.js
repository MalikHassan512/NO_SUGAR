import {useSelector, useDispatch} from 'react-redux';
import {
  getProduct,
  getProducts,
  getPaginatedProducts,
  checkout,
  shopInfo,
  handleCartClose,
  handleCartOpen,
  handleSetCount,
  addVariantToCart,
  updateQuantityInCart,
  removeLineItemInCart,
  getCollections,
} from '../redux/actions/shopifyAction';

export const useShopify = () => {
  const dispatch = useDispatch();

  const cartCount = useSelector(state => state.shopifyState.cartCount);
  const products = useSelector(state => state.shopifyState.products);
  const product = useSelector(state => state.shopifyState.product);
  const featured = useSelector(state => state.shopifyState.featured);
  const checkoutState = useSelector(state => state.shopifyState.checkout);
  const shopDetails = useSelector(state => state.shopifyState.shop);
  const nextProducts = useSelector(state => state?.shopifyState?.nextProducts);

  const fetchCollection = () => dispatch(getCollections());
  const fetchProducts = numbers => dispatch(getProducts(numbers));
  const fetchProduct = id => dispatch(getProduct(id));
  const fetchNextProducts = nextProduct =>
    dispatch(getPaginatedProducts(nextProduct));
  // const fetchCollection = () => dispatch(getCollection())
  const createCheckout = () => dispatch(checkout());
  const createShop = () => dispatch(shopInfo());
  const closeCart = () => dispatch(handleCartClose());
  const openCart = () => dispatch(handleCartOpen());
  const setCount = count => dispatch(handleSetCount(count));

  const addVariant = (checkoutId, lineItemsToAdd) =>
    dispatch(addVariantToCart(checkoutId, lineItemsToAdd));
  const updateQuantity = (lineItemId, quantity, checkoutID) =>
    dispatch(updateQuantityInCart(lineItemId, quantity, checkoutID));
  const removeLineItem = (checkoutId, lineItemId) =>
    dispatch(removeLineItemInCart(checkoutId, lineItemId));

  return {
    products,
    product,
    nextProducts,
    featured,

    checkoutState,
    cartCount,
    shopDetails,
    addVariant,
    fetchProducts,
    fetchProduct,
    fetchNextProducts,
    fetchCollection,
    createCheckout,
    createShop,
    closeCart,
    openCart,
    updateQuantity,
    removeLineItem,
    setCount,
  };
};
