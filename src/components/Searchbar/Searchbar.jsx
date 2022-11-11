import { Component } from 'react';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';
import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormLabel,
  SearchFormInput,
} from './Searchbar.styled';

export default class SearchBar extends Component {
  state = {
    search: '',
  };
  handleChange = e => {
    this.setState({ search: e.currentTarget.value.toLowerCase() });
  };
  handleSumbit = e => {
    e.preventDefault();
    if (this.state.search.trim() === '') {
      Notiflix.Notify.failure('Enter the name of the images to search');
      return;
    }
    this.props.onSubmit(this.state.search);
    this.setState({ search: '' });
  };
  render() {
    return (
      <Searchbar>
        <SearchForm onSubmit={this.handleSumbit}>
          <SearchFormButton type="submit">
            <FcSearch size="40px" />
            <SearchFormLabel>Search</SearchFormLabel>
          </SearchFormButton>
          <SearchFormInput
            name="search"
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.search}
            onChange={this.handleChange}
          />
        </SearchForm>
      </Searchbar>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
