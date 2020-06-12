import React, {useState} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import {checkValidity} from '../../../shared/utility';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

const ContactData = props => {
    const [isFormValid, setFormValidity] = useState(false);
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
                maxLength: 6
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            value: 'fastest',
            validation: {
            },
            valid: true,
            touched: false
        }
    });

    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let key in orderForm)
            formData[key] = orderForm[key].value;
        const order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            orderData: formData,
            userId: props.userId
        }
        props.onOrderBurger(order, props.token);
    }

    const inputChangedHandler = (event, inputId) => {
        const updatedOrderForm = {
            ...orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputId]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = checkValidity(event.target.value, updatedFormElement.validation);
        updatedOrderForm[inputId] = updatedFormElement;
        
        const formIsValid = Object.keys(updatedOrderForm)
            .map(inputId => updatedOrderForm[inputId].valid)
            .reduce((valid, crt) => valid && crt, true);

        setOrderForm(updatedOrderForm);
        setFormValidity(formIsValid);
    }

        const formElementsArray = [];
        for(let key in orderForm) {
            formElementsArray.push({
                id: key,
                config: orderForm[key]
            });
        }
        let form = (<form onSubmit={orderHandler}>
            {formElementsArray.map(elem => 
                <Input 
                    key={elem.id}
                    elementType={elem.config.elementType}
                    elementConfig={elem.config.elementConfig}
                    value={elem.config.value}
                    invalid={!elem.config.valid}
                    shouldValidate={elem.config.validation}
                    touched={elem.config.touched}
                    changed={(event) => inputChangedHandler(event, elem.id)} />)}
            <Button type='Success' disabled={!isFormValid}>ORDER</Button>
        </form>);
        if (props.loading)
            form = <Spinner />;
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
}

const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(ContactData, axios)));
