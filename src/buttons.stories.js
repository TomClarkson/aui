import React, { Component } from 'react';
import { storiesOf, } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ScrollableTabs } from './index';
import { text, boolean, number } from '@storybook/addon-knobs';
import Button from './button';
import AddIcon from 'material-ui/svg-icons/content/add';
import Link from './link';
import Radio from './radio';
import Checkbox from './checkbox';

storiesOf('Buttons', module)
  .add('Primary', () => 
    <Button 
      onClick={action('clicked')}
      small={boolean('small', false)}
      disabled={boolean('disabled', false)}
      type='primary'>
      Primary
    </Button>
  )
  .add('Secondary', () => 
    <Button 
      onClick={action('clicked')}
      small={boolean('small', false)}
      disabled={boolean('disabled', false)}
      type='secondary'>
      Secondary
    </Button>
  )
  .add('Text Button', () =>
    <Button 
      onClick={action('clicked')}
      small={boolean('small', false)}
      disabled={boolean('disabled', false)}
      type='text'>
      Text Button
    </Button>
  )
  .add('Icon Text Button', () =>
    <Button 
      onClick={action('clicked')}
      small={boolean('small', false)}
      disabled={boolean('disabled', false)}
      type='text'>
      <span>Text Button <AddIcon /></span>
    </Button>
  )
  .add('Link', () => 
    <Link 
      disabled={boolean('disabled', false)}
      onClick={action('clicked')} 
      href='#'>
      Link
    </Link>
  )
  .add('Radio', () =>
    <Radio 
      checked={boolean('checked', false)}
      label='Label'
      value='value'
      />
  )
  .add('Checkbox', () =>
    <Checkbox
      checked={boolean('checked', false)}
      label='Label' />
  );