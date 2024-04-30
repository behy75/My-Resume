import React from 'react';
import TextInput from './TextInput';

export default function DynamicInput({ type, ...rest }) {
  switch (type) {
    case 'text':
      return <TextInput {...rest} />;
    // case 'select':
    //   return <SelectInput {...rest} />;
    // Add more cases for other input types as needed
    default:
      return null; // Render nothing for unknown types
  }
}
