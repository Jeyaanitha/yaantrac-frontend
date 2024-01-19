import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import img from '../../app/images/landingpic.png';
import vectorimg1 from '../../app/images/geo1.png';
import vectorimg2 from '../../app/images/optimization.png';
import vectorimg3 from '../../app/images/cash.png';
import vectorimg4 from '../../app/images/push-notification.png';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  icons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    '& .MuiAvatar-img': {
      objectFit: 'contain !important'
    }
  },
  cardAlign: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    backgroundColor: '#00769E !important',
    minHeight: '100% !important',
    paddingBottom: '15px !important'
  },
  titleText: {
    marginBottom: '20px',
    fontWeight: '500'
  },
  features: {
    height: '80vh !important',
    width: '100vw !important',
    background: `url(${img}) no-repeat center !important`,
    backgroundSize: 'cover !important',
    display: 'flex !important',
    flexDirection: 'column !important',
    justifyContent: 'center !important',
    padding: '30px !important'
  }
});

const Features = () => {
  const styles = useStyles();
  const customTheme = useTheme();
  const isSmall = useMediaQuery(customTheme.breakpoints.down('sm'));

  // features top component
  const FeaturesTop = () => (
    <Box
      sx={{
        backgroundColor: '#000 !important'
      }}
    >
      <Box className={styles.features}>
        <Typography component={isSmall ? 'h2' : 'h1'} padding='20px' color='#fff'>
          Vehicles/Assets Management System & Tracking
        </Typography>
        <Typography component={isSmall ? 'h3' : 'h2'} paddingX='20px' color='#fff'>
          Manage all your vehicles/assets anytime anywhere in your palm
        </Typography>
      </Box>
    </Box>
  );

  // card component
  const CardComponent = ({ logo, title, content, dimension }) => (
    <Card className={styles.cardAlign} component={CardActionArea}>
      <CardContent className={styles.icons}>
        <Avatar
          src={logo}
          alt='vector'
          variant='square'
          sx={{
            ...dimension,
            marginY: '20px',
            objectFit: 'contain !important',
            height: '48px !important'
          }}
        />
        <Typography component='h3' className={`${styles.titleText} white-color`}>
          {title}
        </Typography>
        <Typography component='h5' className='white-color'>
          {content}
        </Typography>
      </CardContent>
    </Card>
  );

  // features bottom component
  const FeaturesBottom = () => {
    const cards = [
      {
        name: 'card1',
        logo: vectorimg1,
        title: 'Location Tracking And Geo-Fencing',
        content:
          'You can track live location of the vehicles/assets or download and view previous routes whenever you need. This also includes speed distance, fuel and oil.',
        dimension: { height: 65, width: 60 }
      },
      {
        name: 'card2',
        logo: vectorimg2,
        title: 'Maintainence',
        content:
          'Get reminders when your vehicles/assets is due for service or needs renewal of  documents. Also view nearby service centres, petrol bunks and toll booths.',
        dimension: { height: 48, width: 64 }
      },
      {
        name: 'card3',
        logo: vectorimg3,
        title: 'Reporting and Cost',
        content:
          'Get reports on the performance and maintenance of the vehicles/assets. With built in expense track you can keep account of all your expenditure.',
        dimension: { height: 48, width: 50 }
      },
      {
        name: 'card4',
        logo: vectorimg4,
        title: 'Notification',
        content:
          'Receive alerts/get notified via push notifications/SMS/email about important events such as Geo-Fence Entry/Exit, Overspeed, Document renewal, Device of Alert',
        dimension: { height: 48, width: 50 }
      }
    ];

    return (
      <Box sx={{ marginTop: '-8%' }}>
        <Box sx={{ width: '95%', margin: 'auto' }}>
          <Grid container spacing={2} px={2}>
            {cards.map(({ name, logo, title, content, dimension }) => (
              <Grid item md={3} sm={6} xs={12} key={name}>
                <CardComponent
                  logo={logo}
                  title={title}
                  content={content}
                  dimension={dimension}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    );
  };

  // Features component
  return (
    <>
      <FeaturesTop />
      <FeaturesBottom />
    </>
  );
};

export default Features;
