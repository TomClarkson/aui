import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/lodash';

const Button = ({ onClick, children, type, small, disabled, style }) => {
  const sizeClassName = small ? 'small ' : '';
  const disabledClassName = disabled ? 'disabled ' : '';
  const className = `ambit-btn ${type} ${sizeClassName}${disabledClassName}`;

  const childrenVerticallyCentered = _.isString(children) ? children : React.cloneElement(children, {
    style: {
      display: 'flex',
      alignItems: 'center'
    },
    children: React.Children.map(children.props.children, child => {
      if(child.type && child.type.muiName === 'SvgIcon') {
        return React.cloneElement(child, {
          style: {
            fill: 'inherit'
          }
        });
      }
      return child;
    })
  });

  return (
    <button onClick={onClick} className={className} style={style}>
      <div className='ambit-btn-inner'>{childrenVerticallyCentered}</div>
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  small: false
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'text']).isRequired,
  disabled: PropTypes.bool.isRequired,
  small: PropTypes.bool.isRequired,
  style: PropTypes.object
};

export default Button;