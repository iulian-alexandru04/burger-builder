import React, {Component, Fragment} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false
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

    render () {
        const disabledInfo = {...this.state.ingredients};
        for(let ingr in disabledInfo)
            disabledInfo[ingr] = disabledInfo[ingr] <= 0;
        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice} />
            </Fragment>
        );
    }
}

export default BurgerBuilder;
