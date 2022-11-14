import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from 'components/Modal/Modal';

export function ImageGalleryItem({ webformatURL, tags, largeImageURL }) {
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <>
      <GalleryItem onClick={toggleModal}>
        <GalleryItemImage src={webformatURL} alt={tags} />
        {openModal && (
          <Modal url={largeImageURL} alt={tags} onClose={toggleModal} />
        )}
      </GalleryItem>
    </>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
