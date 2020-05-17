import React, {Fragment} from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(ingr => <li key={ingr}>{ingr}: {props.ingredients[ingr]}</li>);
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>{ingredientSummary}</ul>
            <p>Continue to checkout?</p>
            <Button type='Danger' clicked={props.onCancel}>CANCEL</Button>
            <Button type='Success'clicked={props.onContinue}>CONTINUE</Button>
        </Fragment>
    );
};

export default orderSummary;