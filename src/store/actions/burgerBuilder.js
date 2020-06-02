import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredient = name => ({
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
});

export const removeIngredient = name => ({
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
});

export const setIngredients = (ingredients) => ({
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
});

export const signalFetchIngredientsFailure = () => ({
    type: actionTypes.SIGNAL_FETCH_INGREDIENTS_FAILURE
});

export const initIngredients = () => dispatch => {
    axios.get('https://burger-builder-8a9d1.firebaseio.com/ingredients.json')
        .then(response => {dispatch(setIngredients(response.data));})
        .catch(error => {dispatch(signalFetchIngredientsFailure())});
};
