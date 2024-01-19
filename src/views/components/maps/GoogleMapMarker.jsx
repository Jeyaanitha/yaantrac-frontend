import React, { useEffect, useState } from 'react';
import { InfoWindow, Marker, MarkerClusterer } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import Geocode from 'react-geocode';
import carIcon from '../../../app/images/markers/car.png';
import personIcon from '../../../app/images/person.png';
import truckIcon from '../../../app/images/truckResized.png';
import assetIcon from '../../../app/images/assetResized.png';
import bikeIcon from '../../../app/images/markers/bike.png';
import greenFlag from '../../../app/images/greenFlag.png';
import orangeFlag from '../../../app/images/orangeFlag.png';
import redFlag from '../../../app/images/redFlag.png';
import officeIcon from '../../../app/images/markers/office.png';
import ALetterPin from '../../../app/images/markers/locationA.png';
import BLetterPin from '../../../app/images/markers/locationB.png';

//Geocode API Key
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY);

const car = {
  icon: {
    url: carIcon
  }
};

const person = {
  icon: {
    url: personIcon
  }
};

const truck = {
  icon: {
    url: truckIcon
  }
};

const asset = {
  icon: {
    url: assetIcon
  }
};

const bike = {
  icon: {
    url: bikeIcon
  }
};

const office = {
  icon: {
    url: officeIcon
  }
};

const greenFlg = {
  icon: {
    url: greenFlag
  }
};

const orangeFlg = {
  icon: {
    url: orangeFlag
  }
};

const redFlg = {
  icon: {
    url: redFlag
  }
};

const ALetter = {
  icon: {
    url: ALetterPin
  }
};

const BLetter = {
  icon: {
    url: BLetterPin
  }
};

const GoogleMapMarker = ({ isHistoric = null, onClick, children }) => {
  let { markers = [] } = useSelector(state => state.reducers);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState([]);

  const concatenateNoWithStreet = inputArray => {
    if (inputArray.length < 2) return inputArray;

    const concatenatedString = inputArray[0] + inputArray[1];
    const newArray = [concatenatedString];
    newArray.push(...inputArray.slice(2));

    return newArray;
  };

  const handleReverseGeocode = async (lat, lng, info) => {
    const response = await Geocode.fromLatLng(lat, lng);
    const address = await response.results[0].formatted_address;
    const addressArray = await address.split(',');
    const resultArray = concatenateNoWithStreet(addressArray);
    setDeviceInfo([...info, ...resultArray]);
  };

  const handleMarkerClick = ({ id, lat, lng, info }) => {
    setSelectedDevice(id);
    handleReverseGeocode(lat, lng, info);
  };

  useEffect(() => {
    setSelectedDevice(null);
    setDeviceInfo([]);
  }, [markers]);

  return (
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
      defaultImageSizes={[10, 10]}
    >
      {clusterer =>
        markers?.length > 0 &&
        markers?.map((item, index) => {
          let { id, lat, lng, info, deviceType } = item;
          let title = info[0]?.split(' ')?.pop();
          return (
            <Marker
              key={index}
              position={{ lat, lng }}
              title={title}
              clusterer={!isHistoric && clusterer}
              options={
                deviceType === 'car'
                  ? car
                  : deviceType === 'truck'
                  ? truck
                  : deviceType === 'assets'
                  ? asset
                  : deviceType === 'bike'
                  ? bike
                  : deviceType === 'office'
                  ? office
                  : deviceType === 'greenFlg'
                  ? greenFlg
                  : deviceType === 'orangeFlg'
                  ? orangeFlg
                  : deviceType === 'redFlg'
                  ? redFlg
                  : deviceType === 'ALetterPin'
                  ? ALetter
                  : deviceType === 'BLetterPin'
                  ? BLetter
                  : deviceType === 'person' && person
              }
              animation={window.google.maps.Animation.DROP}
              onClick={() => handleMarkerClick(item)}
            >
              {selectedDevice === id && (
                <InfoWindow onCloseClick={() => setSelectedDevice(null)}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start'
                    }}
                  >
                    {deviceInfo?.map(item => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </InfoWindow>
              )}
            </Marker>
          );
        })
      }
    </MarkerClusterer>
  );
};

export default GoogleMapMarker;
