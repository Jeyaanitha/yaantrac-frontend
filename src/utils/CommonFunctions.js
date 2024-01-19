// function to get Date Format to YYYY-MM-DD from Full Date & Time
export const convert = str => {
  var date = new Date(str),
    month = ('0' + (date.getMonth() + 1)).slice(-2),
    day = ('0' + date.getDate()).slice(-2);
  return [date.getFullYear(), month, day].join('-');
};

// function to get Date Format to DD/MM/YYYY from Full Date & Time
export const convert2 = str => {
  const today = new Date(str);
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  if (day < 10) day = '0' + day;
  if (month < 10) month = '0' + month;

  return `${day}/${month}/${year}`;
};

// function to get Date Format from DD-MM-YYYY to DD/MM/YYYY:
export const convert3 = str => {
  let splitDate = str?.split('-');
  let d = parseInt(splitDate[0]);
  let m = parseInt(splitDate[1]);
  let y = parseInt(splitDate[2]);
  const dateString = (d <= 9 ? '0' + d : d) + '/' + (m <= 9 ? '0' + m : m) + '/' + y;
  return dateString;
};

// function to get Date Format from DD-MM-YYYY 00:00:00 to DD/MM/YYYY 00:00:00
export const convert3ToLocalDateAndTime = str => {
  var datePart = str.split(' ')[0];
  var timePart = str.split(' ')[1] + ' ' + str.split(' ')[2];
  var splitDate = datePart.split('-');
  var d = parseInt(splitDate[0], 10);
  var m = parseInt(splitDate[1], 10);
  var y = parseInt(splitDate[2], 10);

  const dateString =
    (d <= 9 ? '0' + d : d) + '/' + (m <= 9 ? '0' + m : m) + '/' + y + ' ' + timePart;

  return dateString;
};

// function to get dates between two dates
export const getDates = (startDate, endDate) => {
  const dates = [];
  let currentDate = startDate;
  const addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  while (currentDate <= endDate) {
    dates.push(convert2(currentDate));
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};

// function to get date after 10 days from a selected date
export const getMaxDate = getStartDate => {
  let endDate = new Date(getStartDate);
  endDate.setDate(endDate.getDate() + 9);
  return endDate;
};

// function to get date before 10 days from a selected date
export const getMinDate = getStartDate => {
  let endDate = new Date(getStartDate);
  endDate.setDate(endDate.getDate() - 9);
  return endDate;
};

// function to get epoch format from simple date & time format
export const getEpoch = timestamp => Math.floor(Date.parse(timestamp) / 1000);

// function to convert "09:30 PM" to GMT Time format
export const convertTimeToGMT = string => {
  const [time, modifier] = string.split(' ');
  let [hours, minutes] = time.split(':');
  let date = new Date();
  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }
  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
};

// convert "DD/MM/YYYY 00:00 PM" from epoch format
export const convertToLocalDateAndTime = epoch => {
  // this is done because in js epoch length should be 13 but in db its 10
  let toString = epoch.toString();
  if (toString.length === 10) {
    toString = toString + '000';
    epoch = parseInt(toString, 10);
  }
  const dateTime = new Date(epoch);
  const time = dateTime.toLocaleTimeString();
  return `${convert2(epoch)} ${time}`;
};

// converting epoch value to day-month-year time AM/PM
export const epochConverter = epochTime => {
  const date = new Date(epochTime * 1000);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  var hours = ('0' + date.getHours()).slice(-2);
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  var dateString = `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  return dateString;
};

// function to convert from seconds to minutes or hours
export const convertToMinutesOrHours = seconds => {
  let duration = seconds;
  if (duration < 60) {
    return `${duration} Seconds`;
  }
  if (duration >= 60) {
    duration = duration / 60;
    if (duration < 60) {
      return `${duration?.toFixed(2)} Minutes`;
    } else {
      duration = duration / 60;
      return `${duration?.toFixed(2)} Hours`;
    }
  }
};

// function to convert the date:25/09/1996 to epoch:
export const getEpochValue = dateString => {
  // convert the date string to a Date object
  const date = new Date(dateString);

  // Get the unix epoch time in seconds for the given date
  const epochTimeInSeconds = Math.floor(date.getTime() / 1000);
  return epochTimeInSeconds;
};

// function to convert the epoch timestamp in seconds to date:25/09/1996
export const dateConvert = epochTimestamp => {
  // create a new date object and set it to the epoch timestamp
  const date = new Date(epochTimestamp * 1000);

  // get the individual components (day, month, year)
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
  const year = date.getFullYear();

  // create the DD/MM/YYYY formatted date string
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

// function to calculate zoom from array of coordinates
export const calculateZoom = paths => {
  const center = paths.reduce(
    (acc, point) => {
      acc.lat += point.lat;
      acc.lng += point.lng;
      return acc;
    },
    { lat: 0, lng: 0 }
  );

  center.lat /= paths.length;
  center.lng /= paths.length;

  // calculate the distance from the center to each vertex and find the maximum distance
  let maxDistance = 0;

  for (const point of paths) {
    const R = 6371; // earth's radius in km
    const lat1 = center.lat;
    const lon1 = center.lng;
    const lat2 = point.lat;
    const lon2 = point.lng;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // distance in km

    if (distance > maxDistance) maxDistance = distance;
  }
  let newRadius = (maxDistance + maxDistance) / 2;
  let scale = newRadius / 100;
  let zoom = parseInt(9 - Math.log(scale) / Math.log(2));
  return zoom;
};

// function to calculate center from array of coordinates
export const calculateCenter = paths => {
  if (paths.length === 0) return null;
  const { lat, lng } = paths.reduce(
    (acc, path) => ({
      lat: acc.lat + path.lat,
      lng: acc.lng + path.lng
    }),
    { lat: 0, lng: 0 }
  );
  return { lat: lat / paths.length, lng: lng / paths.length };
};

// function to convert meter to kilometre
export const convertMeterToKm = meter => {
  var km = meter / 1000;
  return parseFloat(km.toFixed(2));
};

// function to convert kilometre to meter
export const convertKmToMeter = km => km * 1000;
