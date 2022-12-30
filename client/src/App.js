import logo from './logo.svg';
import {useState} from "react";
import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';
import ListProfiles from './ListProfiles';
import CreateNewUser from './CreateNewUser';

function App() {
  const [open, setOpen] =useState(false);
  
  const handleOpen=()=>{
    setOpen(true);
  }
  return (
    <div className="App">
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Open Sponsorship
          </Typography>
          <Button color="inherit" onClick ={handleOpen}>Create New User</Button>
        </Toolbar>
      </AppBar>
    </Box>

   
    { 
    open? <CreateNewUser open={open} setOpen={setOpen}></CreateNewUser>:
    <Paper>
      <ListProfiles/>
    </Paper>
      
    }
    </div>
  );
}

export default App;
