import React from 'react';
import classes from './Modal.module.css';

const modal = (props) => {
    const visible = props.show ? classes.Show : classes.Hide;
    const assignedClasses = [classes.Modal, visible].join(' ');
    return(
    <div className={assignedClasses}>
        {props.children}
    </div>
)};

export default modal;