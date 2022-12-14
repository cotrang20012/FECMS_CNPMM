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
  getNovelReview = () => {
    const url = `/admin/novel/getnovelreview`;
    return axiosClient.get(url);
  };
  getNovelByUrl = (novelUrl) => {
    const url = `/admin/novel/getnovelreviewbyurl`;
    return axiosClient.post(url, { url: novelUrl });
  };
  deleteNovels = (novelId) => {
    const url = `/admin/novel/deletenovel`;
    return axiosClient.post(url, { novelId });
  };
}

const novelApi = new NovelApi();
export default novelApi;
