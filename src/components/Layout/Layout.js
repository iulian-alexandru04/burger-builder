import React, {Fragment, Component} from 'react';
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
                <Toolbar toggleDrawer={this.toggleDrawerHandler} />
                <SideDrawer isOpen={this.state.showSideDrawer} onClose={this.closeSideDrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
        
    }
}

export default Layout;
