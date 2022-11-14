import { useState } from 'react';
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

export default function SearchBar({ onSubmit }) {
  const [search, setSearch] = useState('');
  const handleChange = e => {
    setSearch(e.currentTarget.value.toLowerCase());
  };
  const handleSumbit = e => {
    e.preventDefault();
    if (search.trim() === '') {
      Notiflix.Notify.failure('Enter the name of the images to search');
      return;
    }
    onSubmit(search);
    setSearch('');
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={handleSumbit}>
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
          value={search}
          onChange={handleChange}
        />
      </SearchForm>
    </Searchbar>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
