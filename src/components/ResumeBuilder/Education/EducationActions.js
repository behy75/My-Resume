export const handleSelectPage = (val, setState) => {
  if (val == 'new') {
    setState(prevState => ({
      ...prevState,
      listOfEducation: [
        ...prevState.listOfEducation,
        {
          nameOfCollege: '',
          arrivalDate: '',
          departureDate: '',
          field: '',
          major: '',
          minor: '',
          grade: '',
          skills: [],
        },
      ],
      pageNumber: prevState.listOfEducation.length,
    }));
    return;
  }
  setState(prevState => ({ ...prevState, pageNumber: val }));
};

export const handleRemovePage = (state, setState) => {
  if (state.listOfEducation.length == 1) {
    return;
  }

  setTimeout(() => {
    setState(prevState => ({
      ...prevState,
      listOfEducation: [
        ...prevState.listOfEducation.filter(
          (item, index) => index !== state.pageNumber
        ),
      ],
      pageNumber: 0,
    }));
  });
};

export const handleSetValue = (item, field, setState) => {
  const newField = item == 'skills' ? field.split(',') : field;

  setState(prevState => {
    const updatedListOfEducation = [...prevState.listOfEducation];
    updatedListOfEducation[prevState.pageNumber] = {
      ...updatedListOfEducation[prevState.pageNumber],
      [item]: newField,
    };
    return {
      ...prevState,
      listOfEducation: updatedListOfEducation,
    };
  });
};
