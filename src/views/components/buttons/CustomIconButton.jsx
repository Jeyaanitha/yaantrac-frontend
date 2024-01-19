import React from 'react';
import {
  Add,
  Block,
  Close,
  Delete,
  Description,
  Edit,
  Info,
  Mail,
  Place,
  Share,
  Visibility,
  MyLocation as Track
} from '@mui/icons-material';
import { IconButton, Tooltip, Zoom } from '@mui/material';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  share: {
    backgroundColor: '#00769E !important',
    color: '#FFF !important'
  },
  close: {
    backgroundColor: '#00769E !important',
    color: '#fff !important',
    padding: '3px !important'
  },
  whiteClose: {
    backgroundColor: '#FFF !important',
    color: '#00769E !important',
    height: '1.2em !important',
    width: '1.2em !important',
    margin: '5px !important'
  },
  mapView: {
    color: '#fff !important',
    backgroundColor: '#00769E !important',
    padding: '3px !important'
  },
  reportView: {
    color: '#fff !important',
    backgroundColor: '#00769E !important',
    padding: '3px !important'
  },
  mail: {
    color: 'white !important',
    width: '26px !important'
  },
  view: {
    backgroundColor: '#00769E !important',
    color: '#fff !important',
    padding: '3px !important'
  },
  add: {
    backgroundColor: '#00769E !important',
    color: '#fff !important',
    padding: '3px !important'
  },
  edit: {
    backgroundColor: '#f57c00 !important',
    color: '#fff !important',
    padding: '3px !important'
  },
  delete: {
    backgroundColor: '#d32f2f !important',
    color: '#fff !important',
    padding: '3px !important'
  },
  deactivate: {
    backgroundColor: '#d32f2f !important',
    color: '#fff !important',
    padding: '3px !important'
  },
  activate: {
    backgroundColor: '#388e3c !important',
    color: '#fff !important',
    padding: '3px !important'
  },
  info: {
    color: 'black !important'
  },
  track: {
    backgroundColor: '#00769E !important',
    color: '#fff !important',
    padding: '3px !important'
  },
  disabled: {
    opacity: 0.5,
    pointerEvents: 'none'
  }
});

function CustomIconButton({ category, loading = false, disabled = false, ...rest }) {
  const styles = useStyles();
  return (
    <Tooltip
      arrow
      TransitionComponent={Zoom}
      title={category === 'White Close' ? 'Close' : category}
    >
      <IconButton
        className={`${disabled ? styles?.disabled : ''} ${
          category === 'Close'
            ? styles.close
            : category === 'White Close'
            ? styles.whiteClose
            : category === 'Map View'
            ? styles.mapView
            : category === 'Report View'
            ? styles.reportView
            : category === 'Mail'
            ? styles.mail
            : category === 'View'
            ? styles.view
            : category === 'Edit'
            ? styles.edit
            : category === 'Delete'
            ? styles.delete
            : category === 'Deactivate'
            ? styles.deactivate
            : category === 'Activate'
            ? styles.activate
            : category === 'Info'
            ? styles.info
            : category === 'Share'
            ? styles.share
            : category === 'Add'
            ? styles.add
            : category === 'Track'
            ? styles.track
            : null
        } `}
        disabled={disabled}
        {...rest}
      >
        {category === 'Close' || category === 'White Close' ? (
          <Close />
        ) : category === 'Map View' ? (
          <Place />
        ) : category === 'Report View' ? (
          <Description />
        ) : category === 'Mail' ? (
          <Mail />
        ) : category === 'View' ? (
          <Visibility />
        ) : category === 'Edit' ? (
          <Edit />
        ) : category === 'Delete' ? (
          <Delete />
        ) : category === 'Deactivate' || category === 'Activate' ? (
          <Block />
        ) : category === 'Info' ? (
          <Info />
        ) : category === 'Share' ? (
          <Share />
        ) : category === 'Add' ? (
          <Add />
        ) : category === 'Track' ? (
          <Track />
        ) : null}
      </IconButton>
    </Tooltip>
  );
}

export default CustomIconButton;
