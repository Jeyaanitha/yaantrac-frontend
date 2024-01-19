import React from 'react';
import { Avatar, IconButton, Tooltip, Zoom } from '@mui/material';
import {
  Business,
  Explore,
  FilterAlt,
  Flag,
  ForkRight,
  PushPin,
  Speed,
  Summarize
} from '@mui/icons-material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

const CustomSquareButton = ({ category, selected, ...rest }) => (
  <Tooltip
    placement='left'
    arrow
    TransitionComponent={Zoom}
    title={
      category === 'Track Vehicle'
        ? 'Track Vehicle'
        : category === 'Search Filter'
        ? 'Search nearby Vehicle'
        : category === 'My Office'
        ? 'My Office'
        : category === 'Route Playback'
        ? 'Route Playback'
        : category === 'Distance Duration'
        ? 'Find distance and duration'
        : category === 'Location Distance'
        ? 'Distance between two locations'
        : category === 'Vehicles Distance'
        ? 'Distance between two vehicles'
        : category === 'Details'
        ? 'Details'
        : category === 'User Landmark'
        ? 'User Landmark'
        : category === 'Find Speed'
        ? `To find the vehicle's locations and speed`
        : null
    }
  >
    <IconButton {...rest}>
      <Avatar
        variant='square'
        sx={
          category === 'Track Vehicle'
            ? selected === 'track'
              ? { backgroundColor: '#00769E !important' }
              : { backgroundColor: '#D9D9D9 !important' }
            : category === 'Search Filter'
            ? selected === 'filter'
              ? { backgroundColor: '#00769E !important' }
              : { backgroundColor: '#D9D9D9 !important' }
            : category === 'My Office'
            ? selected === 'myoffice'
              ? { backgroundColor: '#00769E !important' }
              : { backgroundColor: '#D9D9D9 !important' }
            : category === 'Route Playback'
            ? selected === 'playback'
              ? { backgroundColor: '#00769E !important' }
              : { backgroundColor: '#D9D9D9 !important' }
            : category === 'Distance Duration'
            ? selected === 'distanceduration'
              ? { backgroundColor: '#00769E !important' }
              : { backgroundColor: '#D9D9D9 !important' }
            : category === 'Vehicles Distance'
            ? selected === 'vehiclesdistance'
              ? { backgroundColor: '#00769E !important' }
              : { backgroundColor: '#D9D9D9 !important' }
            : category === 'Location Distance'
            ? selected === 'locationdistance'
              ? { backgroundColor: '#00769E !important' }
              : { backgroundColor: '#D9D9D9 !important' }
            : category === 'Details'
            ? selected === 'details'
              ? { backgroundColor: '#00769E !important' }
              : { backgroundColor: '#D9D9D9 !important' }
            : category === 'User Landmark'
            ? selected === 'userlandmark'
              ? { backgroundColor: '#00769E !important' }
              : { backgroundColor: '#D9D9D9 !important' }
            : category === 'Find Speed'
            ? selected === 'filter'
              ? { backgroundColor: '#00769E !important' }
              : { backgroundColor: '#D9D9D9 !important' }
            : category === 'Myoffice Landmark'
            ? selected === 'myofficelandmark'
              ? { backgroundColor: '#00769E !important' }
              : { backgroundColor: '#D9D9D9 !important' }
            : null
        }
      >
        {category === 'Track Vehicle' ? (
          <GpsFixedIcon
            fontSize='small'
            sx={{
              color: selected === 'track' ? '#D9D9D9' : '#00769E'
            }}
          />
        ) : category === 'Search Filter' ? (
          <FilterAlt
            fontSize='small'
            sx={{
              color: selected === 'filter' ? '#D9D9D9' : '#00769E'
            }}
          />
        ) : category === 'My Office' ? (
          <Business
            fontSize='small'
            sx={{ color: selected === 'myoffice' ? '#D9D9D9' : '#00769E' }}
          />
        ) : category === 'Vehicles Distance' ? (
          <LocalShippingIcon
            fontSize='small'
            sx={{ color: selected === 'vehiclesdistance' ? '#D9D9D9' : '#00769E' }}
          />
        ) : category === 'Route Playback' ? (
          <ForkRight
            fontSize='small'
            sx={{ color: selected === 'playback' ? '#D9D9D9' : '#00769E' }}
          />
        ) : category === 'Distance Duration' ? (
          <NotListedLocationIcon
            fontSize='small'
            sx={{ color: selected === 'distanceduration' ? '#D9D9D9' : '#00769E' }}
          />
        ) : category === 'Location Distance' ? (
          <Explore
            fontSize='medium'
            sx={{ color: selected === 'locationdistance' ? '#D9D9D9' : '#00769E' }}
          />
        ) : category === 'Details' ? (
          <Summarize
            fontSize='small'
            sx={{ color: selected === 'details' ? '#D9D9D9' : '#00769E' }}
          />
        ) : category === 'User Landmark' ? (
          <PushPin
            fontSize='small'
            sx={{ color: selected === 'userlandmark' ? '#D9D9D9' : '#00769E' }}
          />
        ) : category === 'Find Speed' ? (
          <Speed
            fontSize='small'
            sx={{ color: selected === 'filter' ? '#D9D9D9' : '#00769E' }}
          />
        ) : category === 'Myoffice Landmark' ? (
          <Flag
            fontSize='small'
            sx={{ color: selected === 'myofficelandmark' ? '#D9D9D9' : '#00769E' }}
          />
        ) : null}
      </Avatar>
    </IconButton>
  </Tooltip>
);

export default CustomSquareButton;
