import React from 'react';
import ImageCards from './ImageCards';
import useWindowPosition from '../../hooks/useWindowPosition';
import img1 from '../../app/images/notification.jpg';
import img2 from '../../app/images/reporting.png';
import { Grid } from '@mui/material';

function Cards() {
  const checked = useWindowPosition('header');

  const cardDetails = [
    {
      img: img1,
      title: 'Location Tracking & Geo-Fencing',
      description:
        'You can track live location of the vehicles/assets or download and view previous routes whenever you need. This also includes speed distance, fuel and oil.'
    },
    {
      img: img2,
      title: 'Maintenance',
      description:
        'Get reminders when your vehicles/assets is due for service or needs renewal of the documents. Also view nearby service centres, petrol bunks and toll booths.'
    },
    {
      img: img1,
      title: 'Reporting And Cost',
      description:
        'Get reports on the performance and maintenance of the vehicles/assets. With built in expense track you can keep account of all your expenditure.'
    },
    {
      img: img2,
      title: 'Notification',
      description:
        'Receive alerts/get notified via push notifications/SMS/email about important events such as Geo-Fence Entry/Exit, Overspeed, Document renewal, Device of Alert'
    }
  ];

  return (
    <div id='header'>
      <Grid
        container
        sx={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {cardDetails.map((item, index) => {
          return (
            <Grid item key={index} lg={3} md={6}>
              <ImageCards
                img={item.img}
                title={item.title}
                desc={item.description}
                checked={checked}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Cards;
