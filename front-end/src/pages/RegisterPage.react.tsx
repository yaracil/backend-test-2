import * as React from "react";
import {Formik} from 'formik';
import {Alert, RegisterPage as TablerRegisterPage} from "tabler-react";
import CardWrapperForm from "../components/CardWrapperForm";
import {DEFAULT_REQUEST_ERROR} from "../util/Constants";
import UserService from "../services/user.service";
import {AxiosResponse} from "axios";
import RegisterCard from "../components/RegisterCard";


function RegisterPage() {
    const [alertState, setAlertState] = React.useState({visible: false, text: "", error: false});
    const userService = React.useMemo(() => new UserService(""), []);

    const handleRegister = async (values: any) => {
        const formAccount = {
            name: values.name,
            email: values.email,
            password: values.password,
        }
        console.log("sending " + JSON.stringify(formAccount));
        let errorMessage = DEFAULT_REQUEST_ERROR;
        let send = false;
        try {
            const {data: response}: AxiosResponse = await userService.create(formAccount);
            if (response.success) {
                setAlertState({visible: true, text: "User Registered. Go sign in to begin.", error: false})
                send = true;
                return;
            }
            if (response?.internalError) {
                errorMessage = response.message;
            }
        } catch (error) {
            console.info("Error #RegisterPage " + error);
        } finally {
            if (!send) {
                setAlertState({visible: true, text: errorMessage, error: true});
            }
        }
    };
    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                password: "",
                terms: false
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
                if (!values.name) {
                    errors.email = "Required";
                }
                if (!values.password) {
                    errors.password = "Required";
                }
                if (!values.terms) {
                    errors.terms = "Required";
                }
                return errors;
            }}
            onSubmit={(
                values,
                {setSubmitting, setErrors /* setValues and other goodies */}
            ) =>
                handleRegister(values).then(() => {
                    setSubmitting(false);
                })
            }
            render={({
                         values,
                         errors,
                         touched,
                         handleChange,
                         handleBlur,
                         handleSubmit,
                         isSubmitting,
                     }) => (
                <div>

                    <RegisterCard
                        alertState={alertState}
                        onSubmit={handleSubmit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        values={values}
                        errors={errors}
                        touched={touched}
                    /></div>)}
        />
    );
}

export default RegisterPage;
