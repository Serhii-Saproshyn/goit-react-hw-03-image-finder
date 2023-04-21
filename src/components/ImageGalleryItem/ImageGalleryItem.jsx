import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({ id, webFormatUrl, tags }) => {
  return (
    <li className={css.ImageGalleryItem} key={id}>
      <img
        className={css.ImageGalleryItemImage}
        src={webFormatUrl}
        alt={tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
};
