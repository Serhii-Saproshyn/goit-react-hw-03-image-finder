import { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Loader } from '../Loader/Loader';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import css from './ImageGallery.module.css';

const API_KEY = '34300541-9ea07d11e1c55e84f488b0732';
const BASE_URL = `https://pixabay.com/api/`;

export default class ImageGallerty extends Component {
  state = {
    data: [],
    loading: false,
    haveMore: false,
    page: 1,
  };

  clearData = () => {
    this.setState({ data: [] });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchName !== this.props.searchName ||
      prevState.page !== this.state.page
    ) {
      if (prevProps.searchName !== this.props.searchName) {
        this.clearData();
        this.setState({ page: 1 });
      }
      this.setState({ loading: true, loadMore: true, moreImages: true });
      const response = await axios.get(
        `${BASE_URL}?q=${this.props.searchName}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      if (response.data.hits.length < 12 && response.data.hits.length > 0) {
        toast.info('You have seen all the pictures');
      }
      if (response.data.hits.length === 0) {
        toast.error('Sorry, we did not find any images for your request :(');
        this.setState({ loadMore: false });
      } else {
        this.setState(prevState => ({
          data: [...prevState.data, ...response.data.hits],
          haveMore: response.data.hits.length === 12,
        }));
      }
      this.setState({ loading: false });
    }
  }

  render() {
    const { data, loading, loadMore, haveMore } = this.state;
    return (
      <>
        {loading && <Loader />}
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
        {loadMore && haveMore && <Button onClick={this.loadMore} />}
      </>
    );
  }
}

ImageGallerty.propTypes = {
  searchName: PropTypes.string.isRequired,
  // page: PropTypes.string.isRequired,
};
