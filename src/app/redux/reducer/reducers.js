import {
  USER_ID,
  LOCATION,
  CIRCULAR_GEOFENCE,
  POLYGON_GEOFENCE,
  MARKER_POSITION,
  DOUBLE_MARKER,
  CENTER,
  MARKERS,
  MYOFFICE_USERLANDMARK,
  INFO_WINDOW,
  ZOOM,
  TOAST
} from '../types/actionTypes';

const intialState = {
  toast: { show: false },
  center: { lat: 13.0827, lng: 80.2707 },
  zoom: 10,
  circularGeofence: {
    center: { lat: 13.0827, lng: 80.2707 },
    radius: 5000,
    color: '#FFF'
  }
};

const reducers = (state = intialState, action) => {
  switch (action.type) {
    case USER_ID:
      return { ...state, userID: action.payload };

    case LOCATION:
      return { ...state, location: action.location };

    case CIRCULAR_GEOFENCE:
      return { ...state, circularGeofence: action.payload };

    case POLYGON_GEOFENCE:
      return { ...state, polygonGeofence: action.payload };

    case MARKER_POSITION:
      return { ...state, markerPosition: action.center };

    case DOUBLE_MARKER:
      return { ...state, updateDoubleMarker: action.payload };

    case CENTER:
      return { ...state, center: action.payload };

    case ZOOM:
      return { ...state, zoom: action.payload };

    case MARKERS:
      return { ...state, markers: action.payload };

    case MYOFFICE_USERLANDMARK:
      return { ...state, myOfficeUserLandmark: action.payload };

    case INFO_WINDOW:
      return { ...state, infoWindow: action.payload };

    case TOAST:
      return { ...state, toast: action.payload };

    default:
      return state;
  }
};

export default reducers;
