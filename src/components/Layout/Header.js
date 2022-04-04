import React,{Fragment} from "react";

import classes from './Header.module.css';
import MealImage from '../../assets/meals.jpg'
import HeaderCartButton from "./HeaderCartButton";

const Header=(props)=>{
    return (
      <Fragment>
        <header className={classes.header}>
          <h2>Food Meals</h2>
          <HeaderCartButton onShow={props.onShow}/>
        </header>
        <div className={classes["main-image"]}>
          <img src={MealImage} alt="Table full of Meals"></img>
        </div>
      </Fragment>
    );
}

export default Header;