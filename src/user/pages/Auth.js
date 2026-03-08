import "./Auth.css"
import { useState, useContext } from 'react';
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/components/Hooks/http-hook";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../../shared/components/Util/validators";
import { useForm } from "../../shared/components/Hooks/form-hook";
import { AuthContext } from "../../shared/Context/auth-context";

const Auth = () => {

    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false);
        }
        setIsLoginMode(prev => !prev)
    };
    const authSubmitHandler = async (event) => {
        event.preventDefault();
        //console.log(formState.inputs);
        if (isLoginMode) {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users/login',
                    'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                    // {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json'
                    //     },
                    //     body: JSON.stringify({
                    //         email: formState.inputs.email.value,
                    //         password: formState.inputs.password.value
                    //     })
                    // }
                );
                // const responseData = await response.json();
                // if (!response.ok) {
                //     throw new Error(responseData.message);
                // }
                //console.log(responseData);
                //setIsLoading(false);
                auth.login(responseData.user.id);
            } catch (err) {
                console.log(err);
                //     setIsLoading(false);
                //     setError(err.message || 'Something went wrong, please check again.');
            }
        } else {
            try {
                //setIsLoading(true);
                const responseData = await sendRequest(
                    'http://localhost:5000/api/users/signup',
                    'POST',
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                    // {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json'
                    //     },
                    //     body: JSON.stringify({
                    //         name: formState.inputs.name.value,
                    //         email: formState.inputs.email.value,
                    //         password: formState.inputs.password.value
                    //     })
                    // }
                );
                // const responseData = await response.json();
                // if (!response.ok) {
                //     throw new Error(responseData.message);
                // }
                //console.log(responseData);
                //setIsLoading(false);
                auth.login(responseData.user.id);
            } catch (err) {
                console.log(err);
                //setIsLoading(false);
                //setError(err.message || 'Something went wrong, please check again.');
            }
        }
    };
    // const errorHandler = () => {
    //     setError(null);
    // };
    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Login Required</h2>
                <hr />
                <form onSubmit={authSubmitHandler}>
                    {!isLoginMode && <Input
                        id="name"
                        element="input"
                        type="text"
                        label="Your Name"
                        validators={[VALIDATOR_REQUIRE]}
                        errorText="Please enter a valid Name."
                        onInput={inputHandler}
                    //initialValue={formState.inputs.description.value}
                    //initialValid={formState.inputs.description.isValid}
                    />}

                    <Input
                        id="email"
                        element="input"
                        type="email"
                        label="E-mail"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid Email."
                        onInput={inputHandler}
                    //initialValue={formState.inputs.description.value}
                    //initialValid={formState.inputs.description.isValid}
                    />

                    <Input
                        id="password"
                        element="input"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        errorText="Please enter a valid Password."
                        onInput={inputHandler}
                    //initialValue={formState.inputs.description.value}
                    //initialValid={formState.inputs.description.isValid}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        {isLoginMode ? 'LOGIN' : 'SIGN UP'}
                    </Button>
                </form>
                <Button
                    inverse
                    onClick={switchModeHandler}
                >
                    SWITCH TO {isLoginMode ? 'SIGN IN' : 'LOGIN'}
                </Button>
            </Card>
        </>
    );
};

export default Auth;