import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { requestPermission, onMessageListener } from '../firebase';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  customtoast: {
    paddingTop: '1%'
  }
});

function Notification() {
  //component style
  const styles = useStyles();

  //component state
  const [notification, setNotification] = useState({ title: '', body: '' });

  useEffect(() => {
    requestPermission();

    const unsubscribe = onMessageListener().then(payload => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body
      });

      toast.success(
        <div>
          <p
            style={{
              fontFamily: 'inter !important',
              fontSize: '15px !important',
              fontWeight: 'bold'
            }}
          >
            {payload?.notification?.title}
          </p>
          <p style={{ color: 'black' }}>{payload?.notification?.body}</p>
        </div>,
        {
          className: styles.customtoast,
          duration: 3000,
          position: 'bottom-right'
        }
      );
    });
    return () => {
      unsubscribe.catch(err => console.log('failed: ', err));
    };
  }, [notification]);

  return <Toaster />;
}

export default Notification;
