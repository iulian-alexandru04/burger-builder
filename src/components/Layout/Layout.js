import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const closeSideDrawerHandler = () => {
        setSideDrawerIsVisible(false);
    }

    const toggleDrawerHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    }

    return (
        <Fragment>
            <Toolbar
                isAuth={props.isAuthenticated}
                toggleDrawer={toggleDrawerHandler} />
            <SideDrawer
                isAuth={props.isAuthenticated}
                isOpen={sideDrawerIsVisible}
                onClose={closeSideDrawerHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Fragment>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps)(Layout);
