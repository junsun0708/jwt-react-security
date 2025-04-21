import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import './AlertDialog.css'
import Alert from '@mui/material/Alert';
import { fontSize } from '@mui/system';

export default function PositionedSnackbar(props) {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const buttons = (
    <React.Fragment>
      <Button className='button'
      style={{color: 'white', fontSize: '14pt'}}
        onClick={handleClick({
          vertical: 'bottom',
          horizontal: 'center',
        })}        
      >
        {props.title}
      </Button>
      
    </React.Fragment>
  );

  return (
    <div className='alertDialog'>
      {buttons}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        autoHideDuration={1500}
        key={vertical + horizontal}
      >
        <Alert severity='warning' sx={{width: "100%"}}>개발중입니다</Alert>
      </Snackbar>
    </div>
  );
}










