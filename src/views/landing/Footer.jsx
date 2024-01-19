import {
  Box,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import logo from '../../app/images/YaantracLandingImg.png';
import mappin from '../../app/images/mappin.png';
import phone from '../../app/images/phone.png';
import linkedin from '../../app/images/linkedin.png';
import youtube from '../../app/images/youtube.png';
import instagram from '../../app/images/instagram.png';
import MailIcon from '@mui/icons-material/Mail';
import { Link, useNavigate } from 'react-router-dom';
import { Link as NavLink } from '@mui/material';

//Customer Styles for Grid, Footer text, Copyright text
const useStyles = makeStyles({
  gridItem: {
    width: '100%'
  },
  footerText: {
    padding: '5px 0px',
    textDecoration: 'none !important',
    '&:hover': {
      color: 'white !important'
    },
    navLink: {
      textDecoration: 'none',
      color: 'white'
    }
  }
});

const Footer = () => {
  const styles = useStyles();
  const navigate = useNavigate();

  //To Get Current Year
  const date = new Date();
  let year = date.getFullYear();

  // Responsive UI:
  const customTheme = useTheme();
  const isMediumScreen = useMediaQuery(customTheme.breakpoints.up('md'));

  // Scroll the page to top when button click:
  const scrollToTop = () => {
    let contactUs = document.getElementById('contacts');
    contactUs.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const aboutScrollToTop = () => {
    let aboutUs = document.getElementById('about');
    aboutUs.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Grid
      container
      spacing={4}
      sx={
        isMediumScreen
          ? {
              backgroundColor: '#00769E',
              py: 1,
              height: '380px'
            }
          : { backgroundColor: '#00769E', py: 1 }
      }
      mt='-7px'
    >
      <Grid item lg={5} md={5} className={styles.gridItem}>
        <Box
          sx={
            isMediumScreen
              ? {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }
              : {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }
          }
        >
          <Box
            nowrap='true'
            component='img'
            src={logo}
            sx={{
              display: { width: 130 },
              flexGrow: 0,
              p: 1,
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          />
          <Box
            sx={{
              p: 1,
              pt: 5,
              mt: 20,
              display: { lg: 'flex', md: 'flex', sm: 'none', xs: 'none' }
            }}
          >
            <Typography component='h6' className='white-color'>
              Copyright © {year} Datayaan Solutions Private Limited
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item lg={3} md={3} className={styles.gridItem} sx={{ px: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: {
              lg: 'flex-start',
              md: 'flex-start',
              sm: 'center',
              xs: 'center'
            },
            alignItems: {
              lg: 'flex-start',
              md: 'flex-start',
              sm: 'center',
              xs: 'center'
            }
          }}
        >
          <Link
            to='/aboutus'
            className={`${styles.footerText} white-color`}
            onClick={aboutScrollToTop}
          >
            <Typography component='h6'>About Us</Typography>
          </Link>
          <Link
            to='/contactus'
            className={`${styles.footerText} white-color`}
            onClick={scrollToTop}
          >
            <Typography component='h6'>Contact Us</Typography>
          </Link>
          <Link to='/privacypolicy' className={`${styles.footerText} white-color`}>
            <Typography component='h6'>Privacy Policy</Typography>
          </Link>
          <Link to='/termsandconditions' className={`${styles.footerText} white-color`}>
            <Typography component='h6'>Terms and Conditions</Typography>
          </Link>
        </Box>
        <Box
          sx={{
            color: 'white',
            mt: 3,
            display: { lg: 'flex', md: 'flex', sm: 'none', xs: 'none' },
            flexDirection: 'column'
          }}
        >
          <Typography component='h5' sx={{ fontWeight: 'bold' }}>
            Connect with us
          </Typography>
          <Box sx={{ display: 'flex', columnGap: 2, padding: '7px' }}>
            <NavLink
              href='https://www.instagram.com/yaan.trac/?next=%2Fmed.yaan%2F'
              target='_blank'
            >
              <img alt='instagram' src={instagram} style={{ width: '23px' }} />
            </NavLink>

            <NavLink href='https://www.linkedin.com/in/yaantrac/' target='_blank'>
              <img alt='linkedin' src={linkedin} style={{ width: '23px' }} />
            </NavLink>

            <NavLink
              href='https://www.youtube.com/channel/UCupEnvB0jicNnGWjQj7M2Ow'
              target='_blank'
            >
              <img alt='youtube' src={youtube} style={{ width: '23px' }} />
            </NavLink>
          </Box>
        </Box>
      </Grid>
      <Grid item lg={3} md={3} className={styles.gridItem}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: {
              lg: 'flex-start',
              md: 'flex-start',
              sm: 'center',
              xs: 'center'
            }
          }}
          className='white-color'
        >
          <Typography
            component='h5'
            sx={{ fontWeight: 'bold', paddingLeft: { lg: '8px', md: '8px' } }}
          >
            Contact Information
          </Typography>
          <NavLink
            className={`${styles.footerText} white-color`}
            href='https://goo.gl/maps/smWnpVCztncGGFWX9'
            target='_blank'
            sx={{
              display: 'flex',
              flexDirection: { lg: 'row', md: 'row', sm: 'column', xs: 'column' }
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '8px'
              }}
            >
              <img alt='mappin' src={mappin} style={{ width: '28px' }} />
            </Box>
            <Typography
              component='h6'
              sx={isMediumScreen ? { textAlign: 'start' } : { textAlign: 'center' }}
            >
              <br />
              <strong>Datayaan Solutions Private Limited</strong>
              <br />
              Agaram,SDF-1,MEPZ SEZ Tambaram
              <br />
              Chennai-600045, Tamil Nadu.
            </Typography>
          </NavLink>
          <NavLink
            className={`${styles.footerText} white-color`}
            href='tel:044 222271400'
            sx={{
              display: 'flex',
              flexDirection: { lg: 'row', md: 'row', sm: 'column', xs: 'column' }
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '8px'
              }}
            >
              <img alt='phone' src={phone} style={{ width: '28px' }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography component='h6'>044 222271400</Typography>
            </Box>
          </NavLink>
          <NavLink
            className={`${styles.footerText} white-color`}
            href='mailto:contact@datayaan.com'
            sx={{
              display: 'flex',
              flexDirection: { lg: 'row', md: 'row', sm: 'column', xs: 'column' }
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: { sm: 'center', xs: 'center' }
              }}
            >
              <IconButton>
                <MailIcon sx={{ color: 'white', width: '26px' }} />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography component='h6'>contact@datayaan.com</Typography>
            </Box>
          </NavLink>
        </Box>
      </Grid>
      <Grid item className={styles.gridItem} sx={{ display: { lg: 'none', md: 'none' } }}>
        <Box
          sx={{
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '80px'
          }}
        >
          <Typography component='h5' sx={{ fontWeight: 'bold' }}>
            Connect with us
          </Typography>
          <Box sx={{ display: 'flex', columnGap: 2, padding: '7px' }}>
            <NavLink
              href='https://www.instagram.com/yaan.trac/?next=%2Fmed.yaan%2F'
              target='_blank'
            >
              <img alt='instagram' src={instagram} style={{ width: '23px' }} />
            </NavLink>

            <NavLink href='https://www.linkedin.com/in/yaantrac/' target='_blank'>
              <img alt='linkedin' src={linkedin} style={{ width: '23px' }} />
            </NavLink>

            <NavLink
              href='https://www.youtube.com/channel/UCupEnvB0jicNnGWjQj7M2Ow'
              target='_blank'
            >
              <img alt='youtube' src={youtube} style={{ width: '23px' }} />
            </NavLink>
          </Box>
        </Box>
        <Typography
          component='h6'
          className='white-color'
          style={{
            padding: '10px',
            height: '130px',
            textAlign: 'center'
          }}
        >
          Copyright © {year} Datayaan Solutions Private Limited
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
