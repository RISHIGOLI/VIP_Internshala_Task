import React, { useState, useEffect } from "react"
import { makeStyles, Grid, Box, Dialog, Divider, TextField, IconButton, Button, CircularProgress } from '@material-ui/core'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CloseIcon from '@mui/icons-material/Close'
import { addTradeDetail, updateTradeDetails } from "../Services/TradeListPageAPIs"

const useStyles = makeStyles((theme) => ({
    dialog: {
        width: '100vw',
        height: '100vh',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiDialog-paperWidthSm': {
            /* Add your custom styles for paperWidthSm here */
            maxWidth: '100vw', // Example custom style
            maxHeight: '100vh'
        },
    },
    buyButton: {
        border: '1px solid green',
        '&:hover': {
            backgroundColor: 'green',
            color: 'white'
        }
    },
    sellButton: {
        border: '1px solid red',
        '&:hover': {
            backgroundColor: 'red',
            color: 'white'
        }
    },
    button: {
        border: '1px solid rgb(127, 12, 134)',
        '&:hover': {
            backgroundColor: 'rgb(127, 12, 134)',
            color: 'white'
        }
    }
}))

export default function TradeForm(props) {
    const classes = useStyles()
    const formType = props.formType
    const trade = props.trade
    const [showLoader, setShowLoader] = useState(false)
    const [isTradeDetailsSuccessfullyAdded, setIsTradeDetailsSuccessfullyAdded] = useState(false)
    const [errorInAddingTradeDetails, setErrorInAddingTradeDetails] = useState(false)
    const [body, setBody] = useState({
        stockName: '',
        listingPrice: '',
        quantity: '',
        type: '',
        pricePerUnit: ''
    })
    useEffect(() => {
        console.log('body', body)
        if (formType === 'Edit') {
            setBody({
                ...body,
                id: trade.id,
                stockName: trade.stockName,
                listingPrice: trade.listingPrice,
                quantity: trade.quantity,
                type: trade.type,
                pricePerUnit: trade.pricePerUnit
            })
        }
    }, [])
    function handleInputChange(e) {
        setBody({ ...body, [e.target.name]: e.target.value })
    }

    function resetForm() {
        if (formType === 'Edit') {
            setBody({
                ...body,
                id: trade.id,
                stockName: trade.stockName,
                listingPrice: trade.listingPrice,
                quantity: trade.quantity,
                type: trade.type,
                pricePerUnit: trade.pricePerUnit
            })
        }else{
            setBody({
                ...body,
                stockName: '',
                listingPrice: '',
                quantity: '',
                type: '',
                pricePerUnit: ''
            })
        }
    }

    function submitForm() {
        setShowLoader(true)
        console.log('body', body)
        addTradeDetail(body)
            .then((response) => {
                if (response.statusCode === 201) {
                    // setShowLoader(false)
                    setIsTradeDetailsSuccessfullyAdded(true)
                } else {
                    setErrorInAddingTradeDetails(true)
                }
                console.log(response)
                resetForm()
            })
            .catch((error) => {
                setErrorInAddingTradeDetails(true)
                console.log(error)
            })
    }

    function handleClose() {
        setShowLoader(false)
        props.onClose()
    }

    function updateForm() {
        setShowLoader(true)
        console.log('body', body)
        updateTradeDetails(body)
            .then((response) => {
                if (response.statusCode === 201) {
                    // setShowLoader(false)
                    setIsTradeDetailsSuccessfullyAdded(true)
                } else {
                    setErrorInAddingTradeDetails(true)
                }
                console.log(response)
                resetForm()
            })
            .catch((error) => {
                setErrorInAddingTradeDetails(true)
                console.log(error)
            })
    }

    return (
        <>
            <Dialog
                open={props.open}
                // onClose={props.onClose}
                className={classes.dialog}
            >
                <Grid style={{ height: '75vh', width: '40vw', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    {
                        !showLoader ?
                            <>
                                <Grid style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', padding: '10px', height: '5%', justifyContent: 'space-between' }}>
                                    <Box>{formType === 'Add' ? 'Add' : 'Edit'} Trade Form</Box>
                                    <CloseIcon style={{ fontSize: '30px', margin: '5px', cursor: 'pointer', marginRight: '0px' }} onClick={() => handleClose()} />
                                </Grid>
                                {/* form elements container */}
                                <Grid style={{ height: '95%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                    {/* stock name */}
                                    <Box style={{ margin: '10px' }}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Stock Name"
                                            name="stockName"
                                            value={body.stockName}
                                            className={classes.textField}
                                            onChange={handleInputChange}
                                        // error={errorBody.eventTitleError}
                                        />
                                    </Box>

                                    {/* listing price */}
                                    <Box style={{ margin: '10px' }}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Listing Price"
                                            name="listingPrice"
                                            value={body.listingPrice}
                                            className={classes.textField}
                                            onChange={handleInputChange}
                                        // error={errorBody.eventTitleError}
                                        />
                                    </Box>

                                    {/* Quantity */}
                                    <Box style={{ margin: '10px' }}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Quantity"
                                            name="quantity"
                                            value={body.quantity}
                                            className={classes.textField}
                                            onChange={handleInputChange}
                                        // error={errorBody.eventTitleError}
                                        />
                                    </Box>

                                    {/* buy or sell buttons */}
                                    <Grid style={{ margin: '10px', display: 'flex', justifyContent: 'space-around' }}>
                                        <Button onClick={() => setBody({ ...body, type: 'BUY' })} className={classes.buyButton} style={{ color: body.type === 'BUY' && 'white', backgroundColor: body.type === 'BUY' && 'green' }}>Buy</Button>
                                        <Button onClick={() => setBody({ ...body, type: 'SELL' })} className={classes.sellButton} style={{ color: body.type === 'SELL' && 'white', backgroundColor: body.type === 'SELL' && 'red' }}>Sell</Button>
                                    </Grid>

                                    {/* price per unit */}
                                    <Box style={{ margin: '10px' }}>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Price Per Unit"
                                            name="pricePerUnit"
                                            value={body.pricePerUnit}
                                            className={classes.textField}
                                            onChange={handleInputChange}
                                        // error={errorBody.eventTitleError}
                                        />
                                    </Box>

                                    {/* submit or cancel button */}
                                    <Grid style={{ margin: '10px', display: 'flex', justifyContent: 'space-around' }}>
                                        {
                                            formType === 'Add' ?
                                            <Button className={classes.button} onClick={() => submitForm()}>Submit</Button> :
                                            <Button className={classes.button} onClick={() => updateForm()}>Update</Button>
                                        }                                        
                                        <Button className={classes.button} onClick={() => resetForm()}>Reset</Button>
                                        <Button className={classes.button} onClick={() => props.onClose()}>Cancel</Button>
                                    </Grid>
                                </Grid>
                            </> :
                            <>
                                {
                                    isTradeDetailsSuccessfullyAdded ?
                                        <>
                                            <Grid style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <Grid style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}><CloseIcon style={{ fontSize: '30px', margin: '10px', cursor: 'pointer' }} onClick={() => handleClose()} /></Grid>
                                                <Grid style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '-50px' }}>
                                                    <Grid><TaskAltIcon style={{ color: 'rgb(127, 12, 134)', height: '100px', width: '100px', marginBottom: '5px' }} /></Grid>
                                                    {
                                                        formType === 'Edit' ?
                                                        <Box>Trade Details Successfully Updated...</Box> :
                                                        <Box>Trade Details Successfully Added...</Box>
                                                    }
                                                </Grid>
                                                <Grid style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                                    <Button className={classes.button} style={{ margin: '10px' }} onClick={() => setShowLoader(false)}>Add More</Button>
                                                    <Button className={classes.button} style={{ margin: '10px' }} onClick={() => handleClose()}>Close</Button>
                                                </Grid>
                                            </Grid>
                                        </> :
                                        <>
                                            {
                                                errorInAddingTradeDetails ?
                                                    <>
                                                        <Grid style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                            <Grid style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}><CloseIcon style={{ fontSize: '30px', margin: '10px', cursor: 'pointer' }} onClick={() => handleClose()} /></Grid>
                                                            <Grid style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '-50px' }}>
                                                                <ErrorOutlineIcon style={{ color: 'red', height: '100px', width: '100px', marginBottom: '5px' }} />
                                                                {
                                                                    formType === 'Edit' ?
                                                                    <Box>Trade Details Couldn't be Updated !</Box> :
                                                                    <Box>Trade Details Couldn't be Added !</Box>
                                                                }
                                                            </Grid>
                                                            <Grid style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                                                <Button className={classes.button} style={{ margin: '10px' }} onClick={() => setShowLoader(false)}>Retry</Button>
                                                                <Button className={classes.button} style={{ margin: '10px' }} onClick={() => handleClose()}>Close</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </> :
                                                    <>
                                                        <Grid style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                                            <CircularProgress style={{ color: 'rgb(127, 12, 134)', height: '80px', width: '80px', marginBottom: '10px' }} />
                                                            {
                                                                formType === 'Edit' ?
                                                                <Box>Updating Trade Details...</Box> :
                                                                <Box>Adding Trade Details...</Box>
                                                            }
                                                        </Grid>
                                                    </>
                                            }
                                        </>
                                }
                            </>
                    }
                </Grid>
            </Dialog>
        </>
    )
}