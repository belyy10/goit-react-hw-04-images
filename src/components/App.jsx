import axios from 'axios';
import { Component } from 'react';
import { Container } from './App.styled';
import SearchBar from './Searchbar/Searchbar';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { LoadMore } from './Button/Button';
import { Loader } from './Loader/Loader';

export default class App extends Component {
  state = {
    search: '',
    loading: false,
    error: null,
    pictures: [],
    showButton: false,
    page: 1,
  };
  async componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      try {
        this.setState({ loading: true });
        const response = await axios.get('https://pixabay.com/api/', {
          params: {
            key: '30103924-a4773e2d607068596576fe7b3',
            q: search,
            image_type: 'photo',
            safesearch: true,
            per_page: 12,
            page: page,
          },
        });
        const data = response.data;
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...data.hits],
        }));
        if (data.dataHits === 0) {
          Notify.failure(
            `Sorry, there are no images matching your search query. Please try again.`
          );
          return;
        }
        if (data.hits.length < 12) {
          this.setState({ showButton: false });
        } else {
          this.setState({ showButton: true });
        }
      } catch (error) {
        console.log(error);
        this.setState({ error: 'Sorry, reloading this page' });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleFormSubmit = search => {
    this.setState({ search: search, page: 1, pictures: [] });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    const { error, pictures, showButton, loading } = this.state;
    return (
      <Container>
        <SearchBar onSubmit={this.handleFormSubmit} />
        {error && <ErrorMessage message={'Sorry, this request is failed'} />}
        {loading && <Loader />}
        {pictures.length > 0 && <ImageGallery pictures={pictures} />}
        {showButton && <LoadMore loadMore={this.loadMore} />}
      </Container>
    );
  }
}
