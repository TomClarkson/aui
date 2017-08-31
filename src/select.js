import React, { Component } from 'react';
import ArrowDropdown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import ArrowDropup from 'material-ui/svg-icons/navigation/arrow-drop-up';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import { OutsideClick } from '../components';
import PropTypes from 'prop-types';

const targetColor = '#333';

class Select extends Component {
  state = {
    isOpen: false,
    offsetTop: null,
    width: null,
    searchText: ''
  };
  closeMenu = () => {
    this.setState({
      isOpen: false,
      searchText: ''
    });
  };
  handleTargetClick = (e) => {
    if(this.state.isOpen) {
      return this.closeMenu();
    }
    
    const rect = this.target.getBoundingClientRect();
    this.setState({
      offsetTop: rect.height -1,
      width: rect.width - 2,
      isOpen: true
    });
  };
  onItemSelected = (value) => {
    this.closeMenu();
    this.props.onChange(value);
  };
  onOutsideClick = () => {
    this.closeMenu();
  };
  clearIconClicked = (e) => {
    e.stopPropagation();
    this.props.onChange(null);
  };
  searchChanged = (e) => {
    this.setState({
      searchText: e.target.value
    });
  };
  onSearchKeyDown = (e) => {
    const ESCAPE_KEY = 27;
    if(e.keyCode === ESCAPE_KEY) {
      return this.closeMenu();
    }
  };
  render() {
    const { isOpen, offsetTop, width, searchText } = this.state;
    const { options, value, placeholder, label, style } = this.props;

    const targetStyles = {
      userSelect: 'none', 
      cursor: 'pointer', 
      display: 'flex', 
      alignItems: 'center',
      border: '1px solid #C5C5C5',
      borderRadius: 3,
      height: 36,
      paddingLeft: 6,
      background: '#fff',
      position: 'relative'
    };

    const menuStyles = {
      background: '#fff',
      zIndex: 2,
      position: 'absolute', 
      top: offsetTop, 
      left: 0, 
      paddingTop: 5, 
      paddingBottom: 15,
      border: '1px solid #C5C5C5',
      borderRadius: 3,
      width,
      zIndex: 9,
      maxHeight: 500,
      overflowY: 'auto'
    };

    const itemStyle = {
      height: 30,
      position: 'relative',
      cursor: 'pointer'
    };

    const optionsWithSelected = options
      .filter(o => {
        return o.label.toLowerCase().includes(searchText.toLowerCase());
      })
      .map(o => o.value !== value ? o : Object.assign(
        {selected: true},
        o
      ));

    const selectedOption = optionsWithSelected.find(o => o.selected);
    const placeholderText = selectedOption ? selectedOption.label : placeholder; 

    // crop selected text
    const selectedTextStyles = {
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      position: 'absolute',
      left: 9,
      right: 47
    };

    const optionTextStyles = {
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      position: 'absolute',
      left: 9,
      right: 9,
      padding: '6px 10px',
      cursor: 'pointer'
    };
    
    return (
      <div className='ambit-input' style={style}>
        {label &&
          <label className='ambit-input-label'>
            {label}
          </label>        
        }
        <OutsideClick onClick={isOpen ? this.onOutsideClick : null}>
          <div className='ambit-select' style={{position: 'relative'}}>
            <div
              ref={el => this.target = el}
              onClick={this.handleTargetClick} 
              style={targetStyles}>
              {searchText.length === 0 &&
                <span style={selectedTextStyles}>{placeholderText}</span>            
              }
              {isOpen &&
                <input 
                  onKeyDown={this.onSearchKeyDown}
                  style={{position: 'absolute', border: 'none', outline: 'none', background: 'transparent'}}
                  autoFocus={true} 
                  value={searchText} 
                  onChange={this.searchChanged} />
              }
              <div style={{marginLeft: 'auto', height: 15, display: 'flex', alignItems: 'center'}}>
                <ClearIcon
                  onClick={this.clearIconClicked} 
                  style={{height: 15}} 
                  color={targetColor} />
                {isOpen &&
                  <ArrowDropup color={targetColor} />
                }
                {!isOpen &&
                  <ArrowDropdown color={targetColor} />
                }
              </div>
            </div>
            {isOpen &&
              <div style={menuStyles}>
                {optionsWithSelected.length === 0 && 
                  <div style={{padding: 15}}>No results found</div>
                }
                {optionsWithSelected.map(option =>
                  <div style={itemStyle} className='item' key={option.value} onClick={this.onItemSelected.bind(this, option.value)}>
                    <span 
                      style={Object.assign({}, optionTextStyles, {fontWeight: option.selected ? 600 : 'normal'})}>
                      {option.label}
                    </span>
                  </div>
                )}
              </div>
            }
          </div>
        </OutsideClick>
      </div>        
    );
  }
}

Select.defaultProps = {
  placeholder: 'Select',
  label: ''
};

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.any,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string.isRequired
    })
  ),
  label: PropTypes.string
};

export default Select;