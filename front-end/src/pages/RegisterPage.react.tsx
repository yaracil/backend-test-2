import * as React from "react";
import {Formik} from 'formik';
import {RegisterPage as TablerRegisterPage} from "tabler-react";


function RegisterPage() {
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
            ) => {
                alert("Done!");
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
                <TablerRegisterPage
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values}
                    errors={errors}
                    touched={touched}
                />)}
        />
    );
}

export default RegisterPage;
