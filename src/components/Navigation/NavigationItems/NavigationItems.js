import React from 'react';
import Item from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <Item link='/' active>Burger Builder</Item>
        <Item link='/'>Checkout</Item>
    </ul>
);

export default navigationItems;
