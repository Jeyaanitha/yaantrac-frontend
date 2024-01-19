import React from 'react';
import { Avatar, Tooltip, Zoom } from '@mui/material';
import strong from '../../../../app/images/strong.png';
import good from '../../../../app/images/good.png';
import medium from '../../../../app/images/medium.png';
import poor from '../../../../app/images/poor.png';
import verypoor from '../../../../app/images/verypoor.png';

const SignalStrength = ({ strength }) => {
  return (
    <Tooltip
      arrow
      TransitionComponent={Zoom}
      placement='right'
      title={
        strength === 'strong'
          ? 'Strong'
          : strength === 'good'
          ? 'Good'
          : strength === 'medium'
          ? 'Medium'
          : strength === 'poor'
          ? 'Poor'
          : 'Very Poor'
      }
    >
      <Avatar
        src={
          strength === 'strong'
            ? strong
            : strength === 'good'
            ? good
            : strength === 'medium'
            ? medium
            : strength === 'poor'
            ? poor
            : verypoor
        }
        sx={{ height: '1.5em', width: '1.5em' }}
      />
    </Tooltip>
  );
};

export default SignalStrength;
