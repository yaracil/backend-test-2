// @flow

import * as React from "react";
import {Formik} from "formik";
import LoginCard from "../components/LoginCard"
import UserService from "../services/user.service";
import {useAuthContext} from "../contexts/AuthenticationContext";


function LoginPage(props: any) {

    const {user, loginUser} = useAuthContext();
    const userService = React.useMemo(() => new UserService(null), [])


    React.useEffect(() => {
        if (user?.token) {
            props.history.push("/dashboard");
        }
    }, [user]);

    const [alertState, setAlertState] = React.useState({
        visible: false,
        text: "",
        error: false,
    });

    const handleLogin = async (values: { email: any; password: any; showConfirmForm?: boolean; token?: string; active?: boolean; }, {
        setValues,
        setSubmitting
    }: { setValues: (values: any, shouldValidate?: boolean | undefined) => void; setSubmitting: (isSubmitting: boolean) => void; }) => {

        try {
            const response: any = await loginUser({
                username: values.email,
                password: values.password,
            });
            if (response.internalError) {
                setAlertState({
                    ...alertState,
                    visible: true,
                    text: response.message,
                    error: true,
                    withActions: false,
                });
            }
        } catch (error) {
            console.log(error);
            setAlertState({
                ...alertState,
                visible: true,
                text: "Something was wrong try again later",
                error: true,
                withActions: false,
            });
        }
    };


    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            validate={values => {
                // same as above, but feel free to move this into a class method now.
                let errors: any = {};
                if (!values.email) {
                    errors.email = "Required";
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                ) {
                    errors.email = "Invalid email address";
                }
                return errors;
            }}
            onSubmit={(
                values,
                {setSubmitting, setValues /* setValues and other goodies */}
            ) => {
                handleLogin(values,
                    {setValues, setSubmitting}).then(() => setSubmitting(false))
            }}
            render={({
                         values,
                         errors,
                         touched,
                         handleChange,
                         handleBlur,
                         handleSubmit,
                         isSubmitting,
                     }) => (
                <LoginCard
                    alertState={alertState}
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values}
                    errors={errors}
                    touched={touched}
                />
            )}
        />
    );
}

export default LoginPage;
