import { Button } from './Button.styled';
import PropTypes from 'prop-types';

export const LoadMore = ({ loadMore }) => {
  return (
    <Button type="button" onClick={loadMore}>
      Load More
    </Button>
  );
};

LoadMore.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
