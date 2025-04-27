import React, { useEffect } from 'react';
import styles from './Modal.module.css';
import { ModalProps } from '../types';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // Use useEffect to handle side effects.
  useEffect(() => {
    // Define the function to be called when the escape key is pressed.
    const closeOnEscapeKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    
    // Add the event listener for the 'keydown' event on the document body.
    document.body.addEventListener('keydown', closeOnEscapeKey);
    
    // Return a cleanup function that removes the event listener.
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [onClose]); // Depend on onClose to recreate the listener when it changes.

  // Do not render the modal if it's not open.
  if (!isOpen) return null;

  // Render the modal markup.
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;