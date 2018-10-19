/**
*
* ProjectionMapper
*
*/

import React, { PropTypes } from 'react';
// import styled from 'styled-components';

import { Marker, Polyline} from 'react-google-maps';
const icon = [require('./Person1.png'), require('./Person2.png'), require('./Person3.png')];

function ProjectionMapper(predictions) {
  let result = [];
  _.map(predictions, (target, t_i) => {
    _.map(target[0], (subarea, s_i) => {
      // Push current location
      result.push(<Marker icon={icon[t_i]}
                    position={google.maps.geometry.spherical.interpolate(
                      new google.maps.LatLng(subarea[2].start_location),
                      new google.maps.LatLng(subarea[2].end_location),
                      subarea[3]
                    )}
                  />);

      // Push current polyline
      result.push(<Polyline
                    // key={j + subarea.length}
                    options={{ strokeColor: "#0000FF",  strokeWeight: 4}}
                    path={google.maps.geometry.encoding.decodePath(subarea[2].polyline.points)}
                  />);

      // Push all remaining polylines
      _.map(subarea[4], (path, p_i) => {
        if (subarea[2].polyline.points != path) {
          result.push(<Polyline
                      // key={j + subarea.length}
                      options={{ strokeColor: "#8888FF",  strokeWeight: 2}}
                      path={google.maps.geometry.encoding.decodePath(path)}
                    />);
        }
      })
    });
  });
  
  return result;
}

ProjectionMapper.propTypes = {
  predictions: PropTypes.array,
};

export default ProjectionMapper;
