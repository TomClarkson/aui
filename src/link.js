import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/lodash';

const Link = ({ href, onClick, children, disabled }) => {
  const disabledClassName = disabled ? 'disabled ' : '';
  const className = `ambit-link ${disabledClassName}`;
  console.log(className);

  return (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  );
};

Link.defaultProps = {
  disabled: false
};

Link.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired,
  href: PropTypes.string.isRequired  
};

export default Link;