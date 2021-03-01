// @flow

import React from "react";

import SiteWrapper from "../SiteWrapper.react";
import {Form, Button, Card, Grid, Icon, Page, Table, Text, FormTextInput, Alert, List} from "tabler-react";
import {useFormik} from "formik";
import {DEFAULT_REQUEST_ERROR} from "../util/Constants";
import {AxiosResponse} from "axios";
import ItemService from "../services/items.service";
import OrdersService from "../services/orders.service";

const validate = async (values: any) => {
    let errors: any = {};

    if (!values.feedback) {
        errors.feedback = 'Required';
    } else if (values.feedback.length > 500) {
        errors.feedback = 'Must be 15 characters or less';
    }
    if (values.items.length === 0) {
        errors.items = 'Required';
    }
    return errors;
};

const defaultStrings = {
    notesLabel: "Notes",
    notesPlaceholder: "Enter notes",
    feedbackLabel: "Feedback",
    feedbackPlaceholder: "Enter feedback",
    rateLabel: "Rate",
    ratePlaceholder: "Enter rate",
    itemsLabel: "Items",
    itemsPlaceholder: "Select items",

};

type fieldTypes = {
    idOrder: number,
    notes?: string,
    feedback?: string,
    rate?: number,
    items?: any,
    isEditing: false
    idUser?: number,
    user?: any
};

function Orders() {

    const [alertState, setAlertState] = React.useState({visible: false, text: "", error: false});
    const orderService = React.useMemo(() => new OrdersService(null), []);
    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await orderService.getAll();
                setOrders(response.data);
            } catch (error) {
                setAlertState({visible: true, text: error.message, error: true});
            }
        }
        fetchOrders();
    }, []);

    const handleDelete = async (idOrder: number) => {
        try {
            await orderService.delete(idOrder);
            setOrders(orders.filter((item_: any) => item_.idOrder !== idOrder))
        } catch (error) {
            setAlertState({visible: true, text: "Item has related orders", error: true});
            console.log("Error #Orders " + error);
        }
    }

    const handleEdit = async (values: fieldTypes, setValues: any) => {
        const dataRequest = {
            feedback: values.feedback,
            items: values.items.map((item_: any) => item_.idItem),
            idUser: values.idUser,
            rate: values.rate,
            notes: values.notes
        };
        let errorMessage = DEFAULT_REQUEST_ERROR;
        let send = false;
        try {
            const {data: response}: AxiosResponse = await orderService.update(values.idOrder, dataRequest);
            if (response.success === "true") {
                setValues({...values, active: false});
                const newOrders = orders.map((order_: any) => order_.idOrder === values.idOrder ? response.data : order_);
                setOrders(newOrders)
                send = true;
                return;
            }
            if (response?.internalError) {
                errorMessage = response.message;
            }
        } catch (error) {
            console.log("Error #Orders 2" + error);
        } finally {
            if (!send) {
                setValues({...values, active: false});
                setAlertState({visible: true, text: errorMessage, error: true});
            }
        }

    }

    function prepareEdit(order: fieldTypes) {
        console.log("lo que llega al setear values " + JSON.stringify(order));
        formik.setValues({
            idOrder: order.idOrder,
            notes: order.notes,
            feedback: order.feedback,
            rate: order.rate,
            items: order.items,
            idUser: order.user.idUser,
            isEditing: true,
        })
    }

    const formik = useFormik({
        initialValues: {
            idOrder: null,
            notes: '',
            feedback: '',
            rate: 0,
            items: [],
            isEditing: false,
            idUser: null,
        },
        validate: validate,
        onSubmit: (values, {setSubmitting, setValues, resetForm}) => {
            handleEdit(values, setValues).then(() => {
                setSubmitting(false);
                resetForm();
            })
        },
    });

    return <SiteWrapper>
        <Page.Content title="Orders">
            <Grid.Col width={12}>
                {alertState.visible ?
                    <Alert isDismissible type={alertState.error ? "danger" : "primary"}>
                        {/*<Header.H4>Some Message</Header.H4>*/}
                        <label>
                            {alertState.text}
                        </label>
                    </Alert> : null
                }
                {formik.values.isEditing ? <Card>
                    <Card.Header>
                        <Card.Title>Edit order</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={formik.handleSubmit}>
                            <div className="justify-content-around d-flex flex-row">
                                <div className="w-75 mr-5">
                                    <Form.Group
                                        label={defaultStrings.notesLabel}
                                    >
                                        <FormTextInput
                                            disabled={formik.isSubmitting}
                                            name="notes"
                                            placeholder={
                                                defaultStrings.notesPlaceholder
                                            }
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.notes}
                                            error={formik.errors?.notes && formik.touched?.notes ? formik.errors.notes : null}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="w-25">
                                    <Form.Group label="Rate" className="mr-3">
                                        <Form.Select
                                            onChange={formik.handleChange}
                                            isInline
                                            name="rate"
                                            value={formik.values.rate}
                                            onBlur={formik.handleBlur}
                                        >
                                            {[1, 2, 3, 4, 5].map(option =>
                                                <option>
                                                    {option}
                                                </option>
                                            )}
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            </div>
                            {/*<Form.Group label="Select items">*/}
                            {/*    <Form.SelectGroup*/}
                            {/*        canSelectMultiple*/}
                            {/*        pills*/}
                            {/*    >*/}
                            {/*        {*/}
                            {/*            formik.values.items.map((item: any) =>*/}
                            {/*                <Form.SelectGroupItem*/}
                            {/*                    label={"Item: " + item.name + " - Price: $" + item.price}*/}
                            {/*                    name="items"*/}
                            {/*                    value={item.idItem}*/}
                            {/*                />)*/}
                            {/*        }*/}

                            {/*    </Form.SelectGroup>*/}
                            {/*</Form.Group>*/}
                            <Form.Group
                                isRequired
                                label={defaultStrings.feedbackLabel}
                            >
                                <Form.Textarea
                                    rows={5}
                                    disabled={formik.isSubmitting}
                                    name="feedback"
                                    placeholder={
                                        defaultStrings.feedbackPlaceholder
                                    }
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.feedback}
                                    error={formik.errors?.feedback && formik.touched?.feedback ? formik.errors.feedback : null}
                                /></Form.Group>
                            <Button.List className="mt-4" align="right">
                                {
                                    <Button loading={formik.isSubmitting} type="submit"
                                            color="primary">Save changes</Button>
                                }

                            </Button.List>
                        </Form>
                    </Card.Body>
                </Card> : null}
                <Card title="List of orders">
                    <Table
                        responsive
                        className="card-table table-vcenter text-nowrap"
                        headerItems={[
                            {content: "No.", className: "w-1"},
                            {content: "Notes"},
                            {content: "Feedback"},
                            {content: "User"},
                            {content: "Items"},
                            {content: "Rate"},
                            {content: null},
                        ]}
                        bodyItems={
                            orders.map((order: fieldTypes) => {
                                    return {
                                        key: order.idOrder,
                                        item: [
                                            {
                                                content: (
                                                    <Text RootComponent="span" muted>
                                                        {order.idOrder}
                                                    </Text>
                                                ),
                                            },
                                            {content: order.notes},
                                            {content: order.feedback},
                                            {content: order.user.name},
                                            {
                                                content: (
                                                    <List>
                                                        {order.items.map((item_: any) =>
                                                            <List.Item>{item_.name}</List.Item>)}
                                                    </List>
                                                )
                                            },
                                            {content: order.rate},
                                            {
                                                alignContent: "right",
                                                content: (
                                                    <React.Fragment>
                                                        <Button onClick={() => prepareEdit(order)} color="primary">
                                                            <Icon name="edit"/>
                                                        </Button>
                                                        <Button onClick={() => handleDelete(order.idOrder)} className="ml-5"
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

export default Orders;
