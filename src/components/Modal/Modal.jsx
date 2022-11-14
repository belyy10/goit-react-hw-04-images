import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalWindow, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';
const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, url, alt }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  });
  const handleKeydown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  const handleBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdrop}>
      <ModalWindow>
        <img src={url} alt={alt} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
