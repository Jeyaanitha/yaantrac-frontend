import {
  USER_ID,
  CENTER,
  CIRCULAR_GEOFENCE,
  POLYGON_GEOFENCE,
  DOUBLE_MARKER,
  MARKER_POSITION,
  MARKERS,
  MYOFFICE_USERLANDMARK,
  INFO_WINDOW,
  TOAST,
  ZOOM
} from '../types/actionTypes';

export const updateUserID = payload => ({ type: USER_ID, payload });

export const updateCircularGeofence = payload => ({ type: CIRCULAR_GEOFENCE, payload });

export const updatePolygonGeofence = payload => ({ type: POLYGON_GEOFENCE, payload });

export const updateMarkerPosition = center => ({ type: MARKER_POSITION, center });

export const updateDoubleMarker = payload => ({
  type: DOUBLE_MARKER,
  payload
});

export const updateCenter = payload => ({ type: CENTER, payload });

export const updateZoom = payload => ({ type: ZOOM, payload });

export const updateMarkers = payload => ({ type: MARKERS, payload });

export const updateMyOfficeUserLandmark = payload => ({
  type: MYOFFICE_USERLANDMARK,
  payload
});

export const updateInfoWindow = payload => ({ type: INFO_WINDOW, payload });

export const updateToast = payload => ({ type: TOAST, payload });
