import React from 'react';
import classes from './Button.module.css';

const button = (props) => {
    const assignedClasses = [classes.Button, classes[props.type]].join(' ');
    return (
        <button 
            className={assignedClasses}
            disabled={props.disabled}
            onClick={props.clicked}>
                {props.children}
            </button>
    );
}

export default button;
