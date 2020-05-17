import React, {Fragment} from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    const visibility = props.isOpen ? classes.Open : classes.Close;
    const assignedClasses = [classes.SideDrawer, visibility].join(' ');
    return (
        <Fragment>
            <Backdrop show={props.isOpen} clicked={props.onClose} />
            <div className={assignedClasses}>
                <div className={classes.Logo}><Logo /></div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>
        
    );
};

export default sideDrawer;