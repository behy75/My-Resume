import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './Inputs/TextInput';
import PhoneInput from './Inputs/PhoneInput';
import EmailInput from './Inputs/EmailInput';
import TwoColumns from './TwoColumns';
import Textarea from './Inputs/Textarea';
import SelectPageInput from './Inputs/SelectPageInput';
import TextInputForSkill from './Inputs/TextInputForSkill';
import Button from './Buttons';
import DatePicker from './Inputs/DatePicker';

function FieldControls({ type, isTwoColumn, ...rest }) {
  if (isTwoColumn) {
    return <TwoColumns {...rest} type={type} />;
  }

  switch (type) {
    case 'text':
      return <TextInput {...rest} />;
    case 'text_skill':
      return <TextInputForSkill {...rest} />;
    case 'phone':
      return <PhoneInput {...rest} />;
    case 'email':
      return <EmailInput {...rest} />;
    case 'text_area':
      return <Textarea {...rest} />;
    case 'select_page':
      return <SelectPageInput {...rest} />;
    case 'date_picker':
      return <DatePicker {...rest} />;
    case 'button':
      return <Button {...rest} />;
    default:
      console.error(`Invalid input type: ${type}`);
      return null;
  }
}

FieldControls.propTypes = {
  type: PropTypes.oneOf([
    'text',
    'text_skill',
    'phone',
    'email',
    'text_area',
    'select_page',
    'date_picker',
    'button',
  ]).isRequired,
  isTwoColumn: PropTypes.bool,
};

export default FieldControls;
