import React from 'react';
import PropTypes from 'prop-types';

const Radio = ({ checked, label, value }) => (
  <div className='ambit-radio'>
    <label>
      <input type='radio' value='option1' checked={checked} />
      {label}
    </label>
  </div>
);

Radio.propTypes = {
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
};

export default Radio;