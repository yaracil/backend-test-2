// @flow

import * as React from "react";

import {
    FormCard,
    FormTextInput,
    FormCheckboxInput,
    StandaloneFormPage, Alert, Form, List, Card,
} from "tabler-react";
import {useLocation} from "react-router-dom";

type fieldTypes = {
    name?: string,
    email?: string,
    password?: string,
    terms?: string,
};

type touchedTypes = {
    name?: boolean,
    email?: boolean,
    password?: boolean,
    terms?: boolean,
};

type Props = {
    strings?: any,
    action?: string,
    method?: string,
    values?: any,
    errors?: fieldTypes,
    touched?: touchedTypes,
    onSubmit?: Function,
    onChange?: Function,
    onBlur?: Function,
    alertState: any

};

const strings = {
    title: "Create New Account",
    buttonText: "Create Account",
    nameLabel: "Name",
    namePlaceholder: "Enter name",
    emailLabel: "Email Address",
    emailPlaceholder: "Enter email",
    passwordLabel: "Password",
    passwordPlaceholder: "Password",
    termsLabel: "Agree to the terms and policy",
};

/**
 * A register page
 * Can be easily wrapped with form libraries like formik and redux-form
 */
function RegisterCard(props: Props): any {
    const {
        action,
        method,
        onSubmit,
        onChange,
        onBlur,
        values,
        errors,
        touched,
        alertState
    } = props;

    const location = useLocation();

    return (
        <StandaloneFormPage imageURL={"./demo/brand/walmart.png"}>
            {alertState.visible ?
                <Alert type={alertState.error ? "danger" : "primary"}>
                    <label>
                        {alertState.text}
                    </label>
                </Alert> : null}
            <FormCard
                buttonText={strings.buttonText}
                title={strings.title}
                onSubmit={onSubmit}
                action={action}
                method={method}
            >
                <FormTextInput
                    name="name"
                    label={strings.nameLabel}
                    placeholder={
                        strings.namePlaceholder
                    }
                    onChange={onChange}
                    onBlur={onBlur}
                    value={values && values.name}
                    error={errors && touched?.name && errors.name}
                />
                <FormTextInput
                    name="email"
                    label={strings.emailLabel}
                    placeholder={
                        strings.emailPlaceholder
                    }
                    onChange={onChange}
                    onBlur={onBlur}
                    value={values && values.email}
                    error={errors && touched?.email && errors.email}
                />
                <FormTextInput
                    name="password"
                    type="password"
                    label={strings.passwordLabel}
                    placeholder={
                        strings.passwordPlaceholder
                    }
                    onChange={onChange}
                    onBlur={onBlur}
                    value={values && values.password}
                    error={errors && touched?.password && errors.password}
                />
                <Form.Switch
                    checked={values.terms}
                    name="terms"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={values && values.terms}
                    label={strings.termsLabel}
                    error={errors && touched?.terms && errors.terms}
                />
                {errors?.terms && touched?.terms ?
                    <div className="text-danger">{errors.terms} </div> : null}

            </FormCard>
            <List className="list-inline mt-5 justify-content-around d-flex">
                {location.pathname !== "/forgot-password" ?
                    <List.Item className="list-inline-item">
                        <a href="./forgot-password">Reset password</a>
                    </List.Item> : null}
                {location.pathname !== "/login" ?
                    <List.Item className="list-inline-item">
                        <a href="./login">Go Sign In</a>
                    </List.Item> : null}
                {location.pathname !== "/register" ?
                    <List.Item className="list-inline-item">
                        <a href="./register">Go Sign Up</a>
                    </List.Item> : null}

            </List>
        </StandaloneFormPage>
    );
}


export default RegisterCard;
