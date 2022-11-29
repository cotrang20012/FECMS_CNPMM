import axiosClient from './apiClient';

class CommentApi {
  getListComment = () => {
    const url = `/admin/comment/getlistcomments`;
    return axiosClient.get(url);
  };
  deleteComment = (id) => {
    const url = `/admin/comment/deletecomment?id=${id}`;
    return axiosClient.get(url);
  };
}

const commentApi = new CommentApi();
export default commentApi;
