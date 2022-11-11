import errorImg from './error.jpg';
import PropTypes from 'prop-types';

export default function ErrorMessage({ message }) {
  return (
    <div role="alert">
      <img src={errorImg} alt="error" width="900px" />
      {message}
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
