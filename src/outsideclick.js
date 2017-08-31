import React, { Component } from 'react';

class OutsideClick extends Component {
  componentDidMount() {
    global.document.addEventListener('click', this.handleClick);
    if(this.props.listenToEscapePress) {
      global.document.addEventListener('keydown', this.handleEscapeKeydown);
    }
  }
  componentWillUnmount() {
    global.document.removeEventListener('click', this.handleClick);
    if(this.props.listenToEscapePress) {
      global.document.removeEventListener('keydown', this.handleEscapeKeydown);
    }
  }
  handleEscapeKeydown = (e) => {
    if(e.code === 'Escape') {
      this.props.onClick(e);
    }
  }
  setRef = (el) => {
    this.el = el;
  }
  handleClick = (evt) => {
    const { target } = evt;

    if (this.el === target || this.el.contains(target)) {
      return;
    }
    if(this.props.onClick) {
      this.props.onClick(evt);
    }
  }
  render() {
    return React.cloneElement(this.props.children, {
      ref: this.setRef,
    });
  }
}

OutsideClick.defaultProps = {
  listenToEscapePress: false
};

export default OutsideClick;