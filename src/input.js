import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/lodash';

const Input = ({ 
  disabled, 
  type, 
  optional, 
  label, 
  placeholder, 
  value, 
  onChange, 
  hasError, 
  errorMessage, 
  validationHint,
  autoFocus,
  style,
  min
}) => {
  const htmlFor = !label ? '' : label.split(' ').join('');
  
  const errorClassName = hasError ? 'hasError' : '';
  const disabledClassName = disabled ? 'disabled' : '';
  const inputClassName = `${errorClassName} ${disabledClassName}`;

  const minProps = _.isNumber(min) ? {min} : {};
  const optionalProps = Object.assign({}, minProps);

  return (
    <div className='ambit-input'>
      {!optional && label &&
        <label htmlFor={htmlFor} className='ambit-input-label'>
          {label}
        </label>
      }
      {optional && label &&
        <label className='ambit-input-label' htmlFor={htmlFor}>
          {label} - <span className='optionalLabel'>Optional</span>
        </label>    
      }
      {validationHint &&
        <span className='validationHint'>{validationHint}</span>
      }
      <input 
        {...optionalProps}
        style={style}
        autoFocus={autoFocus}
        disabled={disabled}
        type={type}
        id={htmlFor}
        value={value} 
        onChange={onChange} 
        className={inputClassName} 
        placeholder={placeholder} 
      />
      {hasError &&
        <span className='errorMessage'>{errorMessage}</span>
      }
    </div>
  );
};

Input.defaultProps = {
  placeholder: '',
  hasError: false,
  optional: false,
  type: 'text',
  disabled: false,
  autoFocus: false
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool.isRequired,
  optional: PropTypes.bool.isRequired,
  validationHint: PropTypes.string,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  autoFocus: PropTypes.bool.isRequired,
  style: PropTypes.object,
  min: PropTypes.number
};

export default Input;