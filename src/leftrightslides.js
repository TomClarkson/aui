import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import PropTypes from 'prop-types';

class LeftRightSlides extends Component {
  render() {
    const { showLeftSlide, height, width, leftComponent, rightComponent } = this.props;
    
    const leftSlideX = showLeftSlide ? 0 : -15;
    const rightSlideX = showLeftSlide ? width : 0;

    return (
      <div id='intentAnimationWrapper' style={{overflow: 'hidden', width, height, position: 'relative'}}>
        <Motion style={{x: spring(leftSlideX, {precision: 10, stiffness: 160, damping: 20})}}>
          {({x}) =>
            <div style={{height, width, position: 'absolute', transform: `translateX(${x}px)`, display: 'flex'}}>
              {leftComponent}
            </div>
          }
        </Motion>        
        <Motion style={{x: spring(rightSlideX, {precision: 10, stiffness: 160, damping: 20})}}>
          {({x}) =>
            <div style={{height, width, zIndex: 1, position: 'absolute', transform: `translateX(${x}px)`, display: 'flex'}}>
              {rightComponent}
            </div>
          }
        </Motion>
      </div>
    );
  }
}

LeftRightSlides.propTypes = {
  showLeftSlide: PropTypes.bool.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  leftComponent: PropTypes.element.isRequired,
  rightComponent: PropTypes.element.isRequired,
};

export default LeftRightSlides;