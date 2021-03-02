import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import List from '@material-ui/core/List';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import {Button, Grid, Icon} from "tabler-react";
import {FormatIndentDecrease, RadioButtonCheckedOutlined, StarRate} from "@material-ui/icons";
import CheckIcon from '@material-ui/icons/Check';
import StarIcon from '@material-ui/icons/Star';

function descendingComparator(a: { [x: string]: number; }, b: { [x: string]: number; }, orderBy: string | number) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order: string, orderBy: string | number) {
    return order === 'desc'
        ? (a: { [x: string]: number; }, b: { [x: string]: number; }) => descendingComparator(a, b, orderBy)
        : (a: { [x: string]: number; }, b: { [x: string]: number; }) => -descendingComparator(a, b, orderBy);
}

function stableSort(array: any[], comparator: { (a: any, b: any): number; (arg0: any, arg1: any): any; }) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {label: 'No.', id: 'idOrder', numeric: true, disablePadding: true,},
    {label: 'Notes', id: 'notes', numeric: false,},
    {label: 'Feedback', id: 'feedback', numeric: false},
    {label: 'User', id: 'user', numeric: false,},
    {label: 'Items', id: 'items', numeric: false,},
    {label: 'Rate', id: 'rate', numeric: false,},
]

function EnhancedTableHead(props: any) {
    const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
    const createSortHandler = (property: string) => (event: any) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        className="m-1 p-0"
                        key={headCell.id}
                        align={headCell.numeric ? 'left' : 'center'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell size="medium" align="center"/>
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        paddingRight: 15, paddingLeft: 15, paddingTop: 30, marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function EnhancedTable({data, prepareEdit, handleDelete}: any) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('idOrder');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event: any, property: any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (event: any, name: any) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: any[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const isSelected = (name: any) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    function getStars(times: number) {
        var array = [];
        for (var i = 0; i < times; i++) {
            array.push(i);
        }
        return array.map(() => <ListItem className="m-0 p-0" button>
            <ListItemIcon>
                <StarIcon/>
            </ListItemIcon>
        </ListItem>);
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                            onSelectAllClick={() => {
                            }}/>
                        <TableBody>
                            {stableSort(data, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: any, index: any) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            // onClick={(event: any) => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.idOrder}
                                            selected={isItemSelected}
                                        >
                                            <TableCell className="m-0 p-0" component="th" id={labelId} scope="row"
                                                       padding="none">
                                                {row.idOrder}
                                            </TableCell>
                                            <TableCell className="m-0 p-0" align="left">{row.notes}</TableCell>
                                            <TableCell className="m-0 p-0" align="left">
                                                {row.feedback}
                                            </TableCell>
                                            <TableCell className="m-0 p-0" align="left">{row.user.name}</TableCell>
                                            <TableCell className="m-0 p-2" align="left">
                                                {
                                                    <List component="nav" className="m-0 p-0" aria-label="items">
                                                        {
                                                            row.items.map((item_: any) =>
                                                                <ListItem className="m-0 p-0">
                                                                    <ListItemIcon>
                                                                        <CheckIcon/>
                                                                    </ListItemIcon>
                                                                    <ListItemText primary={item_.name}/>
                                                                </ListItem>)
                                                        }

                                                    </List>
                                                }
                                            </TableCell>
                                            <TableCell className="m-0 p-0" align="left">
                                                <div className="d-flex flex-row w-5">
                                                    {getStars(row.rate)}
                                                </div>
                                            </TableCell>
                                            <TableCell size="small" align="right">
                                                <div className="d-flex flex-row w-5 m-0 p-0">
                                                    <Button onClick={() => prepareEdit(row)} color="primary">
                                                        <Icon name="edit"/>
                                                    </Button>
                                                    <Button className=" ml-2 "
                                                            onClick={() => handleDelete(row.idOrder)
                                                            } color="secondary">
                                                        <Icon name="trash"/>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 53 * emptyRows}}>
                                    <TableCell colSpan={7}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

{/*<Card className="pt-5">'80*/}
{/*    <Table*/}
{/*        responsive*/}
{/*        className="card-table table-vcenter text-nowrap"*/}
{/*        headerItems={[*/}
{/*            {content: "No.", className: "w-1"},*/}
{/*            {content: "Notes"},*/}
{/*            {content: "Feedback"},*/}
{/*            {content: "User"},*/}
{/*            {content: "Items"},*/}
{/*            {content: "Rate"},*/}
{/*            {content: null},*/}
{/*        ]}*/}
{/*        bodyItems={*/}
{/*            orders.map((order: fieldTypes) => {*/}
{/*                    return {*/}
{/*                        key: order.idOrder,*/}
{/*                        item: [*/}
{/*                            {*/}
{/*                                content: (*/}
{/*                                    <Text RootComponent="span" muted>*/}
{/*                                        {order.idOrder}*/}
{/*                                    </Text>*/}
{/*                                ),*/}
{/*                            },*/}
{/*                            {content: order.notes},*/}
{/*                            {content: order.feedback},*/}
{/*                            {content: order.user.name},*/}
{/*                            {*/}
{/*                                content: (*/}
{/*                                    <List>*/}
{/*                                        {order.items.map((item_: any) =>*/}
{/*                                            <List.Item>{item_.name}</List.Item>)}*/}
{/*                                    </List>*/}
{/*                                )*/}
{/*                            },*/}
{/*                            {content: order.rate},*/}
{/*                            {*/}
{/*                                alignContent: "right",*/}
{/*                                content: (*/}
{/*                                    <React.Fragment>*/}
{/*                                        <Button onClick={() => prepareEdit(order)} color="primary">*/}
{/*                                            <Icon name="edit"/>*/}
{/*                                        </Button>*/}
{/*                                        <Button onClick={() => handleDelete(order.idOrder)} className="ml-5"*/}
{/*                                                color="secondary">*/}
{/*                                            <Icon name="trash"/>*/}
{/*                                        </Button>*/}
{/*                                    </React.Fragment>*/}
{/*                                ),*/}
{/*                            }*/}
{/*                        ],*/}
{/*                    }*/}
{/*                },*/}
{/*            )*/}
{/*        }*/}
{/*    />*/}
{/*</Card>*/}