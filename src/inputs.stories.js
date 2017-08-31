import React, { Component } from 'react';
import { storiesOf, } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean, number } from '@storybook/addon-knobs';
import Input from './input';
import Select from './select';
import Checkbox from './checkbox';
import Textarea from './textarea';

storiesOf('Inputs', module)
  .add('Textarea', () =>
    <Textarea 
      autoFocus={boolean('Autofocus', false)}
      placeholder={'Enter Text'}
      value={''}
      disabled={boolean('Disabled', false)}
      label='Label'
      onChange={action('onChange')}
    />
  )
  .add('Disabled Input', () =>
    <div style={{width: 200}}>
      <Input 
        placeholder={'Enter Text'}
        value={''}
        disabled={boolean('Disabled', true)}
        label='Label'
        onChange={action('onChange')}
      />
    </div>
  )
  .add('Input with errors', () => 
    <Input 
      placeholder={text('placeholder', 'John@fdsaff.co.nz')}
      value=''
      label='Label'
      optional={boolean('optional', false)}
      hasError={boolean('error', true)}
      errorMessage={text('Error message', 'Incorrect email address')}
      onChange={action('onChange')}
      />
  ) 
  .add('Input with validation hint', () =>
    <Input 
      placeholder={text('placeholder', 'John@fdsaff.co.nz')}
      value='Social'
      validationHint={text('Validation Hint', '50 max characters')}
      label='NLP App'
      optional={boolean('optional', false)}
      onChange={action('onChange')}
      />
  )
  .add('Select with no items', () => (
    <Select 
      label='Label'
      onChange={action('onChange')}
      value={null} 
      options={[]} />
  ))
  .add('Select', () => {
    const options = [
      {value: '1', label: 'Option 1'},
      {value: '2', label: 'Option 2'},
      {value: '3', label: 'Option 3'},
      {value: '4', label: 'Option 4 Option 4 Option 4 Option 4 Option 4 Option 4 Option 4 Option 4 Option 4 Option 4'}
    ];

    return (
      <div style={{width: 400, marginLeft: 40}}>
        <Select 
          onChange={action('onChange')}
          value='3' 
          options={options} />
      </div>
    );
  })
  .add('Select searchable', () => {
    const options = [
      {value: '1', label: 'Option 1'},
      {value: '2', label: 'Option 2'},
      {value: '3', label: 'Option 3'},
      {value: '4', label: 'Option 4'}
    ];

    return (
      <div style={{width: 400, marginLeft: 40}}>
        <Select 
          searchable={boolean('searchable', true)}
          clearable={boolean('clearable', true)}
          onChange={action('onChange')}
          value='3' 
          options={options} />
      </div>
    );
  })
  .add('Select with state', () => {
    const options = [
      {value: '1', label: '1. Intent'},
      {value: '2', label: '2. Message'},
      {value: '3', label: '3. Text'},
      {value: '4', label: '4. Choice'}
    ];

    class SelectWrapper extends Component {
      state = {
        value: '3'
      }
      onChange = (value) => {
        this.setState({value});
      }
      render() {
        const { value } = this.state;
        return (
          <Select 
            searchable={true}
            clearable={true}
            onChange={this.onChange}
            value={value}
            options={options} />
        );
      }
    }

    return (<SelectWrapper />);
  })
  .add('Checkbox', () => {
    return (
      <Checkbox 
        onChange={action('On Change')}
        checked={boolean('Checked', true)}
        label='Label'
        />
    );
  });