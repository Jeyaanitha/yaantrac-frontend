import { Card, CardContent, CardMedia, Collapse, Typography } from '@mui/material';
import { createUseStyles } from 'react-jss';

import React from 'react';

const useStyles = createUseStyles({
  root: {
    margin: '20px',
    height: '420px'
  },
  media: {
    height: 200
  },
  title: {
    fontSize: '20px !important',
    fontWeight: 'bold',
    color: '#db2966',
    textAlign: 'center'
  },
  desc: {
    fontSize: '10px',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

function ImageCards({ img, title, desc, checked }) {
  const classes = useStyles();
  return (
    <Collapse in={checked} {...(checked ? { timeout: 3000 } : {})}>
      <Card className={classes.root} elevation={12}>
        <CardMedia component='img' className={classes.media} image={img} title={title} />
        <CardContent>
          <Typography gutterBottom component='h5' className={classes.title}>
            {title}
          </Typography>
          <Typography gutterBottom component='h6' className={classes.desc}>
            {desc}
          </Typography>
        </CardContent>
      </Card>
    </Collapse>
  );
}

export default ImageCards;
