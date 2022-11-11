import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
import { Component } from 'react';
import Modal from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    openModal: false,
  };
  toggleModal = () => {
    this.setState(openModal => ({ openModal: !openModal.openModal }));
  };
  render() {
    const { webformatURL, tags, largeImageURL } = this.props;
    return (
      <>
        <GalleryItem onClick={this.toggleModal}>
          <GalleryItemImage src={webformatURL} alt={tags} />
          {this.state.openModal && (
            <Modal url={largeImageURL} alt={tags} onClose={this.toggleModal} />
          )}
        </GalleryItem>
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
