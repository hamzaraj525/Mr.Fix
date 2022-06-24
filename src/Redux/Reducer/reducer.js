const initialState = {
  cartItems: [],
  userId: '',
  userName: '',
  userMail: '',
  userContact: '',
};
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: state.cartItems.concat(action.payload),
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem.key !== action.payload.key,
        ),
      };
    case 'DO_EMPTY_CART':
      return {
        ...state,
        cartItems: [],
      };
    case 'ADD_USER_ID':
      return {
        ...state,
        userId: action.payload,
        userName: action.userName,
        userMail: action.userMail,
        userContact: action.userContact,
      };
    case 'USER_NAME_UPDATE':
      return {
        ...state,
        userName: action.userName,
      };
    case 'USER_MAIL_UPDATE':
      return {
        ...state,
        userMail: action.userMail,
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        userId: null,
        userName: null,
        userMail: null,
        userContact: null,
      };
  }
  return state;
};
export default cartReducer;
