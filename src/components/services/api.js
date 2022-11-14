import axios from 'axios';

export const getPictures = async (search, page) => {
  return await axios
    .get('https://pixabay.com/api/', {
      params: {
        key: '30103924-a4773e2d607068596576fe7b3',
        q: search,
        image_type: 'photo',
        safesearch: true,
        per_page: 12,
        page: page,
      },
    })
    .then(response => response.data);
};
