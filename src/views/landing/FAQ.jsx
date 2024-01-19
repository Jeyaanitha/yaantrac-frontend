import React, { useState } from 'react';
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary, Tabs, Tab } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  selectedTab: {
    textDecoration: 'none',
    width: '170px',
    textTransform: 'capitalize',
    border: '1px solid #00769E !important',
    borderRadius: '10px !important',
    display: 'grid',
    gridGap: '10px',
    color: '#000 !important',
    '&.Mui-selected': {
      backgroundColor: '#00769E',
      color: 'white !important',
      borderRadius: '10px',
      border: '1px solid #00769E !important',
      filter: 'drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.25))'
    }
  },
  tabList: {
    '& .MuiTabs-flexContainer': {
      justifyContent: 'center !important',
      display: 'flex !important',
      flexWrap: 'wrap',
      gap: '10px'
    }
  },
  expandIcon: {
    color: '#00769E'
  },
  faqList: {
    borderImage:
      'linear-gradient(180deg, transparent 0%, #00769e 0%, transparent 100%) 1 100% !important'
  },
  heading: {
    fontWeight: 'bold !important',
    textAlign: 'center'
  }
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const FAQ = () => {
  const [expanded, setExpanded] = useState('panel1');
  const [tab, setTab] = useState(0);
  const styles = useStyles();
  const customTheme = useTheme();
  const isSmall = useMediaQuery(customTheme.breakpoints.down('md'));

  //Function to Open and Close Accordion Tabs
  const handleChange = panel => newExpanded => {
    if (panel === expanded) {
      setExpanded(false);
    } else {
      setExpanded(newExpanded ? panel : false);
    }
  };

  //Function to Tabs Features
  const handleTabs = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box marginTop={5} mb={5}>
      <Grid container>
        <Grid
          item
          md={2}
          sx={{
            display: {
              md: 'block',
              sm: 'none'
            }
          }}
        ></Grid>
        <Grid item lg={8} md={8} sx={isSmall ? { padding: '10px' } : { padding: 0 }}>
          <Typography component='h3' className={`${styles.heading} black-color`} my={2}>
            FAQ
          </Typography>

          <Tabs
            value={tab}
            className={styles.tabList}
            onChange={handleTabs}
            TabIndicatorProps={{
              style: {
                display: 'none'
              }
            }}
            sx={{ p: 1 }}
          >
            <Tab label='Usage' className={styles.selectedTab} />
            <Tab label='Payments' className={styles.selectedTab} />
            <Tab label='Tracking' className={styles.selectedTab} />
            <Tab label='Reports' className={styles.selectedTab} />
          </Tabs>
          <TabPanel value={tab} index={0}>
            <div className='accordion-box-shadow'>
              <Accordion
                className={
                  expanded === 'panel1'
                    ? `underlineFaqList ${styles.faqList}`
                    : 'underlineFaqList'
                }
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
                sx={{
                  borderLeft: expanded === 'panel1' && '4px solid #00769e'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
                  aria-controls='panel1d-content'
                  id='panel1d-header'
                >
                  <Typography component='h5' fontWeight='bold'>
                    Why Yaantrac?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component='h5'>
                    Track all your vehicles & assets in one place anytime anywhere Reduces
                    paperwork by offering document management
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className='accordion-box-shadow'>
              <Accordion
                className={
                  expanded === 'panel2'
                    ? `underlineFaqList ${styles.faqList}`
                    : 'underlineFaqList'
                }
                expanded={expanded === 'panel2'}
                onChange={handleChange('panel2')}
                sx={{
                  borderLeft: expanded === 'panel2' && '4px solid #00769e'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
                  aria-controls='panel2d-content'
                  id='panel2d-header'
                >
                  <Typography component='h5' fontWeight='bold'>
                    How it Works?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component='h5'>
                    With our GPS Tracking Software, you can track your vehicles/assets,
                    manage documents, mobile alerts and show geo fenced area of vehicle
                    continuously on a Google Map. We provide reporting and alerting on all
                    of the common vehicle tracking metrics such as speed, location,
                    heading, journey history, idling time, parking time, movement time.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className='accordion-box-shadow'>
              <Accordion
                className={
                  expanded === 'panel3'
                    ? `underlineFaqList ${styles.faqList}`
                    : 'underlineFaqList'
                }
                expanded={expanded === 'panel3'}
                onChange={handleChange('panel3')}
                sx={{
                  borderLeft: expanded === 'panel3' && '4px solid #00769e'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
                  aria-controls='panel3d-content'
                  id='panel3d-header'
                >
                  <Typography component='h5' fontWeight='bold'>
                    How to use?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component='h5'>
                    Install the device and start tracking them online using our app or Web
                    portal.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
            <div className='accordion-box-shadow'>
              <Accordion
                className={
                  expanded === 'panel4'
                    ? `underlineFaqList ${styles.faqList}`
                    : 'underlineFaqList'
                }
                expanded={expanded === 'panel4'}
                onChange={handleChange('panel4')}
                sx={{
                  borderLeft: expanded === 'panel4' && '4px solid #00769e'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
                  aria-controls='panel4d-content'
                  id='panel4d-header'
                >
                  <Typography component='h5' fontWeight='bold'>
                    How will I be charged?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component='h5'>
                    You will be Charged one time for device and installation. First year
                    is free then you will have to spend small amount monthly/yearly for
                    maintenance
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <div className='accordion-box-shadow'>
              <Accordion
                className={
                  expanded === 'panel5'
                    ? `underlineFaqList ${styles.faqList}`
                    : 'underlineFaqList'
                }
                expanded={expanded === 'panel5'}
                onChange={handleChange('panel5')}
                sx={{
                  borderLeft: expanded === 'panel5' && '4px solid #00769e'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
                  aria-controls='panel1d-content'
                  id='panel1d-header'
                >
                  <Typography component='h5' fontWeight='bold'>
                    What payment methods are available for the GPS tracking device?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component='h5'>
                    We offer multiple payment methods to ensure convenience for our
                    customers. Users can pay for the GPS tracking device using credit
                    cards, debit cards, PayPal, or bank transfers.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <div className='accordion-box-shadow'>
              <Accordion
                className={
                  expanded === 'panel6'
                    ? `underlineFaqList ${styles.faqList}`
                    : 'underlineFaqList'
                }
                expanded={expanded === 'panel6'}
                onChange={handleChange('panel6')}
                sx={{
                  borderLeft: expanded === 'panel6' && '4px solid #00769e'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
                  aria-controls='panel1d-content'
                  id='panel1d-header'
                >
                  <Typography component='h5' fontWeight='bold'>
                    Can a GPS tracking device be installed covertly?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component='h5'>
                    Yes, many GPS tracking devices are designed to be installed covertly,
                    allowing discreet tracking without the knowledge of the vehicle's
                    occupants or unauthorized individuals. These devices are often
                    compact, easily concealable, and can be placed in hidden locations
                    within the vehicle or asset.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>

            <div className='accordion-box-shadow'>
              <Accordion
                className={
                  expanded === 'panel7'
                    ? `underlineFaqList ${styles.faqList}`
                    : 'underlineFaqList'
                }
                expanded={expanded === 'panel7'}
                onChange={handleChange('panel7')}
                sx={{
                  borderLeft: expanded === 'panel7' && '4px solid #00769e'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
                  aria-controls='panel1d-content'
                  id='panel1d-header'
                >
                  <Typography component='h5' fontWeight='bold'>
                    What are the steps involved in setting up a GPS tracking device?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component='h5'>
                    Choose a suitable GPS tracking device and activate it by following the
                    manufacturer's instructions. Install the device in the desired
                    location, ensure it has a clear view of the sky, and configure any
                    necessary settings or parameters.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>

            <div className='accordion-box-shadow'>
              <Accordion
                className={
                  expanded === 'panel8'
                    ? `underlineFaqList ${styles.faqList}`
                    : 'underlineFaqList'
                }
                expanded={expanded === 'panel8'}
                onChange={handleChange('panel8')}
                sx={{
                  borderLeft: expanded === 'panel8' && '4px solid #00769e'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
                  aria-controls='panel1d-content'
                  id='panel1d-header'
                >
                  <Typography component='h5' fontWeight='bold'>
                    Can I track multiple GPS tracking devices from a single account?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component='h5'>
                    Yes, our GPS tracking devices and platforms allow you to track
                    multiple devices simultaneously from a single account. This feature
                    will be useful for fleet management or monitoring multiple assets.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>

            <div className='accordion-box-shadow'>
              <Accordion
                className={
                  expanded === 'panel9'
                    ? `underlineFaqList ${styles.faqList}`
                    : 'underlineFaqList'
                }
                expanded={expanded === 'panel9'}
                onChange={handleChange('panel9')}
                sx={{
                  borderLeft: expanded === 'panel9' && '4px solid #00769e'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
                  aria-controls='panel1d-content'
                  id='panel1d-header'
                >
                  <Typography component='h5' fontWeight='bold'>
                    How often does a GPS tracking device update its location?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component='h5'>
                    The update frequency can be customized based on the device's settings.
                    The GPS tracking devices allow you to choose the tracking interval,
                    which determines how often the device sends its location data to the
                    server or app.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </TabPanel>
          <TabPanel value={tab} index={3}>
            <div className='accordion-box-shadow'>
              <Accordion
                className={
                  expanded === 'panel10'
                    ? `underlineFaqList ${styles.faqList}`
                    : 'underlineFaqList'
                }
                expanded={expanded === 'panel10'}
                onChange={handleChange('panel10')}
                sx={{
                  borderLeft: expanded === 'panel10' && '4px solid #00769e'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
                  aria-controls='panel1d-content'
                  id='panel1d-header'
                >
                  <Typography component='h5' fontWeight='bold'>
                    How does up-to-date report generation on dashboards work?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component='h5'>
                    Up-to-date report generation on dashboards involves collecting data
                    from sources, such as GPS tracking devices, sensors, or databases.
                    This data is then processed and analyzed to generate meaningful
                    reports, which are displayed on the Yaantrac dashboard in a visual
                    format, such as charts, graphs, or tables.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>

            <div className='accordion-box-shadow'>
              <Accordion
                className={
                  expanded === 'panel11'
                    ? `underlineFaqList ${styles.faqList}`
                    : 'underlineFaqList'
                }
                expanded={expanded === 'panel11'}
                onChange={handleChange('panel11')}
                sx={{
                  borderLeft: expanded === 'panel11' && '4px solid #00769e'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
                  aria-controls='panel1d-content'
                  id='panel1d-header'
                >
                  <Typography component='h5' fontWeight='bold'>
                    How to access the reports?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component='h5'>
                    Reports on dashboards can be accessed through various means, such as
                    web-based platforms, mobile applications. Users with appropriate
                    credentials can log in and view the reports from any device with
                    internet connectivity.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>

            <div className='accordion-box-shadow'>
              <Accordion
                className={
                  expanded === 'panel12'
                    ? `underlineFaqList ${styles.faqList}`
                    : 'underlineFaqList'
                }
                expanded={expanded === 'panel12'}
                onChange={handleChange('panel12')}
                sx={{
                  borderLeft: expanded === 'panel12' && '4px solid #00769e'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
                  aria-controls='panel1d-content'
                  id='panel1d-header'
                >
                  <Typography component='h5' fontWeight='bold'>
                    What are the advantages of live report generation on dashboards for
                    GPS tracking?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component='h5'>
                    The advantages of live report generation on dashboards for GPS
                    tracking include instant access to critical information, better
                    decision-making based on real-time data, the ability to identify
                    patterns or trends, efficient monitoring of multiple assets
                    simultaneously, and the ability to share relevant information with
                    stakeholders easily.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </TabPanel>
        </Grid>
        <Grid item md={2} sx={{ display: { md: 'block', sm: 'none' } }}></Grid>
      </Grid>
    </Box>
  );
};

export default FAQ;
