import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';
export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    const { showModal } = this.state;
    const { id, webFormatUrl, largeImageUrl, tags } = this.props;
    return (
      <li className={css.ImageGalleryItem} key={id}>
        <img
          onClick={this.toggleModal}
          className={css.ImageGalleryItemImage}
          src={webFormatUrl}
          alt={tags}
        />

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageUrl} alt={tags} />
          </Modal>
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webFormatUrl: PropTypes.string.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
