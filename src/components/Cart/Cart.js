import { useContext, useState } from "react";
import CartContext from "../../Store/Cart-context";
import Modal from "../UI/modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCxt = useContext(CartContext);
  const [isCheckout, setCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

  const cartItemAddHandler = (item) => {
    cartCxt.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartCxt.removeItem(id);
  };
  const checkoutHandler = () => {
    setCheckOut(true);
  };

  const cartLen = cartCxt.items.length > 0;

  const onConfirmHandler = (data) => {
    setIsSubmitting(true);
    fetch("https://food-order-6cae6-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({ user: data, orderedItems: cartCxt.items }),
    });
    setIsSubmitting(false);
    setSubmitted(true);
    cartCxt.clearCart();
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCxt.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.title}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onRemove}>
        Close
      </button>
      {cartLen && (
        <button className={classes.button} onClick={checkoutHandler}>
          Order
        </button>
      )}
    </div>
  );
  if (isSubmitting) {
    return (
      <Modal onRemove={props.onRemove}>
        <p>Sending order data...</p>
      </Modal>
    );
  }
  if (isSubmitted) {
    return (
      <Modal onRemove={props.onRemove}>
        <p>Successfully sent the order!</p>
        <div className={classes.actions}>
          <button className={classes.button} onClick={props.onRemove}>
            Close
          </button>
        </div>
      </Modal>
    );
  }
  return (
    <Modal onRemove={props.onRemove}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>Rs {cartCxt.total}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onRemove} onConfirm={onConfirmHandler} />
      )}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
