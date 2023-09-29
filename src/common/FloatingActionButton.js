import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom'; // Import the hook

const FabContainer = styled('div')({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  zIndex: '1000',
});

const FloatingActionButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option) => {
    if (option === 'Appointment') {
      // Navigate to the appointment page
      navigate('/create_appointment');
    }
    setAnchorEl(null);
  };

  return (
    <FabContainer>
      <Button
        variant="contained"
        color="primary"
        aria-controls="fab-menu"
        aria-haspopup="true"
        onClick={handleOpenMenu}
        startIcon={<AddIcon />}
      >
        Start New
      </Button>
      <Menu
        id="fab-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={() => handleOptionClick('Appointment')}>
          Appointment
        </MenuItem>
      </Menu>
    </FabContainer>
  );
};

export default FloatingActionButton;
