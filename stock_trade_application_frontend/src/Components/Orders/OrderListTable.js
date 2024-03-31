import React from "react"
import {makeStyles,Grid,Box,Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    recordColumn: {
        display: 'flex',
        justifyContent: 'center',
        overflowWrap: 'anywhere',
        borderRight: '1px solid lightgrey',
        "&::-webkit-scrollbar": {
            width: "4px",
        },
        "&::-webkit-scrollbar-track": {
            background: "lightgray",
        },
        "&::-webkit-scrollbar-thumb": {
            background: "darkgray",
            borderRadius: "2px",
            "&:hover": {
                background: "rgb(127, 12, 134)",
            },
        },
        '& .MuiTabs-indicator': { backgroundColor: 'rgb(127, 12, 134)' },
    },
}))

export default function OrderListTable(props) {
    const classes = useStyles()
    const orders = props?.orders
    const pageNumber = props.pageNumber
    const pageSize = props.pageSize

    return (
        <>
            <Grid style={{ display: 'flex', flexDirection: 'column', border: '1px solid rgb(127, 12, 134)',minWidth: '767px', overflowX: 'auto' }} >
                {
                    orders?.map((order, index) => (
                        <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0px', borderBottom: '1px solid lightgrey', overflow: 'hidden' }} key={index}>
                            <Box style={{ width: '7%' }} className={classes.recordColumn}>{pageNumber*pageSize + index +1}</Box>
                            <Box style={{ width: '10%' }} className={classes.recordColumn}>{order.id}</Box>
                            <Box style={{ width: '20%' }} className={classes.recordColumn}>{new Date(order.orderDateTime).toLocaleString()}</Box>
                            <Box style={{ width: '20%', overflowY: 'auto', cursor: 'pointer' }} className={classes.recordColumn} >{order.tradeDetail.stockName}</Box>
                            <Box style={{ width: '10%' }} className={classes.recordColumn}>{order.tradeDetail.quantity}</Box>
                            <Box style={{ width: '10%', overflowY: 'auto', cursor: 'pointer' }} className={classes.recordColumn}><Button disabled style={{color: 'white', backgroundColor: order.tradeDetail.type === 'BUY' ? 'green' : 'red'}}>{order.tradeDetail.type}</Button></Box>
                            <Box style={{ width: '10%' }} className={classes.recordColumn}>{order.tradeDetail.pricePerUnit}</Box>
                            <Box style={{ width: '13%', color: 'green', fontWeight: 'bold' }} className={classes.recordColumn}>{order.status}</Box>
                        </Grid>
                    ))
                }
            </Grid>
        </>
    )
}