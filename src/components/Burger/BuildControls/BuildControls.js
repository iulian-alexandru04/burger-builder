import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl';

const controls = ['salad', 'bacon', 'cheese', 'meat'];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(name => 
            <BuildControl 
                key={name} 
                label={name} 
                added={() => props.addIngredient(name)}
                removed={() => props.removeIngredient(name)}
                disabled={props.disabled[name]}/>)}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.onOrder}>
                {props.isAuth ? 'ORDER NOW!' : 'SIGN UP TO ORDER'}
        </button>
    </div>
);

export default buildControls;
