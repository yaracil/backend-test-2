// @flow

import * as React from "react";
import {Form, Card, Button, List} from "tabler-react";
import {useLocation} from "react-router-dom";

type Props = {
    action?: string,
    children?: any,
    method?: string,
    title: string,
    buttonText: string,
    onSubmit?: Function,
    isSubmitting?: boolean,
    showSubmitButton?: boolean | string,
};

function CardWrapperFormET({
                               children,
                               action,
                               method,
                               onSubmit,
                               title,
                               buttonText,
                               isSubmitting,
                               showSubmitButton
                           }: Props): any {
    const location = useLocation();
    return (
        <Form className="card" onSubmit={onSubmit} action={action} method={method}>
            <Card.Body className="p-6">
                <Card.Title RootComponent="div">{title}</Card.Title>
                {children}
                {showSubmitButton ?
                    <Form.Footer>
                        <Button type="submit" color="primary" block={true} loading={isSubmitting}>
                            {buttonText}
                        </Button>
                    </Form.Footer> : null
                }
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
            </Card.Body>
        </Form>
    );
}

export default CardWrapperFormET;
