import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Hidden,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import valueAddsImg from '../../app/images/valueaddsimg.png';
import logo1 from '../../app/images/locator.png';
import logo2 from '../../app/images/notification.png';
import logo3 from '../../app/images/route1.png';
import logo4 from '../../app/images/map.png';
import logo5 from '../../app/images/data-analytics.png';
import logo6 from '../../app/images/filter2.png';

const useStyles = makeStyles({
  root: {
    width: '95%',
    height: '100vh',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    padding: 20,
    marginBottom: '20px !important',
    fontWeight: 'bold !important',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  semiCircle: {
    width: '400px',
    height: '200px',
    borderRadius: '200px 200px 0 0',
    position: 'relative'
  },
  container: { position: 'relative', marginBottom: 30 },
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '80px',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  cone: {
    width: '50px',
    height: '100px',
    position: 'relative',
    transformStyle: 'preserve-3d',
    transform: 'rotateY(0deg) translateZ(150px)'
  },
  cone1: {
    position: 'absolute',
    left: '-18%',
    bottom: '-102%',
    transform: 'rotate(-60deg) translateY(-85%)'
  },
  cone2: {
    position: 'absolute',
    left: '-11%',
    bottom: 0,
    transform: 'rotate(-26deg) translateY(-85%)'
  },
  cone3: {
    position: 'absolute',
    left: '15%',
    bottom: '55%',
    transform: 'rotate(4deg) translateY(-115%)'
  },
  cone4: {
    position: 'absolute',
    left: '50%',
    bottom: '105%',
    transform: 'rotate(44deg) translateY(-85%)'
  },
  cone5: {
    position: 'absolute',
    left: '88%',
    bottom: '42%',
    transform: 'rotate(78deg) translateY(-85%)'
  },
  cone6: {
    position: 'absolute',
    left: '104%',
    bottom: '-48%',
    transform: 'rotate(104deg) translateY(-85%)'
  },
  circle: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    position: 'absolute',
    top: '50%',
    border: '5px solid #D9D9D9',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  triangle: {
    width: 0,
    height: 0,
    borderRight: '50px solid transparent',
    borderLeft: '50px solid transparent',
    position: 'absolute',
    transform: 'rotate(33deg)',
    top: '24px',
    left: '-3px'
  },
  content: {
    width: '180px',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content1: {
    top: '78%',
    left: '-92%'
  },
  content2: {
    top: '-120%',
    left: '-61%'
  },
  content3: {
    top: '-240%',
    left: '-11%'
  },
  content4: {
    top: '-230%',
    left: '87%'
  },
  content5: {
    top: '-120%',
    left: '130%'
  },
  content6: {
    top: '74%',
    left: '153%'
  }
});

const ValueAdds = () => {
  const styles = useStyles();
  const customTheme = useTheme();
  const isSmall = useMediaQuery(customTheme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(customTheme.breakpoints.down('lg'));

  const coneData = [
    {
      logo: (
        <Avatar
          alt='logo1'
          src={logo1}
          variant='square'
          sx={isMedium ? { transform: 'rotate(0deg)' } : { transform: 'rotate(59deg)' }}
        />
      ),
      backgroundColor: '#00769E',
      content: 'All Vehicles/Assets Location'
    },
    {
      logo: (
        <Avatar
          alt='logo2'
          src={logo2}
          variant='square'
          sx={isMedium ? { transform: 'rotate(0deg)' } : { transform: 'rotate(27deg)' }}
        />
      ),
      backgroundColor: '#073863',
      content: 'Reporting and Reminders'
    },
    {
      logo: (
        <Avatar
          alt='logo3'
          src={logo3}
          variant='square'
          sx={isMedium ? { transform: 'rotate(0deg)' } : { transform: 'rotate(-5deg)' }}
        />
      ),
      backgroundColor: '#00769E',
      content: 'Nearby places and Navigation'
    },
    {
      logo: (
        <Avatar
          alt='logo4'
          src={logo4}
          variant='square'
          sx={isMedium ? { transform: 'rotate(0deg)' } : { transform: 'rotate(-44deg)' }}
        />
      ),
      backgroundColor: '#073863',
      content: 'Geo-Fencing and Anti-Theft'
    },
    {
      logo: (
        <Avatar
          alt='logo5'
          src={logo5}
          variant='square'
          sx={isMedium ? { transform: 'rotate(0deg)' } : { transform: 'rotate(-78deg)' }}
        />
      ),
      backgroundColor: '#00769E',
      content: 'Analytics and Demographics'
    },
    {
      logo: (
        <Avatar
          alt='logo6'
          src={logo6}
          variant='square'
          sx={isMedium ? { transform: 'rotate(0deg)' } : { transform: 'rotate(-105deg)' }}
        />
      ),
      backgroundColor: '#073863',
      content: 'Vechicle Parameters'
    }
  ];

  const ConeWrapper = ({ index, logo, backgroundColor, content }) => (
    <Box className={styles.wrapper}>
      <Box className={`${styles.cone} ${styles[`cone${index + 1}`]}`}>
        <Box
          className={styles.triangle}
          sx={{ borderBottom: `86px solid ${backgroundColor} !important` }}
        />
        <Box
          className={styles.circle}
          sx={{
            backgroundColor: `${backgroundColor} !important`,
            '& .MuiAvatar-root img': { objectFit: 'contain' }
          }}
        >
          {logo}
        </Box>
      </Box>
      <Box className={`${styles.content} ${styles[`content${index + 1}`]}`}>
        <Box
          sx={{
            backgroundColor: backgroundColor,
            width: '10px',
            height: '105px'
          }}
          mr={1}
        ></Box>
        <Typography component='h5'>{content}</Typography>
      </Box>
    </Box>
  );

  const ConeContainer = () => {
    return (
      <Box className={styles.container}>
        {coneData.map(({ logo, backgroundColor, content }, index) => (
          <ConeWrapper
            key={index}
            index={index}
            logo={logo}
            backgroundColor={backgroundColor}
            content={content}
          />
        ))}
        <Box
          className={styles.semiCircle}
          component='img'
          alt='value-adds'
          src={valueAddsImg}
        />
      </Box>
    );
  };

  const CardComponent = ({ logo, content }) => (
    <Card sx={{ height: '100%', backgroundColor: '#00769E' }}>
      <CardActionArea>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box>{logo}</Box>
          <Typography
            component='h5'
            sx={
              isSmall
                ? {
                    color: '#FFF',
                    overflowWrap: 'anywhere',
                    fontSize: '13px',
                    textAlign: 'center'
                  }
                : { color: '#FFF' }
            }
            my={1}
          >
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  const CardContainer = () => (
    <Grid
      container
      spacing={2}
      sx={
        isSmall
          ? {
              marginLeft: '0px',
              width: 'auto',
              flexWrap: 'wrap',
              paddingRight: '10px'
            }
          : { padding: '20px 40px 10px 40px' }
      }
    >
      {coneData.map(({ logo, content }, index) => (
        <Grid
          key={index}
          item
          md={4}
          sm={6}
          xs={6}
          sx={
            isSmall
              ? { paddingLeft: '10px !important', paddingTop: '10px !important' }
              : { paddingLeft: '16px', paddingTop: '16px' }
          }
        >
          <CardComponent key={index} logo={logo} content={content} />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <>
      <Hidden lgUp>
        <Box my={5}>
          <Typography component='h3' className={`${styles.title} black-color`}>
            Value Adds
          </Typography>
          <CardContainer />
        </Box>
      </Hidden>
      <Hidden lgDown>
        <Box className={styles.root} my={5}>
          <Typography component='h3' className={`${styles.title} black-color`}>
            Value Adds
          </Typography>
          <ConeContainer />
        </Box>
      </Hidden>
    </>
  );
};

export default ValueAdds;
