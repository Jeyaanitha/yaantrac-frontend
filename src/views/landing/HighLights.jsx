import React from 'react';
import { Avatar, Box, Card, Grid, Hidden, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import img from '../../app/images/highlightimg.png';
import img2 from '../../app/images/highlightimg2.png';
import img3 from '../../app/images/highlightimg3.png';
import img4 from '../../app/images/highlightimg4.png';

const useStyles = makeStyles({
  root: { width: '80%', margin: 'auto' },
  heading: {
    padding: 20,
    marginBottom: '20px !important',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold !important'
  },
  stem: { position: 'relative' },
  circle: {
    width: '138px !important',
    height: '138px !important',
    backgroundColor: '#019DD8 !important',
    borderRadius: '50% !important',
    display: 'flex !important',
    justifyContent: 'center !important',
    alignItems: 'center !important',
    position: 'absolute !important',
    top: '-25% !important',
    left: '-5% !important'
  },
  avatar: {
    backgroundColor: '#FFFFFF !important',
    height: '100px !important',
    width: '100px !important'
  },
  content: { display: 'flex', alignItems: 'center', justifyContent: 'flex-start' },
  elipse: {
    height: '90px !important',
    backgroundColor: '#019DD8 !important',
    borderRadius: '0 100px 100px 0 !important',
    display: 'flex !important',
    alignItems: 'center !important',
    color: '#FFFFFF !important'
  },
  container: {
    backgroundColor: '#D9D9D9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px'
  },
  avatar2: {
    backgroundColor: '#FFF',
    border: '1px solid #00769E',
    height: 80,
    width: 80
  },
  content2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
});

const HighLights = () => {
  const styles = useStyles();

  // HighLights component
  const HighlightComponentMdUp = ({
    margin,
    zIndex,
    paddingLeft,
    logo,
    backgroundColor,
    title,
    content
  }) => (
    <Box className={styles.stem} sx={{ marginLeft: `${margin}px !important` }}>
      <Box
        component={Card}
        elevation={2}
        className={styles.circle}
        sx={{
          backgroundColor: `${backgroundColor} !important`,
          zIndex: zIndex && `1 !important`
        }}
      >
        <Avatar className={styles.avatar}>
          <Box component='img' src={logo} />
        </Avatar>
      </Box>
      <Box>
        <Grid container className={styles.content}>
          <Grid item md={6}>
            <Box
              component={Card}
              elevation={2}
              className={styles.elipse}
              sx={{
                backgroundColor: `${backgroundColor} !important`,
                paddingLeft: `${paddingLeft} !important`
              }}
            >
              <Typography component='h4'>{title}</Typography>
            </Box>
          </Grid>
          <Grid item md={6} pl={2}>
            <Typography component='h5'>{content}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );

  const HighlightComponentMdDown = ({ logo, title, content }) => (
    <Grid container className={styles.container}>
      <Grid item sm={2}>
        <Box
          sx={{
            '& .MuiAvatar-root img': {
              height: '60%',
              width: '60%',
              objectFit: 'contain'
            }
          }}
        >
          <Avatar alt='logo' src={logo} className={styles.avatar2}>
            <Box component='img' src={logo} />
          </Avatar>
        </Box>
      </Grid>
      <Grid item sm={10}>
        <Box className={styles.content2}>
          <Typography component='h4' sx={{ fontWeight: 700, color: '#00769E' }}>
            {title}
          </Typography>
          <Typography component='h5' sx={{ fontWeight: 500, color: '#000000' }}>
            {content}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );

  // Hightlights container component
  const HighlightContainer = () => {
    const data = [
      {
        margin: 0,
        backgroundColor: '#00769E',
        zIndex: false,
        paddingLeft: '200px',
        logo: img,
        title: 'Live Tracking',
        content:
          'Any device at any given point of time to get the actual location of the vehicle'
      },
      {
        margin: 90,
        backgroundColor: '#019DD8',
        zIndex: true,
        paddingLeft: '110px',
        logo: img2,
        title: 'Offline Reply',
        content:
          'Getting vehicle track on offline mode to get the complete track of the vehicle'
      },
      {
        margin: 0,
        backgroundColor: '#00769E',
        zIndex: false,
        paddingLeft: '200px',
        logo: img3,
        title: 'Speed Insights',
        content: 'Find out more on speed control of the vehicle and stop over capture'
      },
      {
        margin: 90,
        backgroundColor: '#019DD8',
        zIndex: true,
        paddingLeft: '110px',
        logo: img4,
        title: 'Cost Management',
        content: 'Cost Management is to get the analysis of the cost to cost calculation'
      }
    ];
    return (
      <Box>
        {data.map(
          (
            { margin, zIndex, paddingLeft, logo, backgroundColor, title, content },
            index
          ) => (
            <Box key={index}>
              <Hidden mdUp>
                <HighlightComponentMdDown logo={logo} title={title} content={content} />
              </Hidden>
              <Hidden mdDown>
                <HighlightComponentMdUp
                  margin={margin}
                  backgroundColor={backgroundColor}
                  paddingLeft={paddingLeft}
                  zIndex={zIndex}
                  logo={logo}
                  title={title}
                  content={content}
                />
              </Hidden>
            </Box>
          )
        )}
      </Box>
    );
  };

  // final HighLights component
  return (
    <Box className={styles.root}>
      <Typography component='h3' className={`${styles.heading} black-color`}>
        Highlights
      </Typography>
      <HighlightContainer />
    </Box>
  );
};

export default HighLights;
