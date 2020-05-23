import React from 'react';
import classes from './Order.module.css';

const order = (props) => (
    <div className={classes.Order}>
        <p>Ingredients: Salas (1)</p>
        <p>Price: <strong>USD 1.5</strong></p>
    </div>
)

export default order;