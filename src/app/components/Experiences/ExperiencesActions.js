export const handleSelectPage = (val, setState) => {
  if (val == 'new') {
    setState(prevState => ({
      ...prevState,
      listOfExperiences: [
        ...prevState.listOfExperiences,
        {
          role: '',
          nameOfCompany: '',
          websiteURL: '',
          arrivalDate: '',
          departureDate: '',
          toDoList: [],
        },
      ],
      pageNumber: prevState.listOfExperiences.length,
    }));
    return;
  }
  setState(prevState => ({ ...prevState, pageNumber: val }));
};

export const handleRemovePage = (state, setState) => {
  if (state.listOfExperiences.length == 1) {
    return;
  }

  setTimeout(() => {
    setState(prevState => ({
      ...prevState,
      listOfExperiences: [
        ...prevState.listOfExperiences.filter(
          (item, index) => index !== state.pageNumber
        ),
      ],
      pageNumber: 0,
    }));
  });
};

export const handleSetValue = (item, field, setState) => {
  const newField =
    item == 'skills'
      ? field.split(',')
      : item == 'activities'
      ? field.split('\n')
      : field;

  setState(prevState => {
    const updatedListOfExperiences = [...prevState.listOfExperiences];
    updatedListOfExperiences[prevState.pageNumber] = {
      ...updatedListOfExperiences[prevState.pageNumber],
      [item]: newField,
    };
    return {
      ...prevState,
      listOfExperiences: updatedListOfExperiences,
    };
  });
};
