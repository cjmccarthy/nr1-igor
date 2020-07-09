import React from 'react';
import PropTypes from 'prop-types';

import Settings from './settings';
import Locations from './locations';
import Mappings from './mappings';
import Calibration from './calibration';

export default class Admin extends React.Component {
  static propTypes = {
    accountId: PropTypes.number,
    settings: PropTypes.object,
    data: PropTypes.object,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      currentTab: 1
    };

    this.switchTab = this.switchTab.bind(this);
  }

  switchTab(e, id) {
    e.preventDefault();
    this.setState({ currentTab: id });
  }

  render() {
    const { currentTab } = this.state;
    const { accountId, settings, data, onChange } = this.props;

    return (
      <div>
        {/* <h2 className="header">Admin</h2>*/}
        <div className="tabs">
          <ul className="tabs-links">
            <li className={currentTab === 1 ? 'active' : ''}>
              <a
                href="#tab-1"
                className="u-unstyledLink"
                onClick={e => this.switchTab(e, 1)}
              >
                General Settings
              </a>
            </li>
            <li className={currentTab === 2 ? 'active' : ''}>
              <a
                href="#tab-2"
                className="u-unstyledLink"
                onClick={e => this.switchTab(e, 2)}
              >
                Edit Calibrations
              </a>
            </li>
          </ul>
        </div>
        <div className="tabs-content">
          <div id="tab-1" className={`${currentTab === 1 ? 'show' : ''}`}>
            <Settings
              settings={settings}
              accountId={accountId}
              onChange={onChange}
            />
          </div>
          <div id="tab-2" className={`${currentTab === 2 ? 'show' : ''}`}>
            <Calibration settings={settings} accountId={accountId} onChange={onChange} />
          </div>
        </div>
      </div>
    );
  }
}
