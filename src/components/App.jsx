import { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallerty } from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';

const API_KEY = '34300541-9ea07d11e1c55e84f488b0732';
const BASE_URL = `https://pixabay.com/api/`;

export class App extends Component {
  state = {
    searchName: '',
    loading: false,
    data: [],
    page: 1,
    totalImages: 0,
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
      prevState.searchName !== this.state.searchName ||
      prevState.page !== this.state.page
    ) {
      this.setState({
        loading: true,
      });
      const response = await axios.get(
        `${BASE_URL}?q=${this.state.searchName}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const totalHits = await response.data.totalHits;

      this.setState({
        totalImages: totalHits,
      });
      if (response.data.hits.length < 12 && response.data.hits.length > 0) {
        toast.info('You have seen all the pictures');
      }
      if (response.data.hits.length === 0) {
        toast.error('Sorry, we did not find any images for your request :(');
        this.setState({ loadMore: false });
      } else {
        this.setState(prevState => ({
          data: [
            ...prevState.data,
            ...this.normalaziedData(response.data.hits),
          ],
        }));
      }
      this.setState({ loading: false });
    }
  }
  normalaziedData(arr) {
    return arr.map(({ id, tags, webformatURL, largeImageURL }) => ({
      id,
      tags,
      webformatURL,
      largeImageURL,
    }));
  }

  handleFormSubmit = searchName => {
    this.setState({ searchName, data: [], page: 1 });
  };

  render() {
    const { data, loading, totalImages } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {loading && <Loader />}
        {data.length !== 0 && <ImageGallerty data={data} />}
        {data.length !== 0 && data.length < totalImages && (
          <Button onClick={this.loadMore} />
        )}
        <ToastContainer autoClose={3000} theme="colored" />
      </>
    );
  }
}
