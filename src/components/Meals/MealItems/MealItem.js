import { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from './MealItemForm'
import CartContext from '../../../Store/Cart-context';

const MealItem = (props) => {
  const cartcxt = useContext(CartContext);
  const AddItemHandler=(amount)=>{
    cartcxt.addItem({
      id:props.id,
      title: props.title,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.title}</h3>
        <img src={props.imag} alt={props.title}></img>
        <div className={classes['cartItem_detail']}>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>Rs {props.price}</div>
        </div>
      </div>
      <div>
        <MealItemForm id={props.id} addItem={AddItemHandler} />
      </div>
    </li>
  );
};
export default MealItem;
