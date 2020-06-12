import React, { Fragment, Component } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

const Modal = props => {
    const visible = props.show ? classes.Show : classes.Hide;
    const assignedClasses = [classes.Modal, visible].join(' ');
    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.onClose} />
            <div className={assignedClasses}>
                {props.children}
            </div>
        </Fragment>

    )
};

export default React.memo(Modal, (prevProps, nextProps) => 
    nextProps.show === prevProps.show && nextProps.children === prevProps.children);