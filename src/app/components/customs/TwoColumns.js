import React, { useEffect, useState } from 'react';
import TextInput from './Inputs/TextInput';
import FieldControls from './FieldControls';

export default function TwoColumns(props) {
  const { title, setValue, displayName, value } = props;
  const [state, setState] = useState({ displayName, link: value, name: title });

  useEffect(() => setValue(state), [state]);

  return (
    <div className="sm:flex justify-between sm:col-span-2">
      <div className="sm:w-[48.5%]">
        <FieldControls
          {...props}
          value={state.displayName}
          setValue={displayName =>
            setState(prevState => ({ ...prevState, displayName }))
          }
          title={`Display Name of ${title}`}
          type="text"
        />
      </div>
      <div className="mt-5 sm:mt-0 sm:w-[48.5%]">
        <FieldControls
          {...props}
          isTwoColumn={false}
          title="Link"
          value={state.link}
          setValue={link => setState(prevState => ({ ...prevState, link }))}
        />
      </div>
    </div>
  );
}
