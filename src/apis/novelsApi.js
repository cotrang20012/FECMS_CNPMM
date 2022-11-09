import axiosClient from './apiClient';

class NovelApi {
  getCountChapter = () => {
    const url = `/statistic/countChapters`;
    return axiosClient.get(url);
  };
  getCountNovel = () => {
    const url = `/statistic/countNovels`;
    return axiosClient.get(url);
  };
  getNovels = () => {
    const url = `/admin/novel/getnovels`;
    return axiosClient.get(url);
  };
  deleteNovels = (novelId) => {
    const url = `/admin/novel/deletenovel`;
    return axiosClient.post(url, { novelId });
  };
}

const novelApi = new NovelApi();
export default novelApi;
