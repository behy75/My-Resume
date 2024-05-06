import React, { useState } from 'react';
import FieldControls from './FieldControls';

// Higher Order Component to render a modal with dynamic input fields
const withDynamicModal = WrappedComponent => {
  return function DynamicModal({ fields, ...rest }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="absolute right-0 bottom-6">
        <button
          onClick={toggleModal}
          data-modal-target="default-modal"
          data-modal-toggle="default-modal"
          className="right-10 text-xs text-white text-white bg-white font-medium rounded-lg text-sm p-2 text-center border-2"
          type="button"
        ></button>

        <div
          id="default-modal"
          className={`fixed inset-0 z-50 overflow-y-auto items-center justify-center ${
            isOpen ? 'flex' : 'hidden'
          }`}
        >
          <WrappedComponent
            fields={fields}
            toggleModal={toggleModal}
            {...rest}
          />
        </div>
      </div>
    );
  };
};

// Modal component with dynamic input fields
function ModalContent({ title, fields, toggleModal, onSubmit }) {
  const onSubmitModal = () => {
    onSubmit();
    toggleModal();
  };

  return (
    <div className="relative p-4 w-full max-w-4xl max-h-full">
      <div className="relative rounded-lg shadow bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <button
            onClick={toggleModal}
            type="button"
            className="text-white bg-transparent hover:bg-gray-200rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="default-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="p-4 md:p-5 space-y-4 text-white">
          <form>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
              {fields.map((field, index) => (
                <FieldControls
                  key={index}
                  title={field.title}
                  type={field.type}
                  value={field.value}
                  displayName={field.displayName}
                  setValue={field.setValue}
                  placeholder={field.placeholder}
                  isTwoColumn={!!field.isTwoColumn}
                />
              ))}
            </div>
          </form>
        </div>
        <div className="flex justify-end items-center text-gray-600 p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-800">
          <button
            onClick={toggleModal}
            data-modal-hide="default-modal"
            type="button"
            className="py-2.5 px-5 text-sm font-medium focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Decline
          </button>
          <button
            onClick={onSubmitModal}
            data-modal-hide="default-modal"
            type="button"
            className="text-white ms-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// Exporting the wrapped component with HOC
export default withDynamicModal(ModalContent);