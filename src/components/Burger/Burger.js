import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    const expandedIngredientes = Object.keys(props.ingredients).map(
        ingredient => [...Array(props.ingredients[ingredient])].map((_, i) =>
            <BurgerIngredient key={ingredient + i} type={ingredient} />
        )
    );
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {expandedIngredientes}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default burger;
