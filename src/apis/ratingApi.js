import axiosClient from './apiClient';

class RatingApi {
  getListRating = () => {
    const url = '/admin/rating/getlistratings';
    return axiosClient.get(url);
  };
  deleteRating = (id) => {
    const url = `/admin/rating/deleterating?id=${id}`;
    return axiosClient.get(url);
  };
}

const ratingApi = new RatingApi();
export default ratingApi;
