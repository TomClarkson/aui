import React from 'react';
import Tooltip from 'react-tooltip-component';
import PropTypes from 'prop-types';

const PortalTooltip = ({ children, title, position }) => (
  <Tooltip title={title} position={position}>
    <div>{children}</div>
  </Tooltip>
);

PortalTooltip.defaultProps = {
  position: 'bottom'
};

PortalTooltip.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired
};

export default PortalTooltip;