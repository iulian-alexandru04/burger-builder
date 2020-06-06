import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        }
    }

    checkValidity(value, rules) {
        if(rules.required && value.trim() === '')
            return false;
        if(rules.minLength && value.trim().length < rules.minLength)
            return false;
        if(rules.maxLength && value.trim().length > rules.maxLength)
            return false;
        return true;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    render () {
        const formElementsArray = [];
        for(let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const authForm = formElementsArray.map(elem => (
            <Input key={elem.id}
                elementType={elem.config.elementType}
                elementConfig={elem.config.elementConfig}
                value={elem.config.value}
                invalid={!elem.config.valid}
                shouldValidate={elem.config.validation}
                touched={elem.config.touched}
                changed={(event) => this.inputChangedHandler(event, elem.id)} />
        ));

        return (
            <div className={classes.Auth}>
                <form>
                    {authForm}
                    <Button type='Success'>SUBMIT</Button>
                </form>
            </div>
        );
    }
}

export default Auth;
