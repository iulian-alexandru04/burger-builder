import React, {Component} from 'react';
import {connect} from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount () {
        this.props.onFetchOrders();
    }

    render () {
        let orders = <Spinner />;
        if (!this.props.loading)
            orders = this.props.orders.map(ord =>
                <Order
                    key={ord.id}
                    ingredients={ord.ingredients}
                    price={+ord.price} />
            );
        return (<div>{orders}</div>);
    }
}

const mapStateToProps = state => ({
    orders: state.order.orders,
    loading: state.order.loading
});

const mapDispatchToProps = dispatch => ({
    onFetchOrders: () => dispatch(actions.fetchOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
