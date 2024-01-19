import React from 'react';
import { createUseStyles } from 'react-jss';
import {
  Box,
  Button as MuiButton,
  Card,
  Grid,
  Skeleton,
  Typography
} from '@mui/material';
import totalImg from '../../../../../app/images/total.png';
import onlineImg from '../../../../../app/images/online.png';
import offlineImg from '../../../../../app/images/offline.png';
import movingImg from '../../../../../app/images/moving.png';
import idleImg from '../../../../../app/images/idle.png';
import parkedImg from '../../../../../app/images/parked.png';

const useStyles = createUseStyles({
  cardBox: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    textTransform: 'capitalize'
  },
  card: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  cardImgBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardImg: {
    height: '50px',
    width: '50px',
    borderRadius: '50px'
  },
  cardTypography: {
    fontWeight: 'bold !important'
  },
  dialog: {
    '& .MuiDialog-container': {
      padding: '10px !important'
    }
  },
  filterDashboard: {
    '& .css-tlc64q-MuiPaper-root-MuiDialog-paper': {
      width: '350px !important'
    }
  }
});

const Analytics = ({ vehicleDashboardData, handleClick, isLoading }) => {
  // component styles
  const styles = useStyles();
  return (
    <Grid container spacing={1}>
      <Grid item lg={2} md={2} sm={4} xs={6}>
        <Card
          component={MuiButton}
          className={styles.card}
          onClick={() => handleClick('total')}
        >
          <Box className={styles.cardBox}>
            <Typography component='h5'>Total</Typography>
            {isLoading ? (
              <Skeleton animation='wave' variant='circular' width={30} height={30} />
            ) : (
              <Typography
                component='h4'
                className={styles.cardTypography}
                color='rgba(0, 0, 0, 0.72)'
              >
                {vehicleDashboardData?.count?.[0]?.total}
              </Typography>
            )}
          </Box>
          <Box className={styles.cardImgBox} p={1}>
            <Box component='img' src={totalImg} className={styles.cardImg} />
          </Box>
        </Card>
      </Grid>

      <Grid item lg={2} md={2} sm={4} xs={6}>
        <Card
          component={MuiButton}
          className={styles.card}
          onClick={() => handleClick('online')}
        >
          <Box className={styles.cardBox}>
            <Typography component='h5'>Online</Typography>
            {isLoading ? (
              <Skeleton animation='wave' variant='circular' width={30} height={30} />
            ) : (
              <Typography
                component='h4'
                className={styles.cardTypography}
                color='rgba(0, 255, 0, 0.72)'
              >
                {vehicleDashboardData?.count?.[0]?.online}
              </Typography>
            )}
          </Box>
          <Box className={styles.cardImgBox} p={1}>
            <Box component='img' src={onlineImg} className={styles.cardImg} />
          </Box>
        </Card>
      </Grid>

      <Grid item lg={2} md={2} sm={4} xs={6}>
        <Card
          component={MuiButton}
          className={styles.card}
          onClick={() => handleClick('offline')}
        >
          <Box className={styles.cardBox}>
            <Typography component='h5'>Offline</Typography>
            {isLoading ? (
              <Skeleton animation='wave' variant='circular' width={30} height={30} />
            ) : (
              <Typography
                component='h4'
                className={styles.cardTypography}
                color='#FF0000'
              >
                {vehicleDashboardData?.count?.[0]?.offline}
              </Typography>
            )}
          </Box>
          <Box className={styles.cardImgBox} p={1}>
            <Box component='img' src={offlineImg} className={styles.cardImg} />
          </Box>
        </Card>
      </Grid>

      <Grid item lg={2} md={2} sm={4} xs={6}>
        <Card
          component={MuiButton}
          className={styles.card}
          onClick={() => handleClick('moving')}
        >
          <Box className={styles.cardBox}>
            <Typography component='h5'>Moving</Typography>
            {isLoading ? (
              <Skeleton animation='wave' variant='circular' width={30} height={30} />
            ) : (
              <Typography
                component='h4'
                className={styles.cardTypography}
                color='#FFAE42'
              >
                {vehicleDashboardData?.count?.[0]?.moving}
              </Typography>
            )}
          </Box>
          <Box className={styles.cardImgBox} p={1}>
            <Box component='img' src={movingImg} className={styles.cardImg} />
          </Box>
        </Card>
      </Grid>

      <Grid item lg={2} md={2} sm={4} xs={6}>
        <Card
          component={MuiButton}
          className={styles.card}
          onClick={() => handleClick('idle')}
        >
          <Box className={styles.cardBox}>
            <Typography component='h5'>Idle</Typography>
            {isLoading ? (
              <Skeleton animation='wave' variant='circular' width={30} height={30} />
            ) : (
              <Typography
                component='h4'
                className={styles.cardTypography}
                color='#073863'
              >
                {vehicleDashboardData?.count?.[0]?.idle}
              </Typography>
            )}
          </Box>
          <Box className={styles.cardImgBox} p={1}>
            <Box component='img' src={idleImg} className={styles.cardImg} />
          </Box>
        </Card>
      </Grid>

      <Grid item lg={2} md={2} sm={4} xs={6}>
        <Card
          component={MuiButton}
          className={styles.card}
          onClick={() => handleClick('parked')}
        >
          <Box className={styles.cardBox}>
            <Typography component='h5'>parked</Typography>
            {isLoading ? (
              <Skeleton animation='wave' variant='circular' width={30} height={30} />
            ) : (
              <Typography
                component='h4'
                className={styles.cardTypography}
                color='rgba(255, 215, 0, 0.72)'
              >
                {vehicleDashboardData?.count?.[0]?.parked}
              </Typography>
            )}
          </Box>
          <Box className={styles.cardImgBox} p={1}>
            <Box component='img' src={parkedImg} className={styles.cardImg} />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Analytics;
