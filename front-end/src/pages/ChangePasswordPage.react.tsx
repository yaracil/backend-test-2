// @flow

import * as React from "react";
import {StandaloneFormPage, FormCard, FormTextInput, Alert, Button} from "tabler-react";
import {useFormik} from "formik";
import {useLocation} from "react-router-dom";
import UserService from "../services/user.service";
import CardWrapperFormET from '../components/CardWrapperFormET'
import {AxiosResponse} from "axios";
import {DEFAULT_REQUEST_ERROR} from "../util/Constants";


type fieldTypes = {
    password?: string,
    confirmedPassword?: string,
    active?: boolean,
    email?: string,
};

type touchedTypes = {
    password?: string,
    confirmedPassword?: string,
};

const defaultStrings = {
    title: "Change Password",
    buttonText: "Change Password",
    passwordLabel: "New Password",
    passwordPlaceholder: "Enter new password",
    confirmPasswordLabel: "Repeat New Password",
    confirmPasswordPlaceholder: "Enter new password again",
    instructions:
        "Enter your email address and your password will be reset and emailed to you.",


};

const validate = async (values: any) => {
    let errors: any = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    return errors;
};

/**
 * A forgot password page
 * Can be easily wrapped with form libraries like formik and redux-form
 */
function ChangePasswordPage(): any {

    const [alertState, setAlertState] = React.useState({visible: false, text: "", error: false});
    const location = useLocation();

    const userToken = React.useMemo(() => new URLSearchParams(location.search).get("token"), [location])

    const userService = React.useMemo(() => new UserService(null), [])

    const handleSubmit = async (values: fieldTypes, setValues: Function) => {
        const dataRequest = {email: values.email, token: userToken, newPassword: values.confirmedPassword};
        console.log("data sent " + JSON.stringify(dataRequest));
        let errorMessage = "No se pudo cambiar la contraseña. Por favor, intentelo mas tarde";
        try {
            const {data: response}: AxiosResponse = await userService.forgotPasswordConfirm(dataRequest);
            if (response.success && response.confirmed === "true") {
                setValues({...values, active: false});
                setAlertState({visible: true, text: "La contraseña se ha cambiado correctamente!!", error: false})
                return;
            }
            if (response?.internalError) {
                errorMessage = response.message;
            }
        } catch (error) {
            console.log("Error #ChangePassword " + error);
        } finally {
            setValues({...values, active: false});
            setAlertState({visible: true, text: errorMessage, error: true});
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmedPassword: '',
            active: false
        },
        validate: validate,
        onSubmit: (values, {setSubmitting, setValues}) => {
            handleSubmit(values, setValues).then(() => {
                setSubmitting(false);
            })
        },
    });

    React.useEffect(() => {
        if (userToken) {
            let errorMessage = "El enlace esta dañado o ya no se encuentra disponible";
            let flag = true;
            userService.forgotPasswordVerify(userToken).then(({data: response}: AxiosResponse) => {
                console.log("Response " + JSON.stringify(response));
                if (response.success && response.username) {
                    formik.setValues({...formik.values, active: true, email: response.username});
                    return;
                }
                if (response?.internalError) {
                    errorMessage = response.message;
                }
                formik.setValues({...formik.values, active: false});
                setAlertState({visible: true, text: errorMessage, error: true})
            }).catch((error: any) => {
                errorMessage = DEFAULT_REQUEST_ERROR;
                console.log("Error #ChangePassword2 " + error);
            }).finally(() => {
                if (!flag) {
                    formik.setValues({...formik.values, active: false});
                    setAlertState({visible: true, text: errorMessage, error: true});
                }
            });
        } else {
            formik.setValues({...formik.values, active: false});
            setAlertState({visible: true, text: DEFAULT_REQUEST_ERROR, error: true})
        }
    }, [userToken])

    return (
        <div id="change-password-page" className="mt-7">
            <StandaloneFormPage imageURL={"./assets/images/logo_standalone.png"}>
                <CardWrapperFormET
                    buttonText={defaultStrings.buttonText}
                    title={defaultStrings.title}
                    onSubmit={formik.handleSubmit}
                    isSubmitting={formik.isSubmitting}
                    showSubmitButton={formik.values.active}
                >
                    {alertState.visible ?
                        <Alert type={alertState.error ? "danger" : "primary"}>
                            {/*<Header.H4>Some Message</Header.H4>*/}
                            <label>
                                {alertState.text}
                            </label>
                        </Alert> : <p className="text-muted">
                            {defaultStrings.instructions}
                        </p>}
                    <FormTextInput
                        name="password"
                        disabled={formik.isSubmitting || !formik.values.active}
                        label={defaultStrings.passwordLabel}
                        type="password"
                        placeholder={defaultStrings.passwordPlaceholder
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values && formik.values.password}
                        error={formik.errors && formik.touched?.password && formik.errors.password}
                    />
                    <FormTextInput
                        name="confirmedPassword"
                        type="password"
                        label={defaultStrings.confirmPasswordLabel}
                        disabled={formik.isSubmitting || !formik.values.active}
                        placeholder={defaultStrings.confirmPasswordPlaceholder
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values && formik.values.confirmedPassword}
                        error={formik.errors && formik.touched?.confirmedPassword && formik.errors.confirmedPassword}
                    />
                </CardWrapperFormET>
            </StandaloneFormPage>
        </div>
    );
}

export default ChangePasswordPage;
