import classes from './modal.module.css';
import ReactDOM from 'react-dom';
import { Fragment } from 'react';

const Backdrop=(props)=>{
    return(<div className={classes.backdrop} onClick={props.onRemove}></div>)
}

const ModalHelper=(props)=>{
    return(
        <div className={classes.modal}>
            <div>{props.children}</div>
        </div>
    )
}

const Modal=(props)=>{
    return(
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onRemove={props.onRemove}/>, document.getElementById("overlay_root"))}
      {ReactDOM.createPortal(
        <ModalHelper>{props.children}</ModalHelper>,
        document.getElementById("modal_root")
      )}
    </Fragment>
    );
}

export default Modal;