import { useRef } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const inputRef=useRef();
  const onSubmitHandler=(event)=>{
    event.preventDefault();
    const amount=inputRef.current.value;
    const amountNumber=+amount;
    props.addItem(amountNumber);
  };
  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input  ref={inputRef}input={{ id:'amount_'+props.id,type: "number" , min: '1', max: '5',step:'1', defaultValue:'1'}} label="Amount" />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
