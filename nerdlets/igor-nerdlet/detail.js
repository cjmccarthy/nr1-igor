import React from 'react';
import PropTypes from 'prop-types';

import {
  Link,
  LineChart,
  NerdGraphQuery,
  EntityByGuidQuery,
  navigation
} from 'nr1';

import Table from './table';

export default class Detail extends React.Component {
  static propTypes = {
    accountId: PropTypes.number,
    clickedObject: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { accountId, clickedObject } = this.props;

    return (
      <div className="details">
        <h2 className="header">{clickedObject.name} Hosts</h2>
        <div className="grid">
          <div>
            {(
              <div>
                <h3 className="header title">{clickedObject.name}</h3>
                <LineChart
                  accountId={accountId}
                  query={`SELECT
                            average(humidity) AS 'Humidity',
                            average(temperature) AS 'Temperature'
                          FROM EnvironmentGeo
                          TIMESERIES SINCE 2 DAYS AGO
                          WHERE device.id = '${clickedObject.name}'`}
                  fullWidth
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
