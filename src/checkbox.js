import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import Animated from 'animated/lib/targets/react-dom';

const CheckboxTick = ({ height, width }) => (
  <svg width={width} height={height} viewBox='0 0 11 8'>
    <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd' strokeLinecap='round'>
      <g transform='translate(-1132.000000, -250.000000)' strokeWidth='2' stroke='#FFFFFF'>
        <g transform='translate(1129.000000, 245.000000)'>
          <g transform='translate(0.000000, 1.000000)'>
            <polyline points='4.51999998 7.73510618 7.73196274 10.5488082 12.52 5.38000011' />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

CheckboxTick.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

class Checkbox extends Component {
  constructor(props) {
    super(props);
    const initialBackgroundAnimatedValue = this.getAnimatedValueFromChecked(props.checked);
    this.backgroundAnimatedValue = new Animated.Value(initialBackgroundAnimatedValue);
    this.state = {
      isFocusedNotChecked: false
    };
  }
  getAnimatedValueFromChecked(checked) {
    return checked ? 1 : 0;
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.checked !== this.props.checked) {
      this.animateBackground(
        this.getAnimatedValueFromChecked(nextProps.checked)
      );
      this.setState({
        isFocusedNotChecked: false
      });
    }
  }
  animateBackground (toValue) {
    const result = Animated.spring(
      this.backgroundAnimatedValue,
      {
        toValue
      }
    ).start();
  }
  onMouseDown = () => {
    if(this.props.checked) {
      return this.animateBackground(1.5);
    }

    this.setState({
      isFocusedNotChecked: true
    });
  }
  handleChange = (e) => {
    this.props.onChange(
      !this.props.checked
    );
  };
  render() {
    const { checked, label, style } = this.props;

    const checkBoxBackgroundColor = this.backgroundAnimatedValue.interpolate({
      inputRange: [0, 1, 1.5],
      outputRange: ['#ffffff', '#48AAF4', '#0b96ff']
    });

    const checkBoxScale = this.backgroundAnimatedValue.interpolate({
      inputRange: [0, 1, 1.5],
      outputRange: [0, 1, 1]
    });

    const borderWidth = this.state.isFocusedNotChecked ? 2 : 1;

    const checkBoxPresentationStyle = {
      boxSizing: 'border-box',
      border: `${borderWidth}px solid ${checked ? '#48AAF4' : '#747474'}`, 
      height: 20, 
      width: 20, 
      borderRadius: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: checkBoxBackgroundColor
    };

    return (
      <div style={style} className='ambit-checkbox-wrapper'>
        <input
          value={checked}
          onMouseDown={this.onMouseDown}
          onChange={this.handleChange}
          className='ambit-checkbox' 
          type='checkbox' 
          checked={checked} />
        <div className='ambit-checkbox-content-wrapper'>
          <Animated.div 
            style={checkBoxPresentationStyle}>
            <Animated.div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{ scale: checkBoxScale }]
              }}>
              <CheckboxTick 
                height={20} 
                width={12} />              
            </Animated.div>
          </Animated.div>            
          <label style={{marginLeft: 8}}>{label}</label>
        </div>    
      </div>
    );
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Checkbox;