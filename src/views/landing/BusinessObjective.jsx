import React from 'react';
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import objIcon from '../../app/images/policy.png';
import vehicleIcon from '../../app/images/vehicletrack.png';
import searchIcon from '../../app/images/search.png';
import touchIcon from '../../app/images/fingerprint-scan.png';

const BusinessObjective = () => {
  // card component
  const CardComponent = ({ logo, content, index }) => (
    <Card sx={{ minHeight: '100%' }}>
      <CardContent className='icons'>
        {index % 2 === 0 ? (
          <>
            <Box mr={2}>
              <Avatar className='objective-logo'>
                <Box component='img' src={logo} sx={{ height: 50 }} />
              </Avatar>
            </Box>
            <Typography component='h5' sx={{ color: `#000 !important` }}>
              {content}
            </Typography>
          </>
        ) : (
          <>
            <Typography component='h5' sx={{ color: `#000 !important` }}>
              {content}
            </Typography>
            <Box ml={2}>
              <Avatar className='objective-logo'>
                <Box component='img' src={logo} sx={{ height: 50 }} />
              </Avatar>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );

  // card container
  const CardContainer = () => {
    const cards = [
      {
        name: 'card1',
        logo: objIcon,
        content:
          'The Indian Government has made GPS mandatory for all commercial vehicles/assets by this year end. This is a step to bring transparency'
      },
      {
        name: 'card2',
        logo: vehicleIcon,
        content:
          'Owners of the vehicle are finding it hard to keep track of all their vehicle’s location documents, maintenance and security'
      },
      {
        name: 'card3',
        logo: searchIcon,
        content:
          'Driver’s are finding it hard to find important/crucial locations and navigate to the destination'
      },
      {
        name: 'card4',
        logo: touchIcon,
        content:
          'Any authenticated public/service recipient should be able to track and manage vehicles/assets remotely'
      }
    ];
    return (
      <Grid container spacing={2} p={2} mb={2} sx={{ padding: '16px 0px 16px 15px' }}>
        {cards.map(({ name, logo, content }, index) => (
          <Grid item key={name} md={6} sm={12} p={1.5} sx={{ width: '100%' }}>
            <CardComponent logo={logo} content={content} index={index} />
          </Grid>
        ))}
      </Grid>
    );
  };

  // Business Objective component
  return (
    <Box id='business-objective' sx={{ width: '100%', margin: 'auto' }}>
      <Box sx={{ marginY: 2 }}>
        <Typography component='h3' className='main-title'>
          Business Objective
        </Typography>
        <CardContainer />
      </Box>
    </Box>
  );
};

export default BusinessObjective;
