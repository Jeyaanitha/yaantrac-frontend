// service
let serviceContext = null;
serviceContext = process.env.REACT_APP_SERVICE_CONTEXT;
export { serviceContext };

// URLs
const URLs = {
  // Authentication
  LOGIN: `user/login/web`,
  FORGOT_PASSWORD: `user/password/forgot?`,
  RESET_PASSWORD: `user/password/reset`,
  CHANGE_MOBILE: `user/change/mobile/num?`,
  CHANGE_EMAIL: `user/change/email?`,
  CHANGE_PASSWORD: `user/password/change`,

  // Profile
  MY_PROFILE: `user/profile`,
  UPDATE_MY_PROFILE: `user/update/profile`,
  ORGANIZATION_PROFILE: `user/organization/profile`,

  //Driver(profile)
  DRIVER_PROFILE: `driver/profile`,
  UPDATE_DRIVER_PROFILE: `driver/update`,
  ADD_DRIVER_PROFILE: `driver/add`,
  DEACTIVATE_DRIVER: `driver/deactivate?`,

  // Driver Mapping
  GET_DRIVER_MAPPING: `driver/mapping/getall`,
  GET_DRIVER_IDS_DROPDOWN: `driver/mapping/get/drivers`,
  GET_VEHICLE_NUMBER_DROPDOWN: `driver/mapping/get/vehicles`,
  ADD_DRIVER_MAPPING: `driver/mapping/add?`,
  UPDATE_DRIVER_MAPPING: `driver/mapping/update?`,
  DELETE_DRIVER_MAPPING: `driver/mapping/delete?`,

  // Vehicle Dashboard
  VEHICLE_DASHBOARD: `user/dashboard/vehicles`,
  VEHICLE_DASHBOARD_DEVICELIST: `user/dashboard/vehicle/status`,
  VEHICLE_DASHBOARD_LIVESUMMARY: `user/dashboard/live-summary/vehicles`,
  VEHICLE_DASHBOARD_BY_FILTER: `user/dashboard/vehicle?`,
  VEHICLE_DASHBOARD_BY_STATUS: `user/dashboard/get/vehicle/latandlng?`,

  // Sales Person Dashboard
  SALESPERSON_DASHBOARD: `user/dashboard/persons`,
  SALESPERSON_DASHBOARD_DEVICELIST: `user/dashboard/person/status`,
  SALESPERSON_DASHBOARD_LIVESUMMARY: `user/dashboard/live-summary/persons`,
  SALESPERSON_DASHBOARD_BY_STATUS: `user/dashboard/get/person/latandlng`,
  SALESPERSON_DASHBOARD_BY_FILTER: `user/dashboard/person?`,

  // Asset Dashboard
  ASSET_DASHBOARD: `user/dashboard/asset/status`,
  ASSET_DASHBOARD_DEVICELIST: `user/dashboard/assets/devicelist`,
  ASSET_DASHBOARD_LIVESUMMARY: `user/dashboard/live-summary/assets`,
  ASSET_DASHBOARD_BY_STATUS: `user/dashboard/get/asset/latandlng?`,
  ASSET_DASHBOARD_BY_FILTER: `user/dashboard/asset?`,

  // Employee Dashboard
  EMPLOYEE_DASHBOARD: `user/dashboard/employees`,
  EMPLOYEE_DASHBOARD_BY_STATUS: `user/dashboard/employees/status?`,

  // Live Status
  LIVE_STATUS: `user/livetracking/livestatus`,
  SEARCH_NEARBY_DEVICE: `user/livetracking/searchdevice?`,

  // Maps
  HISTORIC_VEHICLE_TRACKING: `user/historical/track/vehicle?`,
  HISTORIC_PERSON_LIST: `user/livetracking/persons`,
  HISTORIC_PERSON_TRACKING: `user/historical/track/person?`,
  HISTORIC_ASSETS_LIST: `user/livetracking/assetlist`,
  HISTORIC_ASSETS_TRACKING: `user/historical/track/asset?`,
  HISTORIC_VEHICLE_REPORT: `user/livetracking/historicvehicle?`,
  LIVE_VEHICLE_STATUS: `user/livetracking/vehicle/status`,
  LIVE_VEHICLE_TRACKING: `user/livetracking/livevehicletrack?`,
  LIVE_VEHICLE_ROUTE_DISTANCE: `user/livetracking/routedistance?`,
  LIVE_PERSON_STATUS: `user/livetracking/person/status`,
  LIVE_PERSON_TRACKING: `user/livepersontrack?`,
  LIVE_ASSET_STATUS: `user/livetracking/assetstatus`,
  LIVE_ASSET_TRACKING: `user/liveassettrack?`,
  EAGLE_VIEW: `user/livetracking/eagleeye`,
  GET_VEHICLE_ROUTE_PLAYBACK: `user/report/device/historical/routeplayback?`,

  // User Landmark
  USER_LANDMARK_DETAILS: `user/show/landmark`,
  ADD_USER_LANDMARK: `user/add/landmark`,
  UPDATE_USER_LANDMARK: `user/update/landmark`,
  DELETE_USER_LANDMARK: `user/delete/landmark`,

  //historic tracking user settings
  FETCH_TRAVELPATH: `user/historical/trippath`,
  FETCH_HISTROIC_VEHICLE_DETAILS: `user/historical/track/vehicle`,

  // User Landmark
  OFFICE_DETAILS: `user/show`,
  ADD_OFFICE: `user/add`,
  UPDATE_OFFICE: `user/update`,
  DELETE_OFFICE: `user/delete`,

  // Geofence
  GEOFENCE_DETAILS: `user/geofence/details?`,
  ADD_GEOFENCE: `user/geofence/add`,
  UPDATE_GEOFENCE: `user/geofence/update`,
  DEACTIVATE_GEOFENCE: `user/geofence`,

  // Device Mapping
  DEVICE_MAPPING_DETAILS: `user/devicemapping/details`,
  DEVICE_MAPPING_DEVICE_LIST: `user/devicemapping/devices`,
  ADD_DEVICE_MAPPING: `user/devicemapping/add?`,
  UPDATE_DEVICE_MAPPING: `user/devicemapping/update`,
  DELETE_DEVICE_MAPPING: `user/devicemapping/delete?`,

  // My Trips
  TRIP_DEVICE_LIST: `user/trip/device/details`,
  TRIP_DETAILS: `user/trip/details`,
  ADD_TRIP: `user/trip/add`,
  UPDATE_TRIP: `user/trip/update`,
  ACTIVATE_TRIP: `user/trip/active?`,
  DEACTIVATE_TRIP: `user/trip/deactivate?`,
  SHARE_TRIP: `user/trip/share?`,
  SHARE_LIVE_TRIP: `user/trip/sharelive`,

  // Employee Management
  EMPLOYEE_DETAILS: `user/employee/profiles`,
  UPDATE_EMPLOYEE_DETAILS: `user/employee/update`,
  SWITCH_TO_YAANSAFE_USER: `user/employee/switchto/yaansafe?`,
  DEACTIVATE_EMPLOYEE: `user/employee/deactivate?`,

  // Yaansafe User Management
  YAANSAFE_USER_DETAILS: `user/yaansafe/details`,
  UPDATE_YAANSAFE_USER_DETAILS: `user/yaansafe/update`,
  SWITCH_TO_EMPLOYEE: `user/yaansafe/switchto?`,
  DEACTIVATE_YAANSAFE_USER: `user/yaansafe/deactivate?`,

  // Reports
  DEVICE_LIST: `user/report/devices`,
  KM_REPORT: `user/report/km?`,
  FUEL_USAGE_REPORT: `user/report/fuelusage?`,
  FUEL_REFILL_REPORT: `user/report/fuelrefill?`,
  MILEAGE_REPORT: `user/report/mileage?`,
  MOVEMENT_REPORT: `user/report/movement/device?`,
  PARKING_REPORT: `user/report/parking/device?`,
  ATTENDANCE_REPORT: `attendance/attendancereportbydate?`,
  ENGINE_REPORT: `user/report/engine?`,
  OVERALL_REPORT: `user/report/overall?`,
  OVERSPEED_REPORT: `user/report/overspeed?`,
  IDLE_REPORT: `user/report/idle/device?`,
  SPEED_VIOLATION_REPORT: `user/historical/speedviolation`,
  STOPPAGE_REPORT: `user/report/stoppage?`,

  // Maps
  FETCH_HISTORIC_PERSON_LIST: `user/livetracking/personlist`,
  FETCH_HISTORIC_PERSON_TRACKING: `user/livetracking/historicpersontracking?`,
  FETCH_HISTORIC_ASSETS_TRACKING: `user/livetracking/historicassetstracking?`,
  FETCH_LIVE_VEHICLE_STATUS: `user/livetracking/vehiclestatus`,
  FETCH_LIVE_VEHICLE_ROUTE_DISTANCE: `user/livetracking/route/distance?`,
  FETCH_LIVE_PERSON_STATUS: `user/livetracking/personstatus`,
  FETCH_LIVE_PERSON_TRACKING: `user/livetracking/livepersontrack?`,
  FETCH_LIVE_ASSET_TRACKING: `user/livetracking/liveassettrack?`,

  //live vehicle tracking filter
  GET_VEHICLES_FOR_FILTER: `user/livetracking/devicelist`,

  //Historic vehicle tracking
  GET_SPEED_VIOLATION: `user/livetracking/getspeedviolation`,

  // Trips map
  GET_TRIPS_MAP: `api/tracking/get/optimized/route/orders?`,
  GET_TRIP_DETAILS: `api/tracking/list/all/trips`,

  //Khub order details
  KHUB_ORDERDETAILS: `api/tracking/get/trip/orders?`
};

export { URLs };
