import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

const Alert = React.forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant="filled"
      {...props}
      icon={false}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Black with transparency
        borderRadius: '10px', // Remove border radius
        padding: '5px 10px', // Add padding for better visibility
      }}
    />
  );
});

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export default function ToastMessage(props) {
  return (
    <Snackbar
      open={props.open}
    //   autoHideDuration={6000}
      onClose={props.onClose}
      TransitionComponent={TransitionDown}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      style={{
        position: props.screenWidth < 767 && 'absolute',
        width: props.screenWidth < 767 && 'max-content',
        bottom: props.screenWidth < 767 && '60px',
        marginLeft: props.screenWidth < 767 && 'auto',
        marginRight: props.screenWidth < 767 && 'auto'
      }}
    >
      <Alert>
        {props.message}
      </Alert>
    </Snackbar>
  );
}