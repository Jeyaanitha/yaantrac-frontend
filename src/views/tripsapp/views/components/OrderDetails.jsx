import React, { useEffect, useState } from 'react';
import { Box, Typography, Card } from '@mui/material';
import { createUseStyles } from 'react-jss';
import { Icon } from '@iconify/react';
import { OrderDetailsServices } from '../services/OrderDetailsServies';
import { epochConverter } from '../../../../utils/CommonFunctions';

const useStyles = createUseStyles({
  details: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#f1f7f8'
  },
  card: {
    width: '100%',
    marginBottom: '20px',
    padding: '10px',
    borderRadius: '10px',
    height: 'max-content',
    boxShadow: '0px 20px 50px 0px #DCE0F980',
    '& .css-1a48eka-MuiTypography-root': {
      fontSize: '13px'
    }
  },
  header: {
    color: '#3d3d3d',
    fontSize: '16px',
    fontWeight: '600'
  },
  cardComponent: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  iconsBg: {
    backgroundColor: '#f4f4f4',
    borderRadius: '50%',
    marginRight: '10px',
    width: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50px'
  },
  icons: {
    fontSize: '25px',
    color: '#64666b'
  },
  boxs: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '20px'
  },
  contant: {
    width: '75%'
  },
  title: {
    fontWeight: '500',
    fontSize: '20px',
    margin: '0 !important'
  },
  para: {
    margin: '0 !important',
    marginBottom: '5px',
    padding: '0'
  },
  listKey: {
    color: '#ababab',
    fontSize: '13px'
  },
  listItem: {
    color: '#22262c',
    fontSize: '13px'
  },
  footer: {
    padding: '10px',
    borderTop: '1px solid #ccc'
  }
});

const OrderDetails = ({ tripid }) => {
  // component style
  const styles = useStyles();

  //states
  const [tripsOrderDetails, setTripsOrderDetails] = useState();

  //get API for order details
  const getOrderDetails = async () => {
    let res = await OrderDetailsServices({ tripid: tripid });
    if (res?.status === 200) {
      setTripsOrderDetails(res?.data?.data);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <Box className={styles.details} sx={{ padding: { xs: '0', sm: '20px' } }}>
      {tripsOrderDetails?.map((items, index) => {
        return (
          <Card key={index} className={styles.card}>
            <Typography paragraph className={styles.header}>
              Order ID : # {items?.orderId}
            </Typography>
            <Box
              className={styles.cardComponent}
              sx={{ padding: { xs: '0', sm: '20px' } }}
            >
              <Box
                className={styles.boxs}
                sx={{ width: { xs: '100%', sm: '100%', md: '48%', lg: '30%' } }}
              >
                <Box className={styles.iconsBg}>
                  <Icon className={styles.icons} icon='bi:person' />
                </Box>
                <Box className={styles.contant}>
                  <Typography paragraph className={styles.title}>
                    Customer
                  </Typography>
                  <Typography paragraph className={styles.para}>
                    <span className={styles.listKey}> Name : </span>
                    <span className={styles.listItem}>{`${items?.customerName}`}</span>
                  </Typography>
                  <Typography paragraph className={styles.para}>
                    <span className={styles.listKey}> Email : </span>
                    <span className={styles.listItem}>{`${items?.customerEmail}`}</span>
                  </Typography>
                  <Typography paragraph className={styles.para}>
                    <span className={styles.listKey}> Phone : </span>
                    <span className={styles.listItem}>{`${items?.mobileNumber}`}</span>
                  </Typography>
                  <Typography paragraph className={styles.para}>
                    <span className={styles.listKey}> Address : </span>
                    <span className={styles.listItem}>{`${items?.deliveryAddress}`}</span>
                  </Typography>
                </Box>
              </Box>
              <Box
                className={styles.boxs}
                sx={{ width: { xs: '100%', sm: '100%', md: '48%', lg: '30%' } }}
              >
                <Box className={styles.iconsBg}>
                  <Icon className={styles.icons} icon='fluent:cart-24-regular' />
                </Box>
                <Box className={styles.contant}>
                  <Typography paragraph className={styles.title}>
                    Order Info
                  </Typography>
                  <Typography paragraph className={styles.para}>
                    <span className={styles.listKey}> No of items : </span>
                    <span className={styles.listItem}>{`${items?.noOfItems}`}</span>
                  </Typography>
                  <Typography paragraph className={styles.para}>
                    <span className={styles.listKey}> Payment method : </span>
                    <span className={styles.listItem}>{`${items?.paymentMode}`}</span>
                  </Typography>
                  <Typography paragraph className={styles.para}>
                    <span className={styles.listKey}> Total Price : </span>
                    <span className={styles.listItem}>{`${items?.totalPrice}`}</span>
                  </Typography>
                </Box>
              </Box>
              <Box
                className={styles.boxs}
                sx={{ width: { xs: '100%', sm: '100%', md: '48%', lg: '30%' } }}
              >
                <Box className={styles.iconsBg}>
                  <Icon className={styles.icons} icon='ic:outline-date-range' />
                </Box>
                <Box className={styles.contant}>
                  <Typography paragraph className={styles.title}>
                    Date Info
                  </Typography>
                  <Typography paragraph className={styles.para}>
                    <span className={styles.listKey}> Order Date : </span>
                    <span className={styles.listItem}>
                      {epochConverter(items?.orderDate / 1000)}
                    </span>
                  </Typography>
                  <Typography paragraph className={styles.para}>
                    <span className={styles.listKey}> Estimated Delivery Date : </span>
                    <span className={styles.listItem}>
                      {epochConverter(items?.estimatedDeliveryDate / 1000)}
                    </span>
                  </Typography>
                  <Typography paragraph className={styles.para}>
                    <span className={styles.listKey}> Actual Delivery Date : </span>
                    <span className={styles.listItem}>
                      {epochConverter(items?.actualDeliveryDate / 1000)}
                    </span>
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className={styles.footer}>
              <Typography paragraph className={styles.para}>
                <span
                  className={styles.listKey}
                  style={{ color: items?.status === 'DELIVERED' ? '#0EBC93' : '#485CF0' }}
                >
                  {' '}
                  Delivery Status :{' '}
                </span>
                <span className={styles.listItem}>{`${items?.status}`}</span>
              </Typography>
              {items?.status === 'CANCELLED' && (
                <Typography paragraph className={styles.para}>
                  <span className={styles.listKey} style={{ color: '#FF2532' }}>
                    {' '}
                    Remarks :{' '}
                  </span>
                  <span className={styles.listItem}>{`${items?.remarks}`}</span>
                </Typography>
              )}
            </Box>
          </Card>
        );
      })}
    </Box>
  );
};

export default OrderDetails;
