import React, { Component } from 'react';
import { storiesOf, } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ScrollableTabs } from './index';
import { text, boolean, number } from '@storybook/addon-knobs';

const tabData = [
  { id: 1, title: '1. Initial and Intent' },
  { id: 2, title: 'Thank you and end' },
  { id: 3, title: 'Chat: How are you?' },
  { id: 4, title: 'Chat: Hi, Who are you?' },
  { id: 5, title: 'Chat: Humour and profanity' },
  { id: 6, title: 'Chat: The Meaning of Life' },
  { id: 7, title: 'Ambit Company' },
  { id: 8, title: 'Ambit people' },
  { id: 9, title: 'Chat Bots in general' },
  { id: 10, title: 'Reaching out' }
];

const reinsert = (arr, from, to) => {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, val);
  return _arr;
};

class DraggableScrollableTabsWrapper extends Component {
  state = {
    tabs: [...tabData],
    selectedPageId: 1
  }
  onSelect = (selectedPageId) => {
    this.setState({ selectedPageId });
  }
  onChangeOrder = ({newIndex, oldIndex}) => {
    const tabs = reinsert(this.state.tabs, oldIndex, newIndex);
    this.setState({ tabs });
  }
  render() {
    const { tabs, selectedPageId } = this.state;
    return (
      <ScrollableTabs
        onChangeOrder={this.onChangeOrder}
        selectedScript={1}
        width={800}
        height={50}
        selectedId={selectedPageId}
        onSelect={this.onSelect}
        tabs={tabs} />
    );
  }
}

storiesOf('Scrollable Tabs', module)
  .add('Tabs are draggable', () =>
    <DraggableScrollableTabsWrapper />
  )
  .add('Tabs scroll to selected tab', () => 
    <ScrollableTabs
      selectedScript={1}
      width={number('width', 500)}
      height={50}
      selectedId={number('Selected Script', 4)}
      onSelect={action('Page Selected')}
      onChangeOrder={action('Change tab order')}
      tabs={tabData} />
  );