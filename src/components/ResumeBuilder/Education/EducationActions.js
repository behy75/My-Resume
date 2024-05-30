import { notifyError, notifySuccess } from '@/components/Common/Notify';
import { ConfirmationToast } from '@/utils/common';
import { toast } from 'react-toastify';

export const handleSelectPage = (val, setState) => {
  if (val == 'new') {
    setState(prevState => ({
      ...prevState,
      listOfColleges: [
        ...prevState.listOfColleges,
        {
          nameOfCollege: '',
          arrivalDate: '',
          departureDate: '',
          field: '',
          major: '',
          minor: '',
          grade: '',
          skills: '',
        },
      ],
      pageNumber: prevState.listOfColleges.length,
    }));
    return;
  }
  setState(prevState => ({ ...prevState, pageNumber: val }));
};

export const handleRemovePage = (
  state,
  setState,
  deleteCollege,
  deleteCollegeData,
  deleteCollegeError,
  deleteCollegeIsLoading
) => {
  if (state.listOfColleges.length == 1) {
    return;
  }

  const handleConfirm = () => {
    const onSuccess = () => {
      notifySuccess(
        deleteCollegeData?.message || 'Selected College successfully deleted.'
      );
      setTimeout(() => {
        setState(prevState => ({
          ...prevState,
          listOfColleges: [
            ...prevState.listOfColleges.filter(
              (item, index) => index !== state.pageNumber
            ),
          ],
          pageNumber: 0,
        }));
      });
    };
    const onError = () => {
      notifyError(deleteCollegeError?.message || 'Request failed.');
    };

    const payload = {
      college_id_for_user:
        state.listOfColleges[state.pageNumber].collegeIdForUser,
    };
    deleteCollege(payload, { onSuccess, onError });
    toast.dismiss();
  };

  const handleCancel = () => {
    console.log('Cancelled!');
    toast.dismiss();
  };

  toast.warning(
    <ConfirmationToast
      message="Are you sure you want to remove this section?"
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      deleteCollegeIsLoading={deleteCollegeIsLoading}
    />,
    {
      position: 'top-center',
      autoClose: false, // Disable auto-close
    }
  );
};

export const handleSetValue = (item, field, setState) => {
  setState(prevState => {
    const updatedListOfEducation = [...prevState.listOfColleges];
    updatedListOfEducation[prevState.pageNumber] = {
      ...updatedListOfEducation[prevState.pageNumber],
      [item]: field,
    };
    return {
      ...prevState,
      listOfColleges: updatedListOfEducation,
    };
  });
};
