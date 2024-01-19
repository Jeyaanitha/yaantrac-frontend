import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from '../views/components/loaders/Loader';

const MyProfile = lazy(() => import('../views/user/myprofile/MyProfile'));
const Dashboard = lazy(() => import('../views/user/dashboard/Dashboard'));
const LiveStatus = lazy(() => import('../views/user/livestatus/LiveStatus'));
const LiveVehicleTracking = lazy(() =>
  import('../views/user/tracking/vehicle/LiveVehicleTracking')
);
const HistoricVehicleTracking = lazy(() =>
  import('../views/user/tracking/vehicle/HistoricVehicleTracking')
);
const CircularGeofence = lazy(() => import('../views/user/geofence/CircularGeofence'));
const Driver = lazy(() => import('../views/user/driver-details/Drivers'));
const DriverMapping=lazy(() => import('../views/user/driver-details/DriverMapping'));
const PolygonGeofence = lazy(() => import('../views/user/geofence/PolygonGeofence'));
const VehicleMapping = lazy(() => import('../views/user/geofence/VehicleMapping'));
const DistanceAndDuration = lazy(() =>
  import('../views/user/geofence/DistanceAndDuration')
);
const OfficeAndLandmark = lazy(() => import('../views/user/geofence/OfficeAndLandmark'));
const MyTrips = lazy(() => import('../views/user/trips/MyTrips'));
const KMReport = lazy(() => import('../views/user/reports/KMReport'));
const FuelUsageReport = lazy(() => import('../views/user/reports/FuelUsageReport'));
const FuelRefillReport = lazy(() => import('../views/user/reports/FuelRefillReport'));
const MileageReport = lazy(() => import('../views/user/reports/MileageReport'));
const EngineReport = lazy(() => import('../views/user/reports/EngineReport'));
const IdleReport = lazy(() => import('../views/user/reports/IdleReport'));
const MovementReport = lazy(() => import('../views/user/reports/MovementReport'));
const ParkingReport = lazy(() => import('../views/user/reports/ParkingReport'));
const OverallReport = lazy(() => import('../views/user/reports/OverallReport'));
const OverspeedReport = lazy(() => import('../views/user/reports/OverspeedReport'));
const AttendanceReport = lazy(() => import('../views/user/reports/AttendanceReport'));
const StoppageReport = lazy(() => import('../views/user/reports/StoppageReport'));
const SpeedviolationReport = lazy(() =>
  import('../views/user/reports/SpeedviolationReport')
);
const EagleView = lazy(() => import('../views/user/eagleview/EagleView'));

const PrivateRoute = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path='/myprofile' element={<MyProfile />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/livestatus' element={<LiveStatus />} />
      <Route path='/livevehicletracking' element={<LiveVehicleTracking />} />
      <Route path='/historicvehicletracking' element={<HistoricVehicleTracking />} />
      <Route path='/polygongeofence' element={<PolygonGeofence />} />
      <Route path='/circulargeofence' element={<CircularGeofence />} />
      <Route path='/driver' element={<Driver/>}/>
      <Route path='/drivermapping' element={<DriverMapping/>}/>
      <Route path='/vehiclemapping' element={<VehicleMapping />} />
      <Route path='/distanceandduration' element={<DistanceAndDuration />} />
      <Route path='/officeandlandmark' element={<OfficeAndLandmark />} />
      <Route path='/mytrips' element={<MyTrips />} />
      <Route path='/kmreport' element={<KMReport />} />
      <Route path='/fuelusagereport' element={<FuelUsageReport />} />
      <Route path='/fuelrefillreport' element={<FuelRefillReport />} />
      <Route path='/mileagereport' element={<MileageReport />} />
      <Route path='/enginereport' element={<EngineReport />} />
      <Route path='/idlereport' element={<IdleReport />} />
      <Route path='/movementreport' element={<MovementReport />} />
      <Route path='/parkingreport' element={<ParkingReport />} />
      <Route path='/overallreport' element={<OverallReport />} />
      <Route path='/overspeedreport' element={<OverspeedReport />} />
      <Route path='/stoppagereport' element={<StoppageReport />} />
      <Route path='/speedviolationreport' element={<SpeedviolationReport />} />
      <Route path='/attendancereport' element={<AttendanceReport Loader={Loader} />} />
      <Route path='/eagleview' element={<EagleView />} />
    </Routes>
  </Suspense>
);

export default PrivateRoute;
