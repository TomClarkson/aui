import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import Proptypes from 'prop-types';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import IconButton from 'material-ui/IconButton';
import { Tooltip } from './index';
import { Observable } from 'rxjs';

const clamp = (n, min, max) => {
  return Math.max(Math.min(n, max), min);
};

const getInitialTabX = ({tabWidth, index}) => index * tabWidth;

class Tab extends Component {
  state = {
    isDragging: false,
    dragX: false
  };
  onMouseDown = (e) => {
    const isLeft = e.button === 0;
    if(isLeft) {
      const initialX = getInitialTabX(this.props);

      const startPageX = e.pageX;
      const startPageY = e.pageY;

      const moves$ = Observable.fromEvent(document, 'mousemove');
      const release$ = Observable.fromEvent(document, 'mouseup').take(1);

      const drags$ = moves$
        .sampleTime(30)
        .map(moveEvent =>
          initialX + (moveEvent.pageX - startPageX)
        )
        .takeUntil(release$);

      const initialIndex = this.props.index;

      drags$
        .do(dragX => {
          this.setState({
            isDragging: true, 
            dragX 
          });
        })
        .map(dragX => {
          const { tabs, tabWidth } = this.props;
          const currentIndex = clamp(Math.round(dragX / tabWidth), 0, tabs.length - 1);
          
          return currentIndex;
        })
        .distinctUntilChanged()
        .skipWhile(newIndex => newIndex === initialIndex)
        .map((newIndex) => {
          const { tabs, tab } = this.props;
          const oldIndex = tabs.findIndex(t => t.id === tab.id);
          
          return {newIndex, oldIndex};
        })
        .subscribe(indexUpdateData => {
          this.props.onChangeOrder(indexUpdateData)
        });

      release$
        .subscribe(() => {
          this.setState({
            isDragging: false
          });
          this.props.onSelectTab(this.props.tab.id);
        });
    }
  };  
  render() {
    const { tabWidth, tab, selected, index, height } = this.props;
    const { isDragging, dragX } = this.state;

    const x = isDragging ? dragX : getInitialTabX({index, tabWidth});

    const transform = `translate3d(${x}px, 0px, 0)`;

    const isDraggingStyle = !isDragging ? {} : {
      boxShadow: '1px 1px 1px #eee',
      background: '#fafafa',
      zIndex: 1
    };
    
    const tabBaseStyles = {
      position: 'absolute',
      transform,
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      width: tabWidth,
      boxSizing: 'border-box',
      paddingLeft: 10,
      paddingRight: 10,
      borderRight: '1px solid #eee',
      fontSize: 13,
      textAlign: 'center',
      userSelect: 'none'
    };

    const tabStyles = Object.assign({}, tabBaseStyles, isDraggingStyle);

    return (
      <div style={tabStyles} onMouseDown={this.onMouseDown}>
        <span 
          style={selected ? {color: '#333', fontWeight: 600} : {color: '#999'}}>{tab.title}</span>
      </div>
    );
  }
}

class ScrollableTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollX: 0
    };
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.selectedId !== this.props.selectedId) {
      const { tabWidth, width } = nextProps;
      const newTabIndex = this.props.tabs.findIndex(t => t.id === nextProps.selectedId);
      const rightOfNewTab = (newTabIndex + 1) * tabWidth;

      const scrollX = Math.abs(this.state.scrollX);
      const rightOfVisibleScroll = scrollX + width;

      const rightOfNewTabAfterVisibleScrollArea = rightOfNewTab > rightOfVisibleScroll;
      if(rightOfNewTabAfterVisibleScrollArea) {
        this.setState({
          scrollX: -rightOfNewTab + 400
        });
      }

      const leftOfNewTab = rightOfNewTab - tabWidth;

      if(scrollX > leftOfNewTab) {
        this.setState({
          scrollX: Math.min(0, this.state.scrollX + 300)
        });
      }
    }
  }
  scrollLeft = () => {
    this.setState({
      scrollX: Math.min(this.state.scrollX + 300, 0)
    });
  };
  scrollRight = () => {
    this.setState({scrollX: this.state.scrollX - 300});
  };
  onSelectTab = (id) => {
    this.props.onSelect(id);
  };
  render() {
    const { tabs, height, selectedId, width, tabWidth } = this.props;
    const { scrollX } = this.state;

    const tabContainerWidth = width;
    const calculatedTabWidth = tabs.length * tabWidth;

    const canScrollRight = (scrollX + calculatedTabWidth) > tabContainerWidth;

    return (
      <div style={{display: 'flex', position: 'relative', height, borderTop: '2px solid #eee', width: tabContainerWidth, borderBottom: '2px solid #eee', overflow: 'hidden'}}>
        {scrollX < 0 &&
          <div style={{zIndex: 2, background: '#fff', position: 'absolute', left: 0, width: 80, bottom: 0, top: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Tooltip title='Scroll Left'>
              <IconButton touch onTouchTap={this.scrollLeft}>
                <ChevronLeft />
              </IconButton>
            </Tooltip>
          </div>
        }
        <Motion style={{x: spring(scrollX)}}>
        {({x}) =>
          <div style={{position: 'relative', fontSize: 14, transform: `translate3d(${x}px, 0,0)`}}>
            {tabs.map((tab, i) =>
              <Tab
                onChangeOrder={this.props.onChangeOrder}
                tabs={tabs}
                height={height}
                key={tab.id} 
                index={i}
                selected={tab.id === selectedId}
                tab={tab} 
                onSelectTab={this.onSelectTab}
                tabWidth={tabWidth} />
            )}
            <Motion style={{x: spring(tabs.findIndex(t => t.id === selectedId) * tabWidth)}}>
            {({x}) =>
              <div 
                className="ambit-inkbar" 
                style={{position: 'absolute', height: 2, width: tabWidth, background: '#1AA3F7', transform: `translate3d(${x}px, ${height - 6}px, 0)`}} />
            }
            </Motion>
          </div>
        }
        </Motion>
        {canScrollRight &&
          <div style={{zIndex: 2, background: '#fff', position: 'absolute', right: 0, width: 80, bottom: 0, top: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Tooltip title='Scroll Right'>
              <IconButton touch onTouchTap={this.scrollRight}>
                <ChevronRight />
              </IconButton>
            </Tooltip>
          </div>
        }
      </div>
    );
  }
}

ScrollableTabs.defaultProps = {
  tabWidth: 120
};

ScrollableTabs.propTypes = {
  width: Proptypes.number.isRequired,
  height: Proptypes.number.isRequired,
  onSelect: Proptypes.func.isRequired,
  tabs: Proptypes.array.isRequired,
  onChangeOrder: Proptypes.func.isRequired
};

export default ScrollableTabs;