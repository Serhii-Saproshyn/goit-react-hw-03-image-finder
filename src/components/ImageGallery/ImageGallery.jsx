import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallerty = ({ data }) => {
  return (
    <>
      {data && (
        <ul className={css.ImageGallery}>
          {data.map(({ id, tags, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webFormatUrl={webformatURL}
              largeImageUrl={largeImageURL}
              tags={tags}
            />
          ))}
        </ul>
      )}
    </>
  );
};

ImageGallerty.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired
  ),
};
