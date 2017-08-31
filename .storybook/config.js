import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import ThemeProvider from '../themeprovider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const ThemeDecorator = (storyFn) => (
  <ThemeProvider>
    { storyFn() }
  </ThemeProvider>
);

addDecorator(withKnobs);
addDecorator(ThemeDecorator);

import '../tooltip.css';
import '../styles.css';

const loadStories = () => {
  const storyFiles = require.context('../src', true, /\.stories\.js$/);
  storyFiles.keys().forEach(path => storyFiles(path));
};

configure(loadStories, module);
