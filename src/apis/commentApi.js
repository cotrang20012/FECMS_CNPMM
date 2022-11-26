import axiosClient from './apiClient';

class CommentApi {
  getListComment = () => {
    const url = `/admin/comment/getlistcomments`;
    return axiosClient.get(url);
  };
}

const commentApi = new CommentApi();
export default commentApi;
