import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../Store/Cart-context';

const HeaderCartButton=(props)=>{
    const [highlightedState,setHighlightedState]=useState(false);
    const cartcxt=useContext(CartContext);
    const numberOfItem=cartcxt.items.reduce((cnt,item)=>{ return cnt+item.amount},0);
    const buttonClass=`${classes.button} ${highlightedState ? classes.bump :''}`;

    useEffect(()=>{
        if(cartcxt.items.length===0){
            return;
        }
        setHighlightedState(true);
        setTimeout(()=>{
            setHighlightedState(false);
        },300);
        return(
            clearTimeout()
        )
    },[cartcxt.items]);
    return(
        <button className={buttonClass} onClick={props.onShow}>
            <span className={classes.icon}><CartIcon/></span>
            <span >Your Cart</span>
            <span className={classes.badge}>{numberOfItem}</span>
        </button>
    );
};

export default HeaderCartButton;