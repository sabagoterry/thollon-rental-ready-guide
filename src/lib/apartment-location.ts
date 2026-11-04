export const apartmentLocation = {
  latitude: 46.3905,
  longitude: 6.720833333333333,
  display: '46°23\'25.8"N 6°43\'15.0"E',
};

export const apartmentMapQuery = `${apartmentLocation.latitude},${apartmentLocation.longitude}`;
export const apartmentDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${apartmentMapQuery}`;