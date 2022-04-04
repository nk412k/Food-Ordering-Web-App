import { useContext } from 'react';
import CartContext from '../../Store/Cart-context';
import Modal from '../UI/modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';


const Cart=(props)=>{
    const cartCxt=useContext(CartContext);

    const cartItemAddHandler=(item)=>{
        cartCxt.addItem({...item,amount:1});
    };
    const cartItemRemoveHandler=(id)=>{
        cartCxt.removeItem(id);
    };
    const placedOrder=()=>{
        alert("Order has been placed");
    };
    
    const cartLen=cartCxt.items.length > 0;
    const cartItems=<ul className={classes['cart-items']}>{cartCxt.items.map((item) =>
    <CartItem key={item.id} name={item.title} price={item.price} amount={item.amount} onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd={cartItemAddHandler.bind(null,item)}/>)}</ul>
    return(
        <Modal onRemove={props.onRemove}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>Rs {cartCxt.total}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onRemove}>Close</button>
                {cartLen && <button className={classes.button} onClick={placedOrder}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;