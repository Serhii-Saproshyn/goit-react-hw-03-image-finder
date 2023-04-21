import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallerty from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';

export class App extends Component {
  state = {
    searchName: '',
    loading: false,
  };

  handleFormSubmit = searchName => {
    this.setState({ searchName });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallerty searchName={this.state.searchName} />
        <ToastContainer autoClose={3000} theme="colored" />
      </>
    );
  }
}
