// <textarea value={this.state.value} onChange={this.handleChange} />
import React from 'react';
import PropTypes from 'prop-types';

const Textarea = ({ 
  disabled, 
  optional, 
  label, 
  placeholder, 
  value, 
  onChange, 
  hasError, 
  errorMessage, 
  validationHint,
  autoFocus,
  style
}) => {
  const htmlFor = label.split(' ').join('');
  const errorClassName = hasError ? 'hasError' : '';
  const disabledClassName = disabled ? 'disabled' : '';
  const inputClassName = `ambit-textarea ${errorClassName} ${disabledClassName}`;

  return (
    <div style={Object.assign({}, {width: '100%'}, style)} className='ambit-input'>
      {!optional &&
        <label htmlFor={htmlFor} className='ambit-input-label'>
          {label}
        </label>
      }
      {optional &&
        <label className='ambit-input-label' htmlFor={htmlFor}>
          {label} - <span className='optionalLabel'>Optional</span>
        </label>    
      }
      {validationHint &&
        <span className='validationHint'>{validationHint}</span>
      }
      <textarea 
        autoFocus={autoFocus}
        disabled={disabled}
        id={htmlFor}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={inputClassName} />  
      {hasError &&
        <span className='errorMessage'>{errorMessage}</span>
      }
    </div>
  );
};

Textarea.defaultProps = {
  placeholder: '',
  hasError: false,
  optional: false,
  disabled: false,
  autoFocus: false
};

Textarea.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool.isRequired,
  optional: PropTypes.bool.isRequired,
  validationHint: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  autoFocus: PropTypes.bool.isRequired,
  style: PropTypes.object
};

export default Textarea;
