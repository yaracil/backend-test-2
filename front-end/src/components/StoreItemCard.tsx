//@flow

import * as React from "react";

import {Form, Button, Card, Grid, Icon, Page, Table, Text, FormTextInput, Alert} from "tabler-react";

type Props = {
    children?: any,
    title?: string,
    price?: string,
    subtitle?: string,
    imgUrl?: string,
    imgAlt?: string,
    active?: string,
    onChange?: Function
};

function StoreCard({
                       title,
                       subtitle,
                       price,
                       imgUrl,
                       imgAlt,
                       active, onChange
                   }: Props): any {
    return (
        <Card>
            <Card.Body>
                <div className="mb-4 text-center">
                    <img src={imgUrl} alt={imgAlt}/>
                </div>
                <Card.Title>{title}</Card.Title>
                <Text className="card-subtitle">{subtitle}</Text>

                <div className="mt-5 d-flex align-items-center">
                    <div className="product-price">
                        <strong>{price}</strong>
                    </div>
                    <div className="ml-auto">
                        <Button onClick={onChange} color={active ? "success" : "primary"}>
                            <Icon prefix="fe" name={active ? "check" : "plus"}/>
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default StoreCard;
