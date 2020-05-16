import React, {Fragment} from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

const modal = (props) => {
    const visible = props.show ? classes.Show : classes.Hide;
    const assignedClasses = [classes.Modal, visible].join(' ');
    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.onClose}/>
            <div className={assignedClasses}>
                {props.children}
            </div>
        </Fragment>

)};

export default modal;