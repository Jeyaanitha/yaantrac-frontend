import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Avatar, Button, Collapse, Box, List, ListItem, Typography } from '@mui/material';
import { ExpandLess, ExpandMore, Person } from '@mui/icons-material';
import { Icon } from '@iconify/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import assetIcon from '../../../app/images/asseticon.png';
import { makeStyles } from '@mui/styles';
import speedometer from '../../../app/images/km.png';
import gas from '../../../app/images/gas.png';
import fuelrefill from '../../../app/images/fuel-dispenser.png';
import milestone from '../../../app/images/milestone.png';
import engine from '../../../app/images/engine.png';
import attendance from '../../../app/images/calendar.png';
import speedviolation from '../../../app/images/speeding-violation.png';
import eagle from '../../../app/images/eagleview.png';

const isVehicle = true;
const isPerson = false;
const isAsset = false;
const isEmployee = false;
const isFuelSensor = false;
const isKMReport = true;
const isOver = true;

const useStyles = makeStyles({
  listItemButton: {
    color: '#FFF !important',
    textTransform: 'none !important',
    fontSize: '12px !important',
    justifyContent: 'flex-start !important'
  }
});

const UserDrawer = () => {
  // component styles
  const styles = useStyles();

  // get location
  const location = useLocation();

  // function to navigate
  const navigate = useNavigate();

  // get current pathname
  const { pathname } = location;

  // component state
  const [collapse, setCollapse] = useState({ type: 'tracking', show: false });
  const [collapseTracking, setCollapseTracking] = useState({
    type: 'vehicle',
    show: false
  });

  // function to navigate respective component
  const handleNavigate = route => {
    navigate(route);
  };

  useEffect(() => {
    localStorage.setItem('lastVisitedPage', pathname);
    if (pathname === '/assettracking') setCollapse({ type: 'tracking', show: true });
    else if (pathname === '/persontracking')
      setCollapse({ type: 'tracking', show: true });
    else if (
      pathname === '/livevehicletracking' ||
      pathname === '/historicvehicletracking'
    )
      setCollapse({ type: 'tracking', show: true });
    else if (
      pathname === '/circulargeofence' ||
      pathname === '/polygongeofence' ||
      pathname === '/vehiclemapping' ||
      pathname === '/officeandlandmark' ||
      pathname === '/distanceandduration'
    )
      setCollapse({ type: 'geofence', show: true });
    //driver pathname changing functions start
    else if (pathname === '/driver' || pathname === '/drivermapping')
      setCollapse({ type: 'driver', show: true });
    //driver pathname function end
    else if (
      pathname === '/kmreport' ||
      pathname === '/fuelusagereport' ||
      pathname === '/fuelrefillreport' ||
      pathname === '/mileagereport' ||
      pathname === '/enginereport' ||
      pathname === '/idlereport' ||
      pathname === '/movementreport' ||
      pathname === '/parkingreport' ||
      pathname === '/overallreport' ||
      pathname === '/overspeedreport' ||
      pathname === '/attendancereport' ||
      pathname === '/stoppagereport'
    )
      setCollapse({ type: 'reports', show: true });
    else setCollapse({ type: null, show: false });
  }, [location]);

  return (
    <List>
      <ListItem>
        <Button
          size='small'
          variant={pathname === '/dashboard' ? 'contained' : 'text'}
          startIcon={<Icon icon='bxs:dashboard' width='20' height='20' />}
          className={styles.listItemButton}
          fullWidth
          onClick={() => handleNavigate('/dashboard')}
        >
          Dashboard
        </Button>
      </ListItem>

      <ListItem>
        <Button
          size='small'
          variant={pathname === '/livestatus' ? 'contained' : 'text'}
          startIcon={<Icon icon='material-symbols:bar-chart' width='20' height='20' />}
          className={styles.listItemButton}
          fullWidth
          onClick={() => handleNavigate('/livestatus')}
        >
          Live Status
        </Button>
      </ListItem>

      <ListItem>
        <Button
          size='small'
          variant={
            pathname === '/assettracking' ||
            pathname === '/persontracking' ||
            pathname === '/livevehicletracking' ||
            pathname === '/historicvehicletracking'
              ? 'contained'
              : 'text'
          }
          startIcon={<Icon icon='ri:gps-fill' width='20' height='20' />}
          className={styles.listItemButton}
          fullWidth
          onClick={() => {
            if (collapse?.type === 'tracking') {
              setCollapse(prev => ({ type: 'tracking', show: !prev.show }));
            } else {
              setCollapse({ type: 'tracking', show: true });
            }
          }}
        >
          <Typography sx={{ fontSize: '12px' }}>Tracking</Typography>
          <Box sx={{ position: 'absolute', right: 0, top: 3 }}>
            {collapse.type === 'tracking' && collapse.show ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </Box>
        </Button>
      </ListItem>
      <Collapse
        in={collapse.type === 'tracking' && collapse.show}
        sx={{ paddingLeft: 2 }}
      >
        <List>
          {isVehicle && (
            <>
              {/*! vehicle below */}
              <ListItem>
                <Button
                  size='small'
                  variant={
                    pathname === '/assettracking' ||
                    pathname === '/persontracking' ||
                    pathname === '/livevehicletracking' ||
                    pathname === '/historicvehicletracking'
                      ? 'contained'
                      : 'text'
                  }
                  startIcon={
                    <Icon icon='fluent:vehicle-car-16-filled' width='20' height='20' />
                  }
                  className={styles.listItemButton}
                  fullWidth
                  onClick={() => {
                    if (collapseTracking?.type === 'vehicle') {
                      setCollapseTracking(prev => ({
                        type: 'vehicle',
                        show: !prev.show
                      }));
                    } else {
                      setCollapseTracking({ type: 'vehicle', show: true });
                    }
                  }}
                >
                  <Typography sx={{ fontSize: '12px' }}>Vehicle</Typography>
                  <Box sx={{ position: 'absolute', right: 0, top: 3 }}>
                    {collapseTracking.type === 'vehicle' && collapseTracking.show ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </Box>
                </Button>
              </ListItem>
              <Collapse
                in={collapseTracking.type === 'vehicle' && collapseTracking.show}
                sx={{ paddingLeft: 2 }}
              >
                <List>
                  <ListItem>
                    <Button
                      size='small'
                      variant={pathname === '/livevehicletracking' ? 'contained' : 'text'}
                      startIcon={
                        <Icon icon='fluent:live-24-filled' width='22' height='22  ' />
                      }
                      className={styles.listItemButton}
                      fullWidth
                      onClick={() => handleNavigate('/livevehicletracking')}
                    >
                      Live Tracking
                    </Button>
                  </ListItem>
                  {/* <ListItem>
                    <Button
                      size='small'
                      variant={
                        pathname === '/historicvehicletracking' ? 'contained' : 'text'
                      }
                      startIcon={<Icon icon='ic:round-history' width='22' height='22' />}
                      className={styles.listItemButton}
                      fullWidth
                      onClick={() => handleNavigate('/historicvehicletracking')}
                    >
                      Historic Tracking
                    </Button>
                  </ListItem> */}
                </List>
              </Collapse>
            </>
          )}

          {isAsset && (
            <ListItem>
              <Button
                size='small'
                variant={pathname === '/assettracking' ? 'contained' : 'text'}
                startIcon={
                  <Avatar
                    alt='asset'
                    src={assetIcon}
                    sx={{ height: '1em', width: '1em' }}
                    variant='square'
                  />
                }
                className={styles.listItemButton}
                fullWidth
                onClick={() => handleNavigate('/assettracking')}
              >
                Asset Tracking
              </Button>
            </ListItem>
          )}

          {isPerson && (
            <ListItem>
              <Button
                size='small'
                variant={pathname === '/persontracking' ? 'contained' : 'text'}
                startIcon={<Person />}
                className={styles.listItemButton}
                fullWidth
                onClick={() => handleNavigate('/persontracking')}
              >
                Person Tracking
              </Button>
            </ListItem>
          )}
        </List>
      </Collapse>

      <ListItem>
        <Button
          size='small'
          variant={
            pathname === '/circulargeofence' ||
            pathname === '/polygongeofence' ||
            pathname === '/vehiclemapping' ||
            pathname === '/officeandlandmark' ||
            pathname === '/distanceandduration'
              ? 'contained'
              : 'text'
          }
          startIcon={<Icon icon='fa6-solid:map-location-dot' width='20' height='20' />}
          className={styles.listItemButton}
          fullWidth
          onClick={() => {
            if (collapse?.type === 'geofence') {
              setCollapse(prev => ({ type: 'geofence', show: !prev.show }));
            } else {
              setCollapse({ type: 'geofence', show: true });
            }
          }}
        >
          <Typography sx={{ fontSize: '12px' }}>{`Geofence & Others`}</Typography>
          <Box sx={{ position: 'absolute', right: 0, top: 3 }}>
            {collapse.type === 'geofence' && collapse.show ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </Box>
        </Button>
      </ListItem>
      <Collapse
        in={collapse.type === 'geofence' && collapse.show}
        sx={{ paddingLeft: 2 }}
      >
        <List>
          <ListItem>
            <Button
              size='small'
              variant={pathname === '/circulargeofence' ? 'contained' : 'text'}
              startIcon={<Icon icon='ic:round-adjust' width='20' height='20' />}
              className={styles.listItemButton}
              fullWidth
              onClick={() => handleNavigate('/circulargeofence')}
            >
              {`Circular Geofence`}
            </Button>
          </ListItem>
          <ListItem>
            <Button
              size='small'
              variant={pathname === '/polygongeofence' ? 'contained' : 'text'}
              startIcon={<Icon icon='gis:modify-poly' width='20' height='20' />}
              className={styles.listItemButton}
              fullWidth
              onClick={() => handleNavigate('/polygongeofence')}
            >
              {`Polygon Geofence`}
            </Button>
          </ListItem>
          <ListItem>
            <Button
              size='small'
              variant={pathname === '/vehiclemapping' ? 'contained' : 'text'}
              startIcon={<Icon icon='tabler:device-mobile-pin' width='20' height='20' />}
              className={styles.listItemButton}
              fullWidth
              onClick={() => handleNavigate('/vehiclemapping')}
            >
              {`Vehicle Mapping`}
            </Button>
          </ListItem>
          <ListItem>
            <Button
              size='small'
              variant={pathname === '/officeandlandmark' ? 'contained' : 'text'}
              startIcon={
                <Icon icon='mdi:office-building-marker' width='20' height='20' />
              }
              className={styles.listItemButton}
              fullWidth
              onClick={() => handleNavigate('/officeandlandmark')}
            >
              {`Office & Landmark`}
            </Button>
          </ListItem>
          <ListItem>
            <Button
              size='small'
              variant={pathname === '/distanceandduration' ? 'contained' : 'text'}
              startIcon={<Icon icon='bx:trip' width='20' height='20' />}
              className={styles.listItemButton}
              fullWidth
              onClick={() => handleNavigate('/distanceandduration')}
            >
              {`Distance & Duration`}
            </Button>
          </ListItem>
        </List>
      </Collapse>
      {/* start to write the code of drivers functionality */}

      <ListItem>
        <Button
          size='small'
          variant={
            pathname === '/driver' || pathname === '/drivermapping' ? 'contained' : 'text'
          }
          startIcon={<AccountCircleIcon />}
          className={styles.listItemButton}
          fullWidth
          onClick={() => {
            if (collapse?.type === 'driver') {
              setCollapse(prev => ({ type: 'driver', show: !prev.show }));
            } else {
              setCollapse({ type: 'driver', show: true });
            }
          }}
        >
          <Typography sx={{ fontSize: '12px' }}>{`Drivers`}</Typography>
          <Box sx={{ position: 'absolute', right: 0, top: 3 }}>
            {collapse.type === 'driver' && collapse.show ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </Box>
        </Button>
      </ListItem>
      <Collapse in={collapse.type === 'driver' && collapse.show} sx={{ paddingLeft: 2 }}>
        <List>
          <ListItem>
            <Button
              size='small'
              variant={pathname === '/driver' ? 'contained' : 'text'}
              startIcon={<Icon icon='ic:round-adjust' width='20' height='20' />}
              className={styles.listItemButton}
              fullWidth
              onClick={() => handleNavigate('/driver')}
            >
              {`Driver`}
            </Button>
          </ListItem>
          <ListItem>
            <Button
              size='small'
              variant={pathname === '/drivermapping' ? 'contained' : 'text'}
              startIcon={<Icon icon='gis:modify-poly' width='20' height='20' />}
              className={styles.listItemButton}
              fullWidth
              onClick={() => handleNavigate('/drivermapping')}
            >
              {`Driver Mapping`}
            </Button>
          </ListItem>
        </List>
      </Collapse>

      {/* end code of drivers functionality */}
      {isVehicle && (
        <ListItem>
          <Button
            size='small'
            variant={pathname === '/mytrips' ? 'contained' : 'text'}
            startIcon={<Icon icon='mdi:map-marker-distance' width='20' height='20' />}
            className={styles.listItemButton}
            fullWidth
            onClick={() => handleNavigate('/mytrips')}
          >
            Trips
          </Button>
        </ListItem>
      )}

      <ListItem>
        <Button
          size='small'
          variant={
            pathname === '/kmreport' ||
            pathname === '/fuelusagereport' ||
            pathname === '/fuelrefillreport' ||
            pathname === '/mileagereport' ||
            pathname === '/stoppagereport' ||
            pathname === '/enginereport' ||
            pathname === '/idlereport' ||
            pathname === '/movementreport' ||
            pathname === '/parkingreport' ||
            pathname === '/overallreport' ||
            pathname === '/overspeedreport' ||
            pathname === '/attendancereport'
              ? 'contained'
              : 'text'
          }
          startIcon={<Icon icon='tabler:file-report' width='20' height='20' />}
          className={styles.listItemButton}
          fullWidth
          onClick={() => {
            if (collapse?.type === 'reports') {
              setCollapse(prev => ({ type: 'reports', show: !prev.show }));
            } else {
              setCollapse({ type: 'reports', show: true });
            }
          }}
        >
          <Typography sx={{ fontSize: '12px' }}>Reports</Typography>
          <Box sx={{ position: 'absolute', right: 0, top: 3 }}>
            {collapse.type === 'reports' && collapse.show ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </Box>
        </Button>
      </ListItem>
      <Collapse in={collapse.type === 'reports' && collapse.show} sx={{ paddingLeft: 2 }}>
        <List>
          {isKMReport && (
            <ListItem>
              <Button
                size='small'
                variant={pathname === '/kmreport' ? 'contained' : 'text'}
                startIcon={
                  <Avatar
                    src={speedometer}
                    sx={{ height: '1.2em', width: '1.2em' }}
                    variant='square'
                  />
                }
                className={styles.listItemButton}
                fullWidth
                onClick={() => handleNavigate('/kmreport')}
              >
                KM Report
              </Button>
            </ListItem>
          )}
          {isFuelSensor && (
            <>
              <ListItem>
                <Button
                  size='small'
                  variant={pathname === '/fuelusagereport' ? 'contained' : 'text'}
                  startIcon={
                    <Avatar
                      src={gas}
                      sx={{ height: '1.2em', width: '1.2em' }}
                      variant='square'
                    />
                  }
                  className={styles.listItemButton}
                  fullWidth
                  onClick={() => handleNavigate('/fuelusagereport')}
                >
                  Fuel Usage Report
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  size='small'
                  variant={pathname === '/fuelrefillreport' ? 'contained' : 'text'}
                  startIcon={
                    <Avatar
                      src={fuelrefill}
                      sx={{ height: '1.2em', width: '1.2em' }}
                      variant='square'
                    />
                  }
                  className={styles.listItemButton}
                  fullWidth
                  onClick={() => handleNavigate('/fuelrefillreport')}
                >
                  Fuel Refill Report
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  size='small'
                  variant={pathname === '/mileagereport' ? 'contained' : 'text'}
                  startIcon={
                    <Avatar
                      src={milestone}
                      sx={{ height: '1.2em', width: '1.2em' }}
                      variant='square'
                    />
                  }
                  className={styles.listItemButton}
                  fullWidth
                  onClick={() => handleNavigate('/mileagereport')}
                >
                  Mileage Report
                </Button>
              </ListItem>
            </>
          )}
          <ListItem>
            <Button
              size='small'
              variant={pathname === '/stoppagereport' ? 'contained' : 'text'}
              startIcon={
                <Avatar
                  src={speedviolation}
                  sx={{ height: '1.2em', width: '1.2em' }}
                  variant='square'
                />
              }
              className={styles.listItemButton}
              fullWidth
              onClick={() => handleNavigate('/stoppagereport')}
            >
              Stoppage Report
            </Button>
          </ListItem>

          <ListItem>
            <Button
              size='small'
              variant={pathname === '/enginereport' ? 'contained' : 'text'}
              startIcon={
                <Avatar
                  src={engine}
                  sx={{ height: '1.2em', width: '1.2em' }}
                  variant='square'
                />
              }
              className={styles.listItemButton}
              fullWidth
              onClick={() => handleNavigate('/enginereport')}
            >
              Engine Report
            </Button>
          </ListItem>

          <ListItem>
            <Button
              size='small'
              variant={pathname === '/idlereport' ? 'contained' : 'text'}
              startIcon={<Icon icon='mdi:timer-cog' width='20' height='20' />}
              className={styles.listItemButton}
              fullWidth
              onClick={() => handleNavigate('/idlereport')}
            >
              Idle Report
            </Button>
          </ListItem>
          <ListItem>
            <Button
              size='small'
              variant={pathname === '/movementreport' ? 'contained' : 'text'}
              startIcon={<Icon icon='mdi:truck-fast' width='20' height='20' />}
              className={styles.listItemButton}
              fullWidth
              onClick={() => handleNavigate('/movementreport')}
            >
              Movement Report
            </Button>
          </ListItem>
          <ListItem>
            <Button
              size='small'
              variant={pathname === '/parkingreport' ? 'contained' : 'text'}
              startIcon={<Icon icon='fa-solid:parking' width='20' height='20' />}
              className={styles.listItemButton}
              fullWidth
              onClick={() => handleNavigate('/parkingreport')}
            >
              Parking Report
            </Button>
          </ListItem>

          {isOver && (
            <>
              <ListItem>
                <Button
                  size='small'
                  variant={pathname === '/overallreport' ? 'contained' : 'text'}
                  startIcon={<Icon icon='ph:files-fill' width='24' height='24' />}
                  className={styles.listItemButton}
                  fullWidth
                  onClick={() => handleNavigate('/overallreport')}
                >
                  Overall Report
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  size='small'
                  variant={pathname === '/overspeedreport' ? 'contained' : 'text'}
                  startIcon={
                    <Icon
                      icon='fluent:fast-acceleration-20-filled'
                      width='24'
                      height='24'
                    />
                  }
                  className={styles.listItemButton}
                  fullWidth
                  onClick={() => handleNavigate('/overspeedreport')}
                >
                  Overspeed Report
                </Button>
              </ListItem>
            </>
          )}
          {isEmployee && (
            <ListItem>
              <Button
                size='small'
                variant={pathname === '/attendancereport' ? 'contained' : 'text'}
                startIcon={
                  <Avatar
                    src={attendance}
                    sx={{ height: '1.2em', width: '1.2em' }}
                    variant='square'
                  />
                }
                className={styles.listItemButton}
                fullWidth
                onClick={() => handleNavigate('/attendancereport')}
              >
                Attendance Report
              </Button>
            </ListItem>
          )}
        </List>
      </Collapse>

      <ListItem>
        <Button
          size='small'
          variant={pathname === '/eagleview' ? 'contained' : 'text'}
          startIcon={
            <Avatar
              alt='asset'
              src={eagle}
              sx={{ height: '1.2em', width: '1.2em' }}
              variant='square'
            />
          }
          className={styles.listItemButton}
          fullWidth
          onClick={() => handleNavigate('/eagleview')}
        >
          Eagle View
        </Button>
      </ListItem>
    </List>
  );
};

export default UserDrawer;
