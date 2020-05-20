import React, { Fragment, Component } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show ||
            nextProps.children !== this.props.children;
    }

    render() {
        const visible = this.props.show ? classes.Show : classes.Hide;
        const assignedClasses = [classes.Modal, visible].join(' ');
        return (
            <Fragment>
                <Backdrop show={this.props.show} clicked={this.props.onClose} />
                <div className={assignedClasses}>
                    {this.props.children}
                </div>
            </Fragment>

        )
    }
};

export default Modal;