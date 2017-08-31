import React, { Component } from 'react';
import { storiesOf, } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ScrollableTabs } from './index';
import { text, boolean, number } from '@storybook/addon-knobs';
import LeftRightSlides from './leftrightslides';

const LeftComponent = () => (
  <div style={{flex: 1, background: 'pink'}}>
    <span>Left</span>
  </div>
);

const RightComponent = () => (
  <div style={{flex: 1, background: 'yellow'}}>
    <span>Right</span>
  </div>
);

storiesOf('LeftRightSlide', module)
  .add('Shows active slide', () => 
    <div style={{border: '1px solid #333', height: 400, width: 400}}>
      <LeftRightSlides 
        showLeftSlide={boolean('showLeftSlide', true)} 
        height={400} 
        width={400} 
        leftComponent={<LeftComponent />} 
        rightComponent={<RightComponent />} />
    </div>
  );