import React from 'react';
import Item from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <Item link='/'>Burger Builder</Item>
        <Item link='/orders'>Orders</Item>
        {props.isAuth ? 
            <Item link='/logout'>Logout</Item> : 
            <Item link='/auth'>Authenticate</Item>
        }
    </ul>
);

export default navigationItems;
