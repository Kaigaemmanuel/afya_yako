import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/system';

// Create a styled component for the FAB container
const FabContainer = styled('div')({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  zIndex: '1000',
});


const FloatingActionButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option) => {
    // Handle the option click logic here
    alert(`${option} clicked!`);
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
          vertical: 'bottom', // Position the Menu below the button
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top', // Position the Menu above the button
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={() => handleOptionClick('Appointment')}>
          Appointment
        </MenuItem>
        {/* Add more options here */}
      </Menu>
    </FabContainer>
  );
};

export default FloatingActionButton;
