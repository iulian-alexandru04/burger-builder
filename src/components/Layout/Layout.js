import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer: false});
    }

    toggleDrawerHandler = () => {
        this.setState( prevState => ({showSideDrawer: !prevState.showSideDrawer}) );
    }

    render() {
        return (
            <Fragment>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    toggleDrawer={this.toggleDrawerHandler} />
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
                    isOpen={this.state.showSideDrawer} 
                    onClose={this.closeSideDrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
        
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps)(Layout);
