import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let expandedIngredientes = Object.keys(props.ingredients).map(
        ingredient => [...Array(props.ingredients[ingredient])].map((_, i) =>
                <BurgerIngredient key={ingredient + i} type={ingredient} />
            )
        ).reduce((arr, el) => arr.concat(el), []);
    if (expandedIngredientes.length === 0)
        expandedIngredientes = <p>Please start adding ingredients!</p>
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {expandedIngredientes}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default burger;
