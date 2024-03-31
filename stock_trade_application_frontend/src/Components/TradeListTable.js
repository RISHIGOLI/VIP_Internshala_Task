import React,{useState} from "react"
import { makeStyles, Grid,Box,Button } from '@material-ui/core'
import { createOrder } from "../Services/OrderMasterPageAPIs"
import TradeForm from "./TradeForm"
import ToastMessage from "./ToastMessage"
import { deleteTradeDetails } from "../Services/TradeListPageAPIs"

const useStyles = makeStyles((theme)=>({
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
    editButton: {
        border: '1px solid rgb(127, 12, 134)',
        color: 'rgb(127, 12, 134)',
        '&:hover': {
            backgroundColor: 'rgb(127, 12, 134)',
            color: 'white'
        }
    },
    deleteButton: {
        border: '1px solid red',
        color: 'red',
        '&:hover': {
            backgroundColor: 'red',
            color: 'white'
        }
    },
    createOrderButton: {
        border: '1px solid blue',
        color: 'blue',
        '&:hover': {
            backgroundColor: 'blue',
            color: 'white'
        }
    },
}))

export default function TradeListTable(props){
    const classes = useStyles()
    const tradeDetails = props?.tradeDetails
    const [openTradeForm, setOpenTradeForm] = useState(false)
    const [tradeToUpdate, setTradeToUpdate] = useState(null)
    const [openToastMessage, setOpenToastMessage] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const pageNumber = props.pageNumber
    const pageSize = props.pageSize

    function handleCreateOrder(trade){
        setToastMessage('creating order...')
        setOpenToastMessage(true)
        const body = {
            pricePerUnit:trade.pricePerUnit,
            quantity:trade.quantity,
            type:trade.type
        }

        createOrder(trade.id,body)
            .then((response)=>{
                console.log(response)
                setToastMessage(response.message)
                setTimeout(()=>setOpenToastMessage(false),3000)
            })
            .catch((error)=>{
                console.log(error)
                setToastMessage(error.message)
                setTimeout(()=>setOpenToastMessage(false),3000)
            })
    }

    function openEditForm(trade){
        setTradeToUpdate(trade)
        setOpenTradeForm(true)
    }

    function deleteTradeDetail(tradeId){
        setToastMessage('Deleting trade details...')
        setOpenToastMessage(true)
        deleteTradeDetails(tradeId)
            .then((response)=>{
                console.log(response)
                setToastMessage(response.message)
                setTimeout(()=>setOpenToastMessage(false),3000)
                props.updatePage()
            })
            .catch((error)=>{
                console.log(error)
                setToastMessage(error.message)
                setTimeout(()=>setOpenToastMessage(false),3000)
            })
    }

    return(
        <>
            <Grid style={{ display: 'flex', flexDirection: 'column', border: '1px solid rgb(127, 12, 134)',minWidth: '767px', overflowX: 'auto'}} >
                {
                    tradeDetails?.map((trade, index) => (
                        <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0px', borderBottom: '1px solid lightgrey', overflow: 'hidden' }} key={index}>
                            <Box style={{ width: '5%' }} className={classes.recordColumn}>{pageNumber*pageSize + index +1}</Box>
                            <Box style={{ width: '15%' }} className={classes.recordColumn}>{new Date(trade.tradeDateTime).toLocaleString()}</Box>
                            <Box style={{ width: '15%' }} className={classes.recordColumn}>{trade.stockName}</Box>
                            <Box style={{ width: '10%', overflowY: 'auto', cursor: 'pointer' }} className={classes.recordColumn} >{trade.listingPrice}</Box>
                            <Box style={{ width: '10%' }} className={classes.recordColumn}>{trade.quantity}</Box>
                            <Box style={{ width: '10%'}} className={classes.recordColumn} ><Button disabled style={{color: 'white', backgroundColor: trade.type === 'BUY' ? 'green' : 'red'}}>{trade.type}</Button></Box>
                            <Box style={{ width: '10%' }} className={classes.recordColumn}>{trade.pricePerUnit}</Box>
                            <Box style={{width: '25%', display: 'flex', justifyContent: 'space-around'}} className={classes.recordColumn}>
                                <Button className={classes.editButton} onClick={()=>openEditForm(trade)}>Edit</Button>
                                <Button className={classes.deleteButton} onClick={()=>deleteTradeDetail(trade.id)}>Delete</Button>
                                <Button className={classes.createOrderButton} onClick={()=>handleCreateOrder(trade)}>Create Order</Button>
                            </Box>
                        </Grid>
                    ))
                }
            </Grid>
            {
                openTradeForm &&
                <TradeForm open={openTradeForm} onClose={()=>setOpenTradeForm(false)} formType={'Edit'} trade={tradeToUpdate}/>
            }
            {
                openToastMessage &&
                <ToastMessage open={openToastMessage} onClose={()=>setOpenToastMessage(false)} message={toastMessage}/>
            }
        </>
    )
}