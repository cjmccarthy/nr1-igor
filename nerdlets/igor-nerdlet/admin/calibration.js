import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Button, AccountStorageMutation } from 'nr1';


export default class Calibration extends React.Component {
  static propTypes = {
    settings: PropTypes.object,
    accountId: PropTypes.number,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      defaultTempMin:
        ((props.settings || {}).defaults || {}).tempMin || '0',
      defaultTempMax:
        ((props.settings || {}).defaults || {}).tempMax || '100',
      defaultHumidityMin:
        ((props.settings || {}).defaults || {}).humidityMin || '0',
      defaultHumidityMax:
        ((props.settings || {}).defaults || {}).humidityMax || '100',
    };

    this.textChange = this.textChange.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
    this.resetDefauls = this.resetDefauls.bind(this);

  }

  textChange(txt, attr) {
    const o = {};
    o[attr] = txt;
    this.setState(o);
  }

  async saveHandler(attr) {
    const {
      defaultTempMin,
      defaultTempMax,
      defaultHumidityMin,
      defaultHumidityMax,
    } = this.state;
    const { settings, accountId, onChange } = this.props;

    const o = {};
    o[attr] =
      attr === 'defaults'
        ? {
            tempMin: defaultTempMin,
            tempMax: defaultTempMax,
            humidityMin: defaultHumidityMin,
            humidityMax: defaultHumidityMax,
          }
        : this.state[attr];

    const _settings = Object.assign(settings || {}, o);

    const res = await AccountStorageMutation.mutate({
      accountId: accountId,
      actionType: AccountStorageMutation.ACTION_TYPE.WRITE_DOCUMENT,
      collection: 'IgorDB',
      documentId: 'settings',
      document: _settings
    });
  }

  resetDefauls() {
    const { settings } = this.props;

    this.setState(
      {
        defaultTempMin:
          ((settings || {}).defaults || {}).tempMin || '0',
        defaultTempMax:
          ((settings || {}).defaults || {}).tempMax || '100',
        defaultHumidityMin:
          ((settings || {}).defaults || {}).humidityMin || '0',
        defaultHumidityMax:
          ((settings || {}).defaults || {}).humidityMax || '100',
      },
      () => this.saveHandler('defaults')
    );
  }

  render() {
    const {
      defaultTempMin,
      defaultTempMax,
      defaultHumidityMin,
      defaultHumidityMax,
    } = this.state;
    const { settings } = this.props;

    const formStyle = {
      font: '1.5em Inconsolata, monospace',
      border: '1px solid #e3e4e4',
      padding: '.5em',
      borderRadius: '.25em'
    };

    return (
      <div>
        {settings && (
          <div
            className="cols bound"
            style={{ gridTemplateColumns: '1fr 5fr' }}
          >
            <div className="col" style={{ margin: '1em' }}>
              <div className="summary">
                <span className="title"> Defaults</span>
                Set default values for Temperature and Humidity
              </div>
              <div className="field">
                <label htmlFor="defaults-temp-min" className="label">
                  Minimum Temperature
                </label>
                <input
                  id="defaults-temp-min"
                  className="input"
                  type="number"
                  placeholder="0"
                  min="-460"
                  max="100"
                  value={defaultTempMin}
                  onChange={e =>
                    this.textChange(e.target.value, 'defaultTempMin')
                  }
                  style={formStyle}
                />
              </div>
              <div className="field">
                <label htmlFor="defaults-temp-max" className="label">
                  Maximum Temperature
                </label>
                <input
                  id="defaults-temp-max"
                  className="input"
                  type="number"
                  placeholder="200"
                  min="-459"
                  max="2000"
                  value={defaultTempMax}
                  onChange={e =>
                    this.textChange(e.target.value, 'defaultTempMax')
                  }
                  style={formStyle}
                />
              </div>
              <div className="field">
                <label htmlFor="defaults-humidity-min" className="label">
                  Minimum Humidity
                </label>
                <input
                  id="defaults-humidity-min"
                  className="input"
                  type="number"
                  placeholder="0"
                  min="0"
                  max="99"
                  step="1"
                  value={defaultHumidityMin}
                  onChange={e =>
                    this.textChange(e.target.value, 'defaultHumidityMin')
                  }
                  style={formStyle}
                />
              </div>
              <div className="field">
                <label htmlFor="defaults-humidity-max" className="label">
                  Maximum Humidity
                </label>
                <input
                  id="defaults-pitch-humidity-max"
                  className="input"
                  type="number"
                  placeholder="100"
                  min="1"
                  max="100"
                  step="1"
                  value={defaultHumidityMax}
                  onChange={e =>
                    this.textChange(e.target.value, 'defaultHumidityMax')
                  }
                  style={formStyle}
                />
              </div>
              <Button
                type={Button.TYPE.NORMAL}
                style={{ marginRight: '1em' }}
                onClick={() => this.saveHandler('defaults')}
              >
                Save
              </Button>
              <Button type={Button.TYPE.PLAIN} onClick={this.resetDefauls}>
                Reset
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
