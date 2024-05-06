import React from 'react';
import TextInput from './Inputs/TextInput';
import PhoneInput from './Inputs/PhoneInput';
import EmailInput from './Inputs/EmailInput';
import TwoColumns from './Inputs/TwoColumns';
import Textarea from './Inputs/Textarea';
import SelectPageInput from './Inputs/SelectPageInput';
import Button from './Buttons';

export default function FieldControls({ type, isTwoColumn, ...rest }) {
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
    case 'select_page':
      return <SelectPageInput {...rest} />;
    case 'button':
      return <Button {...rest} />;
    default:
      return null; // Render nothing for unknown types
  }
}
