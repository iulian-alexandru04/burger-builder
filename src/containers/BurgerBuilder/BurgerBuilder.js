import React, {useState, useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import * as actions from '../../store/actions/index';

const BurgerBuilder = props => {
    const [isOrdered, setOrderedStatus] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    }, []);

    const isPurchasable = (crt_ingredients) => {
        const noIngredients = Object.keys(crt_ingredients)
            .map(ingr => crt_ingredients[ingr])
            .reduce((total, el) => total + el, 0);
        return noIngredients > 0;
    }

    const orderHandler = () => {
        if (props.isAuth)
            setOrderedStatus(true);
        else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const cancelOrderHandler = () => {
        setOrderedStatus(false);
    }

    const continueOrderHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }

    const disabledInfo = { ...props.ingredients };
    for (let ingr in disabledInfo)
        disabledInfo[ingr] = disabledInfo[ingr] <= 0;
    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    if (props.ingredients) {
        burger = (
            <Fragment>
                <Burger ingredients={props.ingredients} />
                <BuildControls
                    addIngredient={props.onIngredientAdded}
                    removeIngredient={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={isPurchasable(props.ingredients)}
                    onOrder={orderHandler}
                    isAuth={props.isAuth}
                    price={props.totalPrice} />
            </Fragment>
        );

        orderSummary = <OrderSummary
            ingredients={props.ingredients}
            price={props.totalPrice}
            onCancel={cancelOrderHandler}
            onContinue={continueOrderHandler} />;
    }

    return (
        <Fragment>
            <Modal show={isOrdered} onClose={cancelOrderHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Fragment>
    );
}

const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
