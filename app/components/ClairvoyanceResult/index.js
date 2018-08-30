/**
 *
 * ClairvoyanceResult
 *
 */

import React, { PropTypes } from 'react';
import ClairvoyanceResultMapper from '../ClairvoyanceResultMapper/index';

// import styled from 'styled-components';


class ClairvoyanceResult extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={'row'}>
        <div className={'col-sm-6'}>
          <h4>Beste resultaat</h4>
          <ClairvoyanceResultMapper onSubmitValuesAsHint={this.props.onSubmitValuesAsHint} result={this.props.result.best} />
        </div>
        <div className={'col-sm-6'}>
          <h4>Overige resultaten <span className="label label-default">{this.props.result.other.length}</span></h4>
          {this.props.result.other.map((result, i) => <ClairvoyanceResultMapper
            key={i} onSubmitValuesAsHint={this.props.onSubmitValuesAsHint}
            result={result}
          />)}
        </div>
      </div>
    );
  }
}

ClairvoyanceResult.propTypes = {
  result: PropTypes.object,
  onSubmitValuesAsHint: PropTypes.func,
};

export default ClairvoyanceResult;
