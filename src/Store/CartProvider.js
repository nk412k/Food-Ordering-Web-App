import { useReducer } from "react";
import CartContext from "./Cart-context";

const defaultCartState = {
  items: [],
  total: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedAmount = state.total + action.item.price * action.item.amount;
    let updatedItems;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    let existingItem = state.items[existingCartItemIndex];
    if (existingItem) {
      updatedItems = [...state.items];
      existingItem.amount += action.item.amount;
      updatedItems[existingCartItemIndex] = existingItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return { items: updatedItems, total: updatedAmount };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedAmount = state.total - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== existingItem.id);
    } else {
      updatedItems = [...state.items];
      existingItem.amount -= 1;
      updatedItems[existingCartItemIndex] = existingItem;
    }
    return { items: updatedItems, total: updatedAmount };
  }
  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);
  const addItemHandler = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCart({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCart({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    total: cartState.total,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
