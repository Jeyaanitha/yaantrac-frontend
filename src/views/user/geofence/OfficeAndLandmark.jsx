import { Box, Card, Typography } from '@mui/material';
import React, { useState } from 'react';
import GoogleMapComponent from '../../components/maps/GoogleMapComponent';
import GoogleMapMarker from '../../components/maps/GoogleMapMarker';
import { createUseStyles } from 'react-jss';
import CustomSquareButton from '../../components/buttons/CustomSquareButton';
import CustomIconButton from '../../components/buttons/CustomIconButton';
import MyOffice from './components/MyOffice';
import UserLandmark from './components/UserLandmark';

const useStyles = createUseStyles({
  root: {
    position: 'relative'
  },
  map: {
    height: `calc(100vh - 65px)`,
    width: '100%'
  },
  filterBar: {
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    right: 0,
    margin: 8
  },
  filter: {
    position: 'absolute',
    zIndex: 1000,
    left: 5,
    bottom: 5,
    width: '30%',
    minWidth: '200px',
    minHeight: '280px',
    height: 'fit-content',
    marginTop: '100px'
  },
  '& .css-78trlr-MuiButtonBase-root-MuiIconButton-root:hover': {
    backgroundColor: 'none !important'
  },
  filterHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00769E',
    color: '#FFF',
    width: '100%'
  },
  icon: {
    color: '#00769E',
    padding: '10px',
    display: 'inline-block',
    border: '1px solid #ddd',
    borderRadius: '5px',
    margin: '5px',
    cursor: 'pointer',
    transition: 'all .2s ease'
  },
  bgIcon: {
    color: '#fff',
    backgroundColor: '#00769E',
    padding: '10px',
    display: 'inline-block',
    border: '1px solid #00769E',
    margin: '5px',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'all .2s ease'
  }
});

const OfficeAndLandmark = () => {
  // component styles
  const styles = useStyles();

  // component state
  const [selected, setSelected] = useState('myoffice');
  const [isOpenMyofficeAndUserLandmark, setIsOpenMyofficeAndUserlandmark] =
    useState(false);

  // funtion to change the user action
  const changeUserAction = action => setSelected(action);

  return (
    <Box className={styles.root}>
      <Box className={styles.map}>
        <GoogleMapComponent>
          <GoogleMapMarker />
        </GoogleMapComponent>
      </Box>

      <Box className={styles.filterBar}>
        <CustomSquareButton
          category='Myoffice Landmark'
          selected={isOpenMyofficeAndUserLandmark}
          onClick={() => {
            setIsOpenMyofficeAndUserlandmark('myofficelandmark');
          }}
        />
      </Box>

      {isOpenMyofficeAndUserLandmark === 'myofficelandmark' && (
        <Card className={styles.filter}>
          <Box className={styles.filterHeader} px={2}>
            <Typography component='h6' variant='p'>
              {`Office and Landmark`}
            </Typography>
            <CustomIconButton
              category='White Close'
              onClick={() => {
                setIsOpenMyofficeAndUserlandmark(null);
              }}
            />
          </Box>

          {/* user action below */}
          <Box>
            <CustomSquareButton
              selected={selected}
              category='My Office'
              onClick={() => {
                changeUserAction('myoffice');
              }}
            />
            <CustomSquareButton
              selected={selected}
              category='User Landmark'
              onClick={() => {
                changeUserAction('userlandmark');
              }}
            />
          </Box>

          {selected === 'myoffice' ? (
            <MyOffice changeUserAction={changeUserAction} />
          ) : selected === 'userlandmark' ? (
            <UserLandmark changeUserAction={changeUserAction} />
          ) : null}
        </Card>
      )}
    </Box>
  );
};

export default OfficeAndLandmark;
