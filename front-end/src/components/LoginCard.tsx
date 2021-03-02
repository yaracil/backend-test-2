// @flow

import * as React from "react";

import {Alert, FormCard, FormTextInput, StandaloneFormPage} from "tabler-react";


type fieldTypes = {
    email?: string,
    password?: string,
};

type touchedTypes = {
    email?: boolean,
    password?: boolean,
};

type Props = {
    strings?: any,
    action?: string,
    method?: string,
    imageURL?: string,
    values?: fieldTypes,
    errors?: fieldTypes,
    touched?: touchedTypes,
    onSubmit?: Function,
    onChange?: Function,
    onBlur?: Function,
    alertState: any
};

const strings = {
    title: "Login to your Account",
    buttonText: "Login",
    emailLabel: "Email Address",
    emailPlaceholder: "Enter email",
    passwordLabel: "Password",
    passwordPlaceholder: "Password",
};

/**
 * A login page
 * Can be easily wrapped with form libraries like formik and redux-form
 */
function LoginCard(props: Props): any {
    const {
        action,
        method,
        onSubmit,
        onChange,
        onBlur,
        values,
        errors,
        alertState,
        imageURL
    } = props;

    return (
        <StandaloneFormPage className="mt-8" imageURL={"./demo/brand/walmart.png"}>
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
                    name="email"
                    label={strings.emailLabel}
                    placeholder={
                        strings.emailPlaceholder
                    }
                    onChange={onChange}
                    onBlur={onBlur}
                    value={values && values.email}
                    error={errors && errors.email}
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
                    error={errors && errors.password}
                />
            </FormCard>
        </StandaloneFormPage>
    );
}

export default LoginCard;
