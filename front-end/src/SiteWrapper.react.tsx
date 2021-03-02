// @flow

import * as React from "react";
import {NavLink, withRouter} from "react-router-dom";

import {
    Site,
    Nav,
    Grid,
    List,
    Button,
    RouterContextProvider,
} from "tabler-react";
import {useAuthContext} from "./contexts/AuthenticationContext";

type subNavItem = {
    value: string,
    to?: string,
    icon?: string,
    LinkComponent?: any,
    useExact?: boolean,
};

type navItem = {
    value: string,
    to?: string,
    icon?: string,
    active?: boolean,
    LinkComponent?: any,
    subItems?: Array<subNavItem>,
    useExact?: boolean,
};

const SiteWrapper = (props: any) => {

    const {user, logout} = useAuthContext();

    const accountDropdownProps = {
        avatarURL: "./demo/faces/default_avatar.png",
        name: user.name,
        description: user.role === 1 ? "Administrator" : "Client",
        options: [
            {icon: "help-circle", value: "Need help?"},
            {icon: "log-out", value: "Sign out", onClick: () => logout()},
        ],
    };

    const navBarItems: Array<navItem> = [
        {
            value: "Buy",
            to: "/",
            icon: "home",
            LinkComponent: withRouter(NavLink),
            useExact: true,
        },
        {
            value: "Items",
            icon: "box",
            to: "/items"
        },
        {
            value: "Orders",
            icon: "calendar",
            to: "/orders"
        },
    ];

    return (
        <Site.Wrapper
            headerProps={{
                href: "/",
                alt: "My Walmart App",
                imageURL: "./demo/brand/walmart.png",
                navItems: (
                    <Nav.Item type="div" className="d-none d-md-flex">
                        <Button
                            href="./register"
                            target="_blank"
                            outline
                            size="sm"
                            RootComponent="a"
                            color="primary"
                        >
                            Register
                        </Button>
                    </Nav.Item>
                ),
                notificationsTray: null,
                accountDropdown: accountDropdownProps,
            }}
            navProps={{itemsObjects: navBarItems.filter((item_) => (item_.value !== "Items" || (item_.value === "Items" && user.role === 1)))}}
            routerContextComponentType={withRouter(RouterContextProvider)}
            footerProps={{
                copyright: (
                    <React.Fragment>
                        Copyright © 2021
                        <a href="."> Tabler-react</a>. Theme by
                        <a
                            href="https://codecalm.net"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {" "}
                            codecalm.net
                        </a>{" "}
                        All rights reserved.
                    </React.Fragment>
                ),
                nav: (
                    <React.Fragment>
                        <Grid.Col auto={true}>
                            <List className="list-inline list-inline-dots mb-0">
                                <List.Item className="list-inline-item">
                                    <a href="#">Documentation</a>
                                </List.Item>
                                <List.Item className="list-inline-item">
                                    <a href="#">FAQ</a>
                                </List.Item>
                            </List>
                        </Grid.Col>
                    </React.Fragment>
                ),
            }}
        >
            {props.children}
        </Site.Wrapper>
    );
}

export default SiteWrapper;
