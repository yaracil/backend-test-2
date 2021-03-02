// @flow

import React from "react";

import SiteWrapper from "../SiteWrapper.react";
import {Form, Button, Card, Grid, Icon, Page, Table, Text, FormTextInput, Alert} from "tabler-react";
import {useFormik} from "formik";
import {DEFAULT_REQUEST_ERROR} from "../util/Constants";
import {AxiosResponse} from "axios";
import ItemService from "../services/items.service";
import OrdersService from "../services/orders.service";
import {useAuthContext} from "../contexts/AuthenticationContext";

const validate = async (values: any) => {
    let errors: any = {};

    if (!values.name) {
        errors.name = 'Required';
    } else if (values.name.length > 100) {
        errors.name = 'Must be 15 characters or less';
    }
    if (!values.price) {
        errors.price = 'Required';
    } else if (values.price.length > 15) {
        errors.price = 'Must be 15 characters or less';
    }
    return errors;
};

const defaultStrings = {
    nameLabel: "Name",
    namePlaceholder: "Enter name",
    priceLabel: "Price",
    pricePlaceholder: "Enter price",

};

type fieldTypes = {
    idItem: number,
    name?: string,
    price?: number,
    isEditing: false
};

function Items() {

    const {user} = useAuthContext();
    const [alertState, setAlertState] = React.useState({visible: false, text: "", error: false});
    const itemService = React.useMemo(() => new ItemService(user.token), [user]);
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {

        const fetchItems = async () => {
            try {
                const response = await itemService.getAll();
                setItems(response.data);
                console.log("items " + JSON.stringify(response.data));
            } catch (error) {
                setAlertState({visible: true, text: error.message, error: true});
            }
        }
        fetchItems();
    }, []);

    const handleSubmit = async (values: fieldTypes, setValues: Function) => {
        const dataRequest = {price: values.price, name: values.name};
        console.log("data sent new item" + JSON.stringify(dataRequest));
        let errorMessage = DEFAULT_REQUEST_ERROR;
        let send = false;
        try {
            const {data: response}: AxiosResponse = await itemService.create(dataRequest);
            if (response.success === "true") {
                setValues({...values, active: false});
                const newItems = items.concat([response.data]);
                console.log("newItems " + JSON.stringify(newItems))
                setItems(items.concat([response.data]))
                send = true;
                return;
            }
            if (response?.internalError) {
                errorMessage = response.message;
            }
        } catch (error) {
            console.log("Error #Items " + error);
        } finally {
            if (!send) {
                setValues({...values, active: false});
                setAlertState({visible: true, text: errorMessage, error: true});
            }
        }
    };

    const handleDelete = async (idItem: number) => {
        try {
            await itemService.delete(idItem);
            setItems(items.filter((item_: any) => item_.idItem !== idItem))
        } catch (error) {
            setAlertState({visible: true, text: "Item has related orders", error: true});
            console.log("Error #Items " + error);
        }
    }

    const handleEdit = async (values: fieldTypes, setValues: any) => {
        const dataRequest = {price: values.price, name: values.name};
        console.log("data sent edited item" + JSON.stringify(dataRequest));
        let errorMessage = DEFAULT_REQUEST_ERROR;
        let send = false;
        try {
            const {data: response}: AxiosResponse = await itemService.update(values.idItem, dataRequest);
            if (response.success === "true") {
                setValues({...values, active: false});
                const newItems = items.map((item_: any) => item_.idItem === values.idItem ? response.data : item_);
                setItems(newItems)
                send = true;
                return;
            }
            if (response?.internalError) {
                errorMessage = response.message;
            }
        } catch (error) {
            console.log("Error #Items 2" + error);
        } finally {
            if (!send) {
                setValues({...values, active: false});
                setAlertState({visible: true, text: errorMessage, error: true});
            }
        }

    }

    function prepareEdit(item: fieldTypes) {
        formik.setValues({
            idItem: item.idItem,
            name: item.name,
            price: item.price,
            isEditing: true
        });
        window.scrollTo(0, 0);
    }

    const formik = useFormik({
        initialValues: {
            idItem: null,
            name: '',
            price: 0,
            isEditing: false
        },
        validate: validate,
        onSubmit: (values, {setSubmitting, setValues, resetForm}) => {
            if (!values.isEditing)
                handleSubmit(values, setValues).then(() => {
                    setSubmitting(false);
                })
            else handleEdit(values, setValues).then(() => {
                setSubmitting(false);
                resetForm();
            })
        },
    });

    return <SiteWrapper>
        <Page.Content title="Items">
            <Grid.Col width={12}>
                {alertState.visible ?
                    <Alert isDismissible type={alertState.error ? "danger" : "primary"}>
                        {/*<Header.H4>Some Message</Header.H4>*/}
                        <label>
                            {alertState.text}
                        </label>
                    </Alert> : null
                }
                <Card>
                    <Card.Header>
                        <Card.Title>Create new item</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={formik.handleSubmit}>
                            <div className="justify-content-around d-flex flex-row">
                                <div className="w-50 mr-5">
                                    <Form.Group
                                        label={defaultStrings.nameLabel}
                                    >
                                        <FormTextInput
                                            disabled={formik.isSubmitting}
                                            name="name"
                                            placeholder={
                                                defaultStrings.namePlaceholder
                                            }
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.name}
                                            error={formik.errors?.name && formik.touched?.name ? formik.errors.name : null}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="w-50">
                                    <Form.Group
                                        isRequired
                                        label={defaultStrings.priceLabel}
                                    >
                                        <FormTextInput
                                            disabled={formik.isSubmitting}
                                            name="price"
                                            type="number"
                                            placeholder={
                                                defaultStrings.pricePlaceholder
                                            }
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.price}
                                            error={formik.errors?.price && formik.touched?.price ? formik.errors.price : null}
                                        /></Form.Group>
                                    <Button.List className="mt-4" align="right">
                                        {
                                            !formik.values.isEditing ?
                                                <Button loading={formik.isSubmitting} type="submit"
                                                        color="primary">Add</Button> :
                                                <Button loading={formik.isSubmitting} type="submit"
                                                        color="primary">Save changes</Button>
                                        }

                                    </Button.List></div>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
                <Card title="List of items">
                    <Table
                        responsive
                        className="card-table table-vcenter text-nowrap"
                        headerItems={[
                            {content: "No.", className: "w-1"},
                            {content: "Name"},
                            {content: "Price"},
                            {content: null},
                        ]}
                        bodyItems={
                            items.map((item: any) => {
                                    return {
                                        key: item.idItem,
                                        item: [
                                            {
                                                content: (
                                                    <Text RootComponent="span" muted>
                                                        {item.idItem}
                                                    </Text>
                                                ),
                                            },
                                            {
                                                content: item.name,
                                            },
                                            {content: item.price},
                                            {
                                                alignContent: "right",
                                                content: (
                                                    <React.Fragment>
                                                        <Button onClick={() => prepareEdit(item)} color="primary">
                                                            <Icon name="edit"/>
                                                        </Button>
                                                        <Button onClick={() => handleDelete(item.idItem)} className="ml-5"
                                                                color="secondary">
                                                            <Icon name="trash"/>
                                                        </Button>
                                                    </React.Fragment>
                                                ),
                                            }
                                        ],
                                    }
                                },
                            )
                        }
                    />
                </Card>
            </Grid.Col>
        </Page.Content>
    </SiteWrapper>;
}

export default Items;
