import { useState, useCallback } from 'react';
import Notification from '../../../src/components/Notification';
import { Grid } from '@mui/material';
import Sidebar from './components/Sidebar';
import Trips from './views/Trips';

const TripsApp = () => {
  // component states
  const [selected, setSelected] = useState('home');

  // function to handle click on icon button
  const handleClick = useCallback(
    name => {
      setSelected(name);
    },
    [selected]
  );

  return (
    <Grid container>
      <Grid item md={0.5} sm={1} xs={2}>
        <Sidebar selected={selected} handleClick={handleClick} />
      </Grid>
      <Grid item md={11.5} sm={11} xs={10}>
        <Notification />
        <Trips />
      </Grid>
    </Grid>
  );
};

export default TripsApp;
