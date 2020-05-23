import React, {Component, Fragment} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        ordered: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://burger-builder-8a9d1.firebaseio.com/ingredients.json')
            .then(response => {this.setState({ingredients: response.data});})
            .catch(error => {});
    }

    upsatePurchaseState = (crt_ingredients) => {
        const noIngredients = Object.keys(crt_ingredients)
            .map(ingr => crt_ingredients[ingr])
            .reduce((total, el) => total+el, 0);
        this.setState({purchasable: noIngredients > 0});
    }

    addIngredientHandler = (type) => {
        let crt_ingredients = {...this.state.ingredients}
        crt_ingredients[type]++;
        const new_price = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({ingredients: crt_ingredients, totalPrice: new_price});
        this.upsatePurchaseState(crt_ingredients);
    }

    removeIngredientHandler = (type) => {
        const crt_ingredients = {...this.state.ingredients}
        crt_ingredients[type]--;
        const new_price = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({ingredients: crt_ingredients, totalPrice: new_price});
        this.upsatePurchaseState(crt_ingredients);
    }

    orderHandler = () => {
        this.setState({ordered: true});
    }

    cancelOrderHandler = () => {
        this.setState({ordered: false});
    }

    continueOrderHandler = () => {
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     address: {
        //         street: 'Teststreet 1',
        //         zipCode: '1234',
        //         country: 'Germany'
        //     },
        //     email: 'test@test.com',
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json', order)
        //     .then(response => {this.setState({loading: false, ordered: false});})
        //     .catch(error => {this.setState({loading: false, ordered: false});});
        const queryParams = [];
        for(let i in this.state.ingredients)
            queryParams.push(encodeURI(i) + '=' + encodeURI(this.state.ingredients[i]))
        const queryString = queryParams.join('&');
        this.props.history.push(
            {
                pathname: '/checkout',
                search: '?' + queryString
            });
    }

    render () {
        const disabledInfo = {...this.state.ingredients};
        for(let ingr in disabledInfo)
            disabledInfo[ingr] = disabledInfo[ingr] <= 0;
        let orderSummary = null;
        if(this.state.loading)
            orderSummary = <Spinner />;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        onOrder={this.orderHandler}
                        price={this.state.totalPrice} />
                </Fragment>
            );

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
