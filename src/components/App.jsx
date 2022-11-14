import { useEffect, useState } from 'react';
import { Container } from './App.styled';
import SearchBar from './Searchbar/Searchbar';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './Button/Button';
import { Loader } from './Loader/Loader';
import { getPictures } from './services/api';

export default function App() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pictures, setPictures] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (search !== '') {
      getPictures(search, page)
        .then(response => {
          if (response.dataHits === 0) {
            Notify.failure(
              `Sorry, there are no images matching your search query. Please try again.`
            );
            return;
          }
          response.hits.length < 12
            ? setShowButton(false)
            : setShowButton(true);
          setPictures(prevState => [...prevState, ...response.hits]);
        })
        .catch(error => {
          console.log(error);
          setError('Sorry, reloading this page');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [search, page]);

  const handleFormSubmit = search => {
    setSearch(search);
    setPage(1);
    setPictures([]);
  };
  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <Container>
      <SearchBar onSubmit={handleFormSubmit} />
      {error && <ErrorMessage message={'Sorry, this request is failed'} />}
      {loading && <Loader />}
      {pictures.length > 0 && <ImageGallery pictures={pictures} />}
      {showButton && <LoadMore loadMore={loadMore} />}
    </Container>
  );
}
