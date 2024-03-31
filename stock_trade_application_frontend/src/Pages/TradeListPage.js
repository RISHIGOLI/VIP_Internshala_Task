import React, { useState, useEffect } from 'react';
import { Grid, Button, Box, makeStyles } from '@material-ui/core'
import TradeListTable from '../Components/TradeListTable';
import TradeForm from '../Components/TradeForm';
import { getAllTradeDetails } from '../Services/TradeListPageAPIs';
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const useStyles = makeStyles((theme) => ({
    column: {
        display: 'flex',
        justifyContent: 'center',
        borderRight: '1px solid lightgrey'
    },
}))

function TradeListPage() {
    const classes = useStyles()
    const [crashReports, setCrashReports] = useState(Array.of(1).fill(40))
    const [openTradeForm, setOpenTradeForm] = useState(false)
    const [tradeDetails, setTradeDetails] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [pageSize, setPageSize] = useState(7)
    const [updatePage, setUpdatePage] = useState(false)

    useEffect(() => {
        fetchAllTradeDetails(pageNumber,pageSize)
    }, [openTradeForm,updatePage])

    function fetchAllTradeDetails(pageNumber,pageSize) {
        getAllTradeDetails(pageNumber,pageSize)
            .then((response) => {
                console.log(response)
                setTradeDetails(response.data)
                setTotalPages(response.totalPages)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function handlePageChange(e,newPage){
        
        console.log(newPage)
        if(newPage-1 <= totalPages && newPage-1 >= 0){
            fetchAllTradeDetails(newPage-1,pageSize)
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
                        <Box style={{fontSize: '25px', fontWeight: 'bold'}}>Trade Lists</Box>
                        <Box><Button style={{ backgroundColor: 'rgb(127, 12, 134)', color: 'white' }} onClick={() => setOpenTradeForm(true)}>+ Add Trade</Button></Box>
                    </Grid>
                    {/* table container */}
                    <Grid style={{ width: '100%',minWidth: '767px', overflowX: 'auto' }}>
                        <Grid style={{ backgroundColor: 'rgb(127, 12, 134)', display: 'flex', alignItems: 'center', padding: '15px 0px', color: 'white', borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                            <Box style={{ width: '5%' }} className={classes.column}>Sr No</Box>
                            <Box style={{ width: '15%' }} className={classes.column}>Trade Date/Time</Box>
                            <Box style={{ width: '15%' }} className={classes.column}>Stock Name</Box>
                            <Box style={{ width: '10%' }} className={classes.column}>Listing Price(Rs.)</Box>
                            <Box style={{ width: '10%' }} className={classes.column}>Quantity</Box>
                            <Box style={{ width: '10%' }} className={classes.column}>Type (Buy/Sell)</Box>
                            <Box style={{ width: '10%' }} className={classes.column}>Price Per Unit(Rs.)</Box>
                            <Box style={{ width: '25%', border: 'none' }} className={classes.column}>Action</Box>
                        </Grid>
                    </Grid>
                    <TradeListTable tradeDetails={tradeDetails} pageNumber={pageNumber} pageSize={pageSize} updatePage={()=>setUpdatePage(!updatePage)}/>
                </Grid>
                <Grid style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', bottom: '25px' }}>
                    {
                        totalPages > 1 &&
                        <Pagination count={totalPages} color="secondary" onChange={handlePageChange}/>
                    }
                </Grid>
                {
                    openTradeForm &&
                    <TradeForm open={openTradeForm} onClose={() => setOpenTradeForm(false)} formType={'Add'} trade={''} />
                }
            </Grid>
        </>
    );
}

export default TradeListPage;
