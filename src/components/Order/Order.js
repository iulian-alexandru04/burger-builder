import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];
    for(let ingr in props.ingredients)
        ingredients.push(
            {
                name: ingr,
                amount: props.ingredients[ingr]
            }
        );
    const ingredientsOutput = ingredients.map(ingr => 
        <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ingr.name}>
                {ingr.name} ({ingr.amount})
        </span>    
    );
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default order;