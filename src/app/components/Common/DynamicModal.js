import React, { useState } from 'react';
import { AnimatePresence, motion, useCycle } from 'framer-motion';
import FieldControls from './FieldControls';
import {
  dynamicModalVariants,
  inputsVariants,
  skillsVariants,
} from './FramerMotionVariants';

const Path = props => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

// Higher Order Component to render a modal with dynamic input fields
const withDynamicModal = WrappedComponent => {
  return function DynamicModal({ ...rest }) {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const [clickOrigin, setClickOrigin] = useState({ x: 0, y: 0 });

    const bottomPosition = rest.title.includes('Social')
      ? 'bottom-6'
      : 'bottom-1';

    const toggleModal = () => {
      toggleOpen(!isOpen);
    };

    const handleOpenModal = event => {
      setClickOrigin({ x: event.clientX, y: event.clientY });
      toggleOpen(!isOpen);
    };

    return (
      <AnimatePresence>
        <motion.div
          initial={false}
          animate={isOpen ? 'visible' : 'hidden'}
          className={`absolute right-0 ${bottomPosition}`}
        >
          <button className="relative" onClick={handleOpenModal}>
            <svg width="15" height="15" viewBox="0 0 20 20">
              <Path
                variants={{
                  visible: { d: 'M 3 16.5 L 17 2.5' },
                  hidden: { d: 'M 2 2.5 L 20 2.5' },
                }}
              />
              <Path
                variants={{
                  visible: { d: 'M 3 2.5 L 17 16.346' },
                  hidden: { d: 'M 2 16.346 L 20 16.346' },
                }}
              />
            </svg>
          </button>

          {isOpen && (
            <motion.div
              variants={dynamicModalVariants(clickOrigin)}
              initial="hidden"
              animate="visible"
              exit="hidden"
              id="default-modal"
              className="fixed inset-0 z-50 overflow-y-auto items-center justify-center flex"
            >
              <WrappedComponent toggleModal={toggleModal} {...rest} />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };
};

// Modal component with dynamic input fields
function ModalContent({
  title,
  fields = [],
  items = [],
  toggleModal,
  onSubmit,
}) {
  const onSubmitModal = () => {
    onSubmit();
    toggleModal();
  };

  return (
    <div className="relative p-4 w-full max-w-5xl max-h-full">
      <motion.div
        drag
        dragConstraints={{ left: -500, right: 500, top: -250, bottom: 250 }}
        className="relative rounded-lg shadow bg-gray-700"
      >
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
            <div className="grid gap-6 mb-6 md:grid-cols-6 justify-items-start">
              <AnimatePresence mode={'sync'}>
                {items.map((item, index) => (
                  <motion.div
                    variants={skillsVariants}
                    animate="visible"
                    exit="exit"
                    whileHover="hover"
                    onClick={() => item.removeItem(index)}
                    key={index}
                    className="relative flex justify-center items-center"
                  >
                    <div className="pr-1">
                      <svg
                        className="text-gray-400 dark:text-gray-500 w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    {item.name}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
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
            className="py-2.5 w-20 text-sm font-medium focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Decline
          </button>
          <button
            onClick={onSubmitModal}
            data-modal-hide="default-modal"
            type="button"
            className="text-white ms-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-20 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// Exporting the wrapped component with HOC
export default withDynamicModal(ModalContent);
