import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import Footer from '../../views/landing/Footer';
import AboutUsImage from '../../app/images/AboutUsImage.png';
import WhoWeAre from '../../app/images/WhoWeAre.png';
import WhatWeDo from '../../app/images/WhatWeDo.png';
import vehicleTracking from '../../app/images/vehicleTracking.png';
import AssetTracking from '../../app/images/AssetTracking.png';
import PersonalTracking from '../../app/images/PersonalTracking.png';
import Geofencing from '../../app/images/Geofencing.png';
import HistoricalPlayback from '../../app/images/HistoricalPlayback.png';
import AlertsNotifications from '../../app/images/AlertsNotifications.png';
import ReportsAnalytics from '../../app/images/ReportsAnalytics.png';
import MobileApplications from '../../app/images/MobileApplications.png';
import Ayyappan from '../../app/images/Ayyappan.png';
import Navarathinamani from '../../app/images/Navarathinamani.png';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#fff',
    height: '100vh',
    overflowY: 'scroll',
    overflowX: 'hidden'
  },
  icons: {
    '& .MuiAvatar-img': {
      objectFit: 'contain !important'
    }
  }
});

const AboutUs = () => {
  const styles = useStyles();
  const customTheme = useTheme();
  const isMedium = useMediaQuery(customTheme.breakpoints.down('md'));

  // card component
  const CardComponent = ({ logo, title, subtitle, content }) => (
    <Card sx={{ minHeight: '100%' }}>
      <CardContent
        className={styles.icons}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <>
          <Box mr={2}>
            <Avatar
              sx={{
                backgroundColor: '#fff',
                height: 100,
                width: 100,
                objectFit: 'contain'
              }}
            >
              <Box component='img' src={logo} sx={{ height: 100, borderRadius: 100 }} />
            </Avatar>
          </Box>

          <Typography
            component={isMedium ? 'h4' : 'h3'}
            sx={{ fontWeight: 'bold', paddingTop: '10px', textAlign: 'center' }}
          >
            {title}
          </Typography>
          <Typography
            component={isMedium ? 'h6' : 'h5'}
            sx={{
              fontWeight: 'bold',
              color: '#747f8e',
              paddingBottom: '16px',
              textAlign: 'center'
            }}
          >
            {subtitle}
          </Typography>
          <Typography component={isMedium ? 'h6' : 'h5'} textAlign='center'>
            {content}
          </Typography>
        </>
      </CardContent>
    </Card>
  );

  // card container
  const CardContainer = () => {
    const cards = [
      {
        name: 'card1',
        logo: Ayyappan,
        title: 'Ayyappan V',
        subtitle: 'Founder/CEO, Datayaan Solutions Private Limited',
        content:
          'Founder/CEO Datayaan Solutions Private Limited. Has around 25 years of IT industry experience in product development, IT services, and entrepreneurship. He strongly believes in automation thru innovation. His vision is to create innovative and futuristic products to serve the industry better.'
      },
      {
        name: 'card2',
        logo: Navarathinamani,
        title: 'Navarathinamani P',
        subtitle: 'Co-Founder/COO, Datayaan Solutions Private Limited',
        content:
          'Co-founder and Director of Operations, Delivery Management, and Customer Relationship. Also contributes to Strategic Planning and Business Development. More than 17 years of experience in the IT Industry, which includes around 6 years of experience in end-to-end project management activities.'
      }
    ];
    return (
      <Grid
        container
        spacing={2}
        p={2}
        mb={2}
        sx={{
          padding: '16px 0px 16px 15px',
          justifyContent: 'center'
        }}
      >
        {cards.map(({ name, logo, title, subtitle, content }, index) => (
          <Grid item key={name} md={4} sm={6} xs={12} p={1.5}>
            <CardComponent
              logo={logo}
              title={title}
              subtitle={subtitle}
              content={content}
              index={index}
            />
          </Grid>
        ))}
      </Grid>
    );
  };
  return (
    <>
      <Box className={styles.root} id={'about'}>
        <Box p={{ lg: 4, md: 4, sm: 4, xs: 2 }}>
          <Box>
            <Typography component={isMedium ? 'h2' : 'h1'} mb={2} fontWeight='bold'>
              About Us
            </Typography>
          </Box>
          <Grid container mb={3} sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Grid
              item
              lg={6}
              md={6}
              sm={12}
              pr={2}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >
              <Typography component={isMedium ? 'h5' : 'h4'}>
                Welcome to Yaantrac, your reliable GPS-based vehicle, asset, and personal
                tracking platform. At Yaantrac, we are committed to provide innovative
                solutions that empower businesses and individuals to track and manage
                their valuable assets with ease and precision. With our cutting-edge
                technology and user-friendly interface, Yaantrac offers comprehensive
                tracking solutions that cater to a wide range of industries and
                requirements. Whether you're a fleet manager seeking to optimize
                operations, a business owner safeguarding your assets, or a concerned
                parent ensuring your loved ones' safety, Yaantrac has you covered. Our
                platform combines the power of GPS technology, real-time tracking, and
                advanced analytics to deliver accurate location information at your
                fingertips. With a simple yet powerful dashboard, you can effortlessly
                monitor and manage all your vehicles, assets, or even personal devices in
                a single centralized system.
              </Typography>
            </Grid>
            <Grid
              item
              lg={6}
              md={6}
              sm={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                height: '80%'
              }}
              pl={2}
            >
              <Box component='img' src={AboutUsImage} width={isMedium ? '60%' : '100%'} />
            </Grid>
          </Grid>
          <Box>
            <Box>
              <Typography component={isMedium ? 'h3' : 'h2'} my={4} fontWeight='bold'>
                Who We Are ?
              </Typography>
            </Box>
            <Grid
              container
              mb={6}
              sx={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <Grid
                item
                lg={6}
                md={6}
                sm={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  height: '80%'
                }}
                pr={2}
              >
                <Box component='img' src={WhoWeAre} width={isMedium ? '60%' : '100%'} />
              </Grid>
              <Grid
                item
                lg={6}
                md={6}
                sm={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}
              >
                <Typography component={isMedium ? 'h5' : 'h4'} pb={2}>
                  At Yaantrac, we are a dynamic team of professionals dedicated to
                  revolutionizing the way businesses and individuals track and manage
                  their assets. Our mission is to provide reliable, innovative, and
                  user-friendly GPS-based tracking solutions that empower our customers to
                  enhance efficiency, security, and peace of mind.
                </Typography>
                <Typography component={isMedium ? 'h5' : 'h4'} pb={2}>
                  Yaantrac – Empowering You to Track with Confidence.
                </Typography>
              </Grid>
            </Grid>

            <Box>
              <Box>
                <Typography component={isMedium ? 'h3' : 'h2'} my={2} fontWeight='bold'>
                  What we do ?
                </Typography>
              </Box>
              <Grid
                container
                mb={6}
                sx={{ justifyContent: 'center', alignItems: 'center' }}
              >
                <Grid
                  item
                  lg={6}
                  md={6}
                  sm={12}
                  pr={2}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <Typography component={isMedium ? 'h5' : 'h4'} pb={2}>
                    At Yaantrac, we specialize in providing comprehensive GPS-based
                    tracking solutions for vehicles, assets, and personal devices. We
                    understand that effective tracking is crucial for businesses and
                    individuals to optimize operations, ensure security, and gain valuable
                    insights. That's why we have developed a range of innovative features
                    and services to meet diverse tracking needs.
                  </Typography>
                  <Typography component={isMedium ? 'h5' : 'h4'} pb={2}>
                    Our platform offers a wide array of functionalities designed to
                    empower our customers with real-time tracking, precise location
                    information, and advanced analytics. Here's a glimpse of what we do:
                  </Typography>
                </Grid>

                <Grid
                  item
                  lg={6}
                  md={6}
                  sm={12}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: '80%'
                  }}
                  pl={2}
                >
                  <Box component='img' src={WhatWeDo} width={isMedium ? '60%' : '100%'} />
                </Grid>
              </Grid>
              <Box>
                <Grid container p={{ lg: 3, md: 3, sm: 0 }} rowGap='15px'>
                  <Grid
                    item
                    md={6}
                    p={{ lg: 3.75, md: 3.75, sm: 3.75, xs: 0 }}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '20px'
                    }}
                  >
                    <Avatar
                      className='blue-color'
                      sx={{
                        height: 80,
                        width: 80,
                        objectFit: 'contain'
                      }}
                    >
                      <Box component='img' src={vehicleTracking} sx={{ height: 50 }} />
                    </Avatar>

                    <Box>
                      <Typography
                        component={isMedium ? 'h5' : 'h4'}
                        fontWeight='bold'
                        py={1}
                      >
                        Vehicle Tracking
                      </Typography>
                      <Typography component={isMedium ? 'h6' : 'h5'}>
                        Our GPS-based vehicle tracking solutions enable fleet managers and
                        businesses to monitor their vehicles' precise location, speed, and
                        status in real-time. With our intuitive dashboard, you can
                        effortlessly track and manage your fleet, enhance efficiency, and
                        improve customer service.
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid
                    item
                    md={6}
                    p={{ lg: 3.75, md: 3.75, sm: 3.75, xs: 0 }}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '20px'
                    }}
                  >
                    <Avatar
                      className='blue-primary'
                      sx={{
                        height: 80,
                        width: 80,
                        objectFit: 'contain'
                      }}
                    >
                      <Box component='img' src={AssetTracking} sx={{ height: 50 }} />
                    </Avatar>

                    <Box>
                      <Typography
                        component={isMedium ? 'h5' : 'h4'}
                        fontWeight='bold'
                        py={1}
                      >
                        Asset Tracking
                      </Typography>
                      <Typography component={isMedium ? 'h6' : 'h5'}>
                        We provide reliable asset tracking solutions that allow businesses
                        to monitor and manage valuable assets such as equipment,
                        machinery, containers, and more. Gain complete visibility into
                        your assets' whereabouts, streamline operations, prevent theft or
                        loss, and optimize resource allocation.
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid
                    item
                    md={6}
                    p={{ lg: 3.75, md: 3.75, sm: 3.75, xs: 0 }}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '20px'
                    }}
                  >
                    <Avatar
                      className='blue-primary'
                      sx={{
                        height: 80,
                        width: 80,
                        objectFit: 'contain'
                      }}
                    >
                      <Box component='img' src={PersonalTracking} sx={{ height: 50 }} />
                    </Avatar>

                    <Box>
                      <Typography
                        component={isMedium ? 'h5' : 'h4'}
                        fontWeight='bold'
                        py={1}
                      >
                        Personal Tracking
                      </Typography>
                      <Typography component={isMedium ? 'h6' : 'h5'}>
                        For personal use, we offer GPS-based tracking solutions that
                        prioritize the safety and well-being of individuals. Whether it's
                        tracking the location of loved ones, monitoring the safety of lone
                        workers, or ensuring the security of valuable personal belongings,
                        our platform provides peace of mind and instant notifications.
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid
                    item
                    md={6}
                    p={{ lg: 3.75, md: 3.75, sm: 3.75, xs: 0 }}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '20px'
                    }}
                  >
                    <Avatar
                      className='blue-color'
                      sx={{
                        height: 80,
                        width: 80,
                        objectFit: 'contain'
                      }}
                    >
                      <Box component='img' src={Geofencing} sx={{ height: 50 }} />
                    </Avatar>

                    <Box>
                      <Typography
                        component={isMedium ? 'h5' : 'h4'}
                        fontWeight='bold'
                        py={1}
                      >
                        Geofencing
                      </Typography>
                      <Typography component={isMedium ? 'h6' : 'h5'}>
                        Take advantage of our geofencing feature to create virtual
                        boundaries and receive instant alerts when your vehicles, assets,
                        or personal devices enter or exit specified areas. Enhance
                        security, prevent unauthorized use, and improve operational
                        efficiency.
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid
                    item
                    md={6}
                    p={{ lg: 3.75, md: 3.75, sm: 3.75, xs: 0 }}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '20px'
                    }}
                  >
                    <Avatar
                      className='blue-color'
                      sx={{
                        height: 80,
                        width: 80,
                        objectFit: 'contain'
                      }}
                    >
                      <Box component='img' src={HistoricalPlayback} sx={{ height: 50 }} />
                    </Avatar>

                    <Box>
                      <Typography
                        component={isMedium ? 'h5' : 'h4'}
                        fontWeight='bold'
                        py={1}
                      >
                        Historical Playback
                      </Typography>
                      <Typography component={isMedium ? 'h6' : 'h5'}>
                        Access historical tracking data to review past routes, analyze
                        driving patterns, and identify areas for improvement. Our platform
                        allows you to playback and analyze previous tracking information,
                        helping you make data-driven decisions to optimize performance.
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid
                    item
                    md={6}
                    p={{ lg: 3.75, md: 3.75, sm: 3.75, xs: 0 }}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '20px'
                    }}
                  >
                    <Avatar
                      className='blue-primary'
                      sx={{
                        height: 80,
                        width: 80,
                        objectFit: 'contain'
                      }}
                    >
                      <Box
                        component='img'
                        src={AlertsNotifications}
                        sx={{ height: 50 }}
                      />
                    </Avatar>

                    <Box>
                      <Typography
                        component={isMedium ? 'h5' : 'h4'}
                        fontWeight='bold'
                        py={1}
                      >
                        Alerts and Notifications
                      </Typography>
                      <Typography component={isMedium ? 'h6' : 'h5'}>
                        Set up customizable alerts and notifications to stay informed
                        about critical events such as unauthorized vehicle use, excessive
                        speed, maintenance reminders, and more. Take proactive measures to
                        prevent issues and ensure the safety and security of your assets.
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid
                    item
                    md={6}
                    p={{ lg: 3.75, md: 3.75, sm: 3.75, xs: 0 }}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '20px'
                    }}
                  >
                    <Avatar
                      className='blue-primary'
                      sx={{
                        height: 80,
                        width: 80,
                        objectFit: 'contain'
                      }}
                    >
                      <Box component='img' src={ReportsAnalytics} sx={{ height: 50 }} />
                    </Avatar>

                    <Box>
                      <Typography
                        component={isMedium ? 'h5' : 'h4'}
                        fontWeight='bold'
                        py={1}
                      >
                        Reports and Analytics
                      </Typography>
                      <Typography component={isMedium ? 'h6' : 'h5'}>
                        Generate detailed reports and analytics to gain valuable insights
                        into your operations. Analyze driving behavior, fuel consumption,
                        usage patterns, and other key metrics to optimize resources,
                        reduce costs, and make informed business decisions.
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid
                    item
                    md={6}
                    p={{ lg: 3.75, md: 3.75, sm: 3.75, xs: 0 }}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '20px'
                    }}
                  >
                    <Avatar
                      className='blue-color'
                      sx={{
                        height: 80,
                        width: 80,
                        objectFit: 'contain'
                      }}
                    >
                      <Box component='img' src={MobileApplications} sx={{ height: 50 }} />
                    </Avatar>

                    <Box>
                      <Typography
                        component={isMedium ? 'h5' : 'h4'}
                        fontWeight='bold'
                        py={1}
                      >
                        Mobile Applications
                      </Typography>
                      <Typography component={isMedium ? 'h6' : 'h5'}>
                        Stay connected and track your assets on the go with our
                        user-friendly mobile applications. Access the full range of
                        tracking features from your smartphone or tablet, ensuring
                        flexibility and convenience.
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Box>
                  <Typography component={isMedium ? 'h5' : 'h4'} py={3}>
                    At Yaantrac, we are committed to delivering reliable, user-friendly
                    tracking solutions that provide peace of mind and tangible benefits
                    for our customers. Our team of experts is dedicated to continuous
                    innovation and staying ahead of industry trends to meet your evolving
                    needs.
                  </Typography>
                  <Typography component={isMedium ? 'h5' : 'h4'} pb={3}>
                    Experience the power of Yaantrac and take control of your vehicles,
                    assets, or personal devices with confidence. Let us help you optimize
                    operations, enhance security, and gain valuable insights through our
                    advanced GPS-based tracking solutions.
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography
                component={isMedium ? 'h3' : 'h2'}
                my={2}
                fontWeight='bold'
                textAlign='center'
              >
                Who we are for ?
              </Typography>
              <Box>
                <Typography component={isMedium ? 'h6' : 'h5'} pb={2} textAlign='center'>
                  Transportation and Logistics | Ecommerce | Healthcare | Oil & Minning |
                  Food & Beverage | Hospitality and Tourism | Agriculture and Farming
                </Typography>
              </Box>
            </Box>

            <CardContainer />
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default AboutUs;
