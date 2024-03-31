import React, { useState, useEffect } from "react"
import { makeStyles, Grid, Box } from '@material-ui/core'
import TradeListTable from "../Components/TradeListTable"
import OrderListTable from "../Components/Orders/OrderListTable"
import { getAllOrders } from "../Services/OrderMasterPageAPIs"
import Pagination from '@mui/material/Pagination'

const useStyles = makeStyles((theme) => ({
    column: {
        display: 'flex',
        justifyContent: 'center',
        borderRight: '1px solid lightgrey'
    },
}))

export default function OrderListPage() {
    const classes = useStyles()
    const [orders, setOrders] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [pageSize, setPageSize] = useState(7)

    useEffect(() => {
        fetchAllOrders(pageNumber,pageSize)
    }, [])

    function fetchAllOrders(pageNumber,pageSize) {
        getAllOrders(pageNumber,pageSize)
            .then((response) => {
                console.log(response)
                setOrders(response.data)
                setTotalPages(response.totalPages)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function handlePageChange(e,newPage){
        
        console.log(newPage)
        if(newPage-1 <= totalPages && newPage-1 >= 0){
            fetchAllOrders(newPage-1,pageSize)
            // if(newPage-1 > pageNumber){
                setPageNumber(newPage-1)
            // }else{
            //     setPageNumber((pageNumber)=>pageNumber-1)
            // }            
        }
    }

    return (
        <>
            <Grid style={{ display: 'flex', flexDirection: 'column', padding: '25px', height: 'calc(100vh - 50px)', width: 'calc(100vw - 50px)', justifyContent: 'space-between' }}>
                <Grid>
                    <Grid style={{ width: '100%', height: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box style={{fontSize: '25px', fontWeight: 'bold'}}>Order List</Box>
                    </Grid>
                    {/* table container */}
                    <Grid style={{ width: '100%', minWidth: '767px', overflowX: 'auto' }}>
                        <Grid style={{ backgroundColor: 'rgb(127, 12, 134)', display: 'flex', alignItems: 'center', padding: '15px 0px', color: 'white', borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                            <Box style={{ width: '7%' }} className={classes.column}>Sr No</Box>
                            <Box style={{ width: '10%' }} className={classes.column}>Order ID</Box>
                            <Box style={{ width: '20%' }} className={classes.column}>Order Date/Time</Box>
                            <Box style={{ width: '20%' }} className={classes.column}>Stock Name</Box>
                            <Box style={{ width: '10%' }} className={classes.column}>Quantity</Box>
                            <Box style={{ width: '10%' }} className={classes.column}>Type (Buy/Sell)</Box>
                            <Box style={{ width: '10%' }} className={classes.column}>Price Per Unit(Rs.)</Box>
                            <Box style={{ width: '13%', border: 'none' }} className={classes.column}>Status</Box>
                        </Grid>
                    </Grid>
                    <OrderListTable orders={orders} pageNumber={pageNumber} pageSize={pageSize}/>
                </Grid>
                <Grid style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', bottom: '25px' }}>
                    {
                        totalPages > 1 &&
                        <Pagination count={totalPages} color="secondary" onChange={handlePageChange} />
                    }
                </Grid>
            </Grid>
        </>
    )
}