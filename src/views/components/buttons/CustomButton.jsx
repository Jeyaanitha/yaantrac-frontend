import React from 'react';
import {
  Block,
  Check,
  CheckCircleOutline,
  Description,
  Login,
  Save,
  Upgrade,
  Search,
  NotInterested,
  FastForward,
  ThumbUpAlt,
  PictureAsPdf,
  TableView
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { makeStyles } from '@material-ui/core';
import MdcAccountEdit from '@meronex/icons/mdc/MdcAccountEdit';

const useStyles = makeStyles({
  edit: {
    textTransform: 'none !important',
    marginTop: '10px !important',
    borderRadius: '10px !important',
    color: '#fff !important',
    bgcolor: '#00769E !important',

    ':hover': {
      bgcolor: '#00769E !important',
      color: 'white !important'
    }
  },
  save: {
    textTransform: 'none !important',
    backgroundColor: '#00769E !important',
    borderRadius: '10px !important',
    fontSize: '12px !important',
    ':hover': {
      bgcolor: '#00769E !important',
      color: 'white !important'
    }
  },
  login: {
    textTransform: 'none !important',
    margin: '10px !important',
    width: '140px !important',
    borderRadius: '10px !important',
    backgroundColor: '#00769E !important',
    '&:hover': {
      backgroundColor: '#00769E !important'
    },
    fontWeight: 600
  },
  plotLocation: {
    textTransform: 'none !important',
    backgroundColor: '#00769E !important',
    borderRadius: '10px !important',
    fontSize: '12px !important',
    ':hover': {
      bgcolor: '#00769E !important',
      color: 'white !important'
    }
  },
  getReport: {
    backgroundColor: '#00769E !important',
    textTransform: 'none !important'
  },
  update: {
    textTransform: 'none !important',
    borderRadius: '10px !important',
    color: '#fff !important',
    bgcolor: '#00769E !important',
    ':hover': {
      bgcolor: '#00769E !important',
      color: 'white !important'
    }
  },
  cancel: {
    background: ' #F45E44 !important',
    borderRadius: '10px !important',
    color: '#fff !important',
    textTransform: 'capitalize !important',
    ':hover': {
      background: ' #F45E44 !important',
      borderRadius: '10px !important',
      color: '#fff !important'
    }
  },
  next: {
    borderRadius: '10px !important',
    textTransform: 'none !important'
  },
  search: {
    background: ' #00769E !important',
    borderRadius: '10px !important',
    color: '#fff',
    textTransform: 'none !important',
    ':hover': {
      background: ' #00769E !important',
      borderRadius: '10px !important',
      color: '#fff !important'
    }
  },
  reset: {
    borderRadius: '10px !important',
    textTransform: 'none !important'
  },
  plotLatLng: {
    textTransform: 'none !important',
    backgroundColor: '#00769E !important',
    borderRadius: '10px !important',
    fontSize: '12px !important',
    color: 'white !important',

    ':hover': {
      bgcolor: '#00769E !important',
      color: 'white !important'
    }
  },
  no: {
    textTransform: 'none !important',
    backgroundColor: '#F45E44 !important',
    ':hover': {
      bgcolor: '#F45E44 !important',
      color: 'white !important'
    }
  },
  ok: {
    borderRadius: '10px !important',
    textTransform: 'none !important'
  },
  download: {
    background: ' #00769E !important',
    borderRadius: '10px !important',
    color: '#fff',
    textTransform: 'none !important',
    ':hover': {
      background: ' #00769E !important',
      borderRadius: '10px !important',
      color: '#fff !important'
    }
  }
});

const CustomButton = ({ category, loading = false, ...rest }) => {
  const styles = useStyles();
  return (
    <LoadingButton
      className={
        category === 'Login'
          ? styles.login
          : category === 'Save'
          ? styles.save
          : category === 'Edit'
          ? styles.edit
          : category === 'Submit'
          ? styles.save
          : category === 'Plot Location'
          ? styles.plotLocation
          : category === 'Get Report'
          ? styles.getReport
          : category === 'Update'
          ? styles.update
          : category === 'Cancel'
          ? styles.cancel
          : category === 'Search'
          ? styles.search
          : category === 'Reset'
          ? styles.reset
          : category === 'Plot Lat/Lng'
          ? styles.plotLatLng
          : category === 'No'
          ? styles.no
          : category === 'Next'
          ? styles.next
          : category === 'Ok'
          ? styles.ok
          : category === 'Download as PDF'
          ? styles.download
          : category === 'Download as Excel'
          ? styles.download
          : null
      }
      variant={
        category === 'Login' ||
        category === 'Save' ||
        category === 'Submit' ||
        category === 'Plot Location' ||
        category === 'Get Report' ||
        category === 'Update' ||
        category === 'Yes' ||
        category === 'No' ||
        category === 'Search' ||
        category === 'PlotLatLng' ||
        category === 'Next' ||
        category === 'Ok' ||
        category === 'Edit'
          ? 'contained'
          : 'outlined'
      }
      size='small'
      color={
        category === 'Update' ? 'warning' : category === 'Reset' ? 'error' : 'primary'
      }
      startIcon={
        category === 'Login' ? (
          <Login />
        ) : category === 'Save' ? (
          <Save />
        ) : category === 'Submit' ? (
          <Check />
        ) : category === 'Get Report' ? (
          <Description />
        ) : category === 'Update' ? (
          <Upgrade />
        ) : category === 'Cancel' ? (
          <Block />
        ) : category === 'Yes' ? (
          <CheckCircleOutline />
        ) : category === 'Search' ? (
          <Search />
        ) : category === 'Reset' ? (
          <Block />
        ) : category === 'No' ? (
          <NotInterested />
        ) : category === 'Next' ? (
          <FastForward />
        ) : category === 'Edit' ? (
          <MdcAccountEdit />
        ) : category === 'Download as PDF' ? (
          <PictureAsPdf />
        ) : category === 'Download as Excel' ? (
          <TableView />
        ) : null
      }
      endIcon={category === 'Ok' && <ThumbUpAlt />}
      loading={loading}
      {...rest}
    >
      {category}
    </LoadingButton>
  );
};

export default CustomButton;
