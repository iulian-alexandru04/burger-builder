import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        ordered: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        // axios.get('https://burger-builder-8a9d1.firebaseio.com/ingredients.json')
        //     .then(response => {this.setState({ingredients: response.data});})
        //     .catch(error => {});
    }

    isPurchasable = (crt_ingredients) => {
        const noIngredients = Object.keys(crt_ingredients)
            .map(ingr => crt_ingredients[ingr])
            .reduce((total, el) => total+el, 0);
        return noIngredients > 0;
    }

    orderHandler = () => {
        this.setState({ordered: true});
    }

    cancelOrderHandler = () => {
        this.setState({ordered: false});
    }

    continueOrderHandler = () => {
        this.props.history.push('/checkout');
    }

    render () {
        const disabledInfo = {...this.props.ingredients};
        for(let ingr in disabledInfo)
            disabledInfo[ingr] = disabledInfo[ingr] <= 0;
        let orderSummary = null;
        if(this.state.loading)
            orderSummary = <Spinner />;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if (this.props.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        addIngredient={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.isPurchasable(this.props.ingredients)}
                        onOrder={this.orderHandler}
                        price={this.props.totalPrice} />
                </Fragment>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                onCancel={this.cancelOrderHandler}
                onContinue={this.continueOrderHandler} />;
        }
            
        return (
            <Fragment>
                <Modal show={this.state.ordered} onClose={this.cancelOrderHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
});
const mapDispatchToProps = dispatch => ({
    onIngredientAdded: (ingName) => 
        dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => 
        dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
