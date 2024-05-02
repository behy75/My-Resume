import React from 'react';
import TextInput from './TextInput';
import PhoneInput from './PhoneInput';
import EmailInput from './EmailInput';
import TwoColumns from './TwoColumns';
import Textarea from './Textarea';
const twoColumns = ['Website URL', 'Linkedin', 'Git Hub', 'Email', 'Phone'];

export default function DynamicInput({ type, isTwoColumn, ...rest }) {
  if (isTwoColumn) {
    return <TwoColumns {...rest} type={type} />;
  }
  switch (type) {
    case 'text':
      return <TextInput {...rest} />;
    case 'phone':
      return <PhoneInput {...rest} />;
    case 'email':
      return <EmailInput {...rest} />;
    case 'text_area':
      return <Textarea {...rest} />;
    default:
      return null; // Render nothing for unknown types
  }
}
