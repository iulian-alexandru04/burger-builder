import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl';

const controls = ['salad', 'bacon', 'cheese', 'meat'];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        {controls.map(name => 
            <BuildControl 
                key={name} 
                label={name} 
                added={() => props.addIngredient(name)}
                removed={() => props.removeIngredient(name)}
                disabled={props.disabled[name]}/>)}
    </div>
);

export default buildControls;
