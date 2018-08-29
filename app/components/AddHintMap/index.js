/**
*
* AddHintMap
*
*/

import React, { PropTypes } from 'react';
// import styled from 'styled-components';
import { GoogleMap, Marker, withGoogleMap, InfoWindow } from 'react-google-maps';
import SubareaPolygons from '../SubareaPolygons/index';

const config = require('./../../../config');

function AddHintMap({ wgs, address }) {
  const MyMapComponent = withGoogleMap(() =>
    <GoogleMap
      defaultZoom={9}
      defaultCenter={{ lat: 52.1523337615325, lng: 5.859883117643787 }}
    >
      {SubareaPolygons().map((subarea) => subarea)}
      { wgs ?
        <Marker position={{ lat: wgs[0], lng: wgs[1] }} >
          <InfoWindow>
            <div>
              {address.results[0] && address.results[0].formatted_address}
            </div>
          </InfoWindow>
        </Marker>
        :
        <InfoWindow position={{ lat: 52.1523337615325, lng: 5.859883117643787 }}>
          <div>
            Vul eerst coördinaten in.
          </div>
        </InfoWindow>
      }
    </GoogleMap>
  );

  return (
    <MyMapComponent
      isMarkerShown
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${config.google.googleAppId}v=3.exp&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ height: '300px' }} />}
      mapElement={<div style={{ height: '100%' }} />}
    />
  );
}

AddHintMap.propTypes = {
  wgs: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.number)]),
  address: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
};

export default AddHintMap;
