// @flow

import * as React from "react";

import {
    Page,
    Avatar,
    Icon,
    Grid,
    Card,
    Text,
    Table,
    Dropdown,
    Button,
    StampCard,
    StatsCard,
    StoreCard,
    Badge,
    Form,
    Container,
    Media, FormTextInput, Alert
} from "tabler-react";

import C3Chart from "react-c3js";

import StoreItemCard from "../components/StoreItemCard";
import SiteWrapper from "../SiteWrapper.react";
import ItemService from "../services/items.service";
import {useFormik} from "formik";
import {DEFAULT_REQUEST_ERROR} from "../util/Constants";
import {AxiosResponse} from "axios";
import OrdersService from "../services/orders.service";
import {useAuthContext} from "../contexts/AuthenticationContext";

function Home() {

    const {user} = useAuthContext();
    const [alertState, setAlertState] = React.useState({visible: false, text: "", error: false});
    const itemService = React.useMemo(() => new ItemService(user.token), [user]);
    const orderService = React.useMemo(() => new OrdersService(user.token), [user]);
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await itemService.getAll();
                setItems(response.data.map((item_: any) => {
                    return {...item_, active: false}
                }));
            } catch (error) {
                setAlertState({visible: true, text: error.message, error: true});
            }
        }
        fetchItems();
    }, [itemService]);

    const onChangeCard = (idItem: number) => {
        setItems(items.map((item_: any) => {
            if (item_.idItem === idItem) return {...item_, active: !item_.active}
            return item_;
        }));
    };

    const validate = async (values: any) => {
        let errors: any = {};

        if (items.filter((item_: any) => !!item_.active).length === 0)
            errors.notes = 'You have not selected items';

        if (!values.notes) {
            errors.notes = 'Required';
        } else if (values.notes.length > 500) {
            errors.notes = 'Must be 15 characters or less';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            idUser: user.idUser,
            notes: "",
        },
        validate: validate,
        onSubmit: (values, {setSubmitting, setValues, resetForm}) => {
            handleSubmit(values, setValues).then(() => {
                setSubmitting(false);
                resetForm();
            })
        },
    });

    const handleSubmit = async (values: any, setValues: Function) => {
        const dataRequest = {
            idUser: values.idUser,
            notes: values.notes,
            items: items.filter((item_: any) => !!item_.active).map((item_: any) => item_.idItem)
        };
        console.log("data sent new order" + JSON.stringify(dataRequest));
        let errorMessage = DEFAULT_REQUEST_ERROR;
        let send = false;
        try {
            const {data: response}: AxiosResponse = await orderService.create(dataRequest);
            if (response.success === "true") {
                setAlertState({visible: true, text: "The order have been created!", error: false});
                send = true;
                setItems(items.map((item_: any) => {
                    return {...item_, active: false}
                }));
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

    return (
        <SiteWrapper>
            <div className="my-3 my-md-5">
                <Container>
                    {/*<Grid.Row cards={true}>*/}
                    {/*    <Grid.Col sm={6} lg={3}>*/}
                    {/*        <StampCard*/}
                    {/*            color="blue"*/}
                    {/*            icon="dollar-sign"*/}
                    {/*            header={*/}
                    {/*                <a href="#">*/}
                    {/*                    132 <small>Sales</small>*/}
                    {/*                </a>*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*    </Grid.Col>*/}
                    {/*    <Grid.Col sm={6} lg={3}>*/}
                    {/*        <StampCard*/}
                    {/*            color="green"*/}
                    {/*            icon="shopping-cart"*/}
                    {/*            header={*/}
                    {/*                <a href="#">*/}
                    {/*                    78 <small>Orders</small>*/}
                    {/*                </a>*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*    </Grid.Col>*/}
                    {/*    <Grid.Col sm={6} lg={3}>*/}
                    {/*        <StampCard*/}
                    {/*            color="red"*/}
                    {/*            icon="users"*/}
                    {/*            header={*/}
                    {/*                <a href="#">*/}
                    {/*                    1,352 <small>Members</small>*/}
                    {/*                </a>*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*    </Grid.Col>*/}
                    {/*    <Grid.Col sm={6} lg={3}>*/}
                    {/*        <StampCard*/}
                    {/*            color="yellow"*/}
                    {/*            icon="message-square"*/}
                    {/*            header={*/}
                    {/*                <a href="#">*/}
                    {/*                    132 <small>Comments</small>*/}
                    {/*                </a>*/}
                    {/*            }*/}
                    {/*        />*/}
                    {/*    </Grid.Col>*/}
                    {/*</Grid.Row>*/}
                    {alertState.visible ?
                        <Alert isDismissible type={alertState.error ? "danger" : "primary"}>
                            {/*<Header.H4>Some Message</Header.H4>*/}
                            <label>
                                {alertState.text}
                            </label>
                        </Alert> : null
                    }
                    <Grid.Row>
                        <Grid.Col lg={4}>
                            <Card>
                                <Card.Header>
                                    <Card.Title>Select items and leave some note:</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Form onSubmit={formik.handleSubmit}>
                                        <Form.Group>
                                            <Form.Label>Note</Form.Label>
                                            <Form.Textarea
                                                disabled={formik.isSubmitting}
                                                name="notes"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                error={formik.errors?.notes && formik.touched?.notes ? formik.errors.notes : null}
                                                placeholder="Enter a note" rows={5}>
                                                {formik.values.notes}
                                            </Form.Textarea>
                                        </Form.Group>
                                        <Form.Footer>
                                            <Button type="submit" color="primary" block loading={formik.isSubmitting}>
                                                Place order
                                            </Button>
                                        </Form.Footer>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Grid.Col>
                        <Grid.Col lg={8}>
                            <Grid.Row cards deck>
                                {
                                    items.map((item_: any) =>
                                        <Grid.Col sm={6} lg={4}>
                                            <StoreItemCard
                                                title={item_.name}
                                                price={"$ " + item_.price}
                                                active={item_.active}
                                                onChange={() => onChangeCard(item_.idItem)}
                                            />
                                        </Grid.Col>)
                                }
                            </Grid.Row>
                        </Grid.Col>
                    </Grid.Row>
                </Container>
            </div>
        </SiteWrapper>
    );
}

export default Home;
