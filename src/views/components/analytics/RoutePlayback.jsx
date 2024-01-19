import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Marker, PolylineF } from '@react-google-maps/api';
import direction from '../../../app/images/direction.png';
import CanvasJS from '@canvasjs/charts';
import { convertToLocalDateAndTime } from '../../../utils/CommonFunctions';
import { useDispatch } from 'react-redux';
import { updateCenter } from '../../../app/redux/action/action';

const RoutePlayback = ({ routePlayback = null, center, setCenter, setZoom }) => {
  const [c, setC] = useState(center);
  const dispatch = useDispatch();

  useEffect(() => {
    chartData();
  }, []);

  let routePlayback2 = routePlayback.slice(0, 304);
  console.log('routePlayback2', routePlayback2);
  let speedValue = [];
  let epochValue = [];
  let epochValue2 = [];
  console.log('epochValue', epochValue);

  function chartData() {
    var chart = new CanvasJS.Chart('chartContainer', {
      theme: 'light1', // "light1", "light2", "dark1", "dark2"
      animationEnabled: true,
      zoomEnabled: true,

      title: {
        text: 'Hover to play the Route Playback'
      },
      axisX: {
        title: 'time',
        titleFontColor: '#4F81BC'
      },
      axisY: {
        title: 'Speed',
        titleFontColor: '#4F81BC',
        includeZero: true,
        suffix: 'Km'
      },
      data: [
        {
          type: 'area',
          yValueFormatString: '#,##0.0 K/m',
          dataPoints: [],
          mouseover: function (data) {
            let lat = data.dataPoint?.lat;
            let lng = data.dataPoint?.lng;
            setC({ lat, lng });
            // setCenter({ lat, lng });
            dispatch(updateCenter({ lat, lng }));

            setZoom(30);
            console.log('latlng', lat, lng, data);
          }
        }
      ]
    });
    setTimeout(() => {
      addDataPoints(1000);
      chart.render();
    }, 3000);

    function addDataPoints(noOfDps) {
      for (var i = 0; i < noOfDps; i++) {
        console.log('speeeed data', noOfDps, speedValue, epochValue);
        chart.options.data[0].dataPoints.push({
          x: new Date(epochValue)[i],
          y: speedValue[i],
          lat: routePlayback[i].lat,
          lng: routePlayback[i].lng,
          label: epochValue2[i]
        });
      }
    }
  }
  useEffect(() => {
    setCenter({ lat: routePlayback[0]?.lat, lng: routePlayback[0]?.lng });
    setC({ lat: routePlayback[0]?.lat, lng: routePlayback[0]?.lng });
    setZoom(30);
    routePlayback?.forEach((item, index) => {
      console.log('item', item.speed);
      speedValue.push(item.speed);
      epochValue.push(item.timestamp);

      epochValue2.push(convertToLocalDateAndTime(item?.timestamp));
    });
  }, []);

  return (
    <>
      <PolylineF
        path={routePlayback}
        strokeColor='#FF0000'
        strokeOpacity={1.0}
        strokeWeight={2}
      />
      {routePlayback?.length > 0 && (
        <Box
          sx={{
            border: '1px solid black !important',
            height: '200px !important',
            width: '1400px !important',
            overflowX: 'scroll !important',
            backgroundColor: '#FFF',
            position: 'absolute',
            bottom: 0,
            justifyContent: 'center'
          }}
        >
          <Box
            sx={{
              height: 200,
              position: 'absolute',
              bottom: 10,
              left: 5,
              width: '1000pc',
              backgroundColor: '#FFF'
            }}
          >
            <div
              id='chartContainer'
              style={{ height: '100%', width: '100%' }}
              onMouseEnter={console.log('first')}
            />

            <Marker
              position={c}
              icon={{ url: direction, scaledSize: new window.google.maps.Size(25, 25) }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default RoutePlayback;
