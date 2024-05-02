import React, { useEffect, useState } from 'react';
import TextInput from './TextInput';
import DynamicInput from './DynamicInput';

export default function TwoColumns(props) {
  const { title, setValue, displayName, value } = props;
  const [state, setState] = useState({ displayName, link: value, name: title });

  useEffect(() => setValue(state), [state]);

  return (
    <div className="flex justify-between col-span-2">
      <TextInput
        {...props}
        value={state.displayName}
        setValue={displayName =>
          setState(prevState => ({ ...prevState, displayName }))
        }
        title={`Display Name of ${title}`}
      />
      <DynamicInput
        {...props}
        isTwoColumn={false}
        title={`Link`}
        value={state.link}
        setValue={link => setState(prevState => ({ ...prevState, link }))}
      />
    </div>
  );
}
