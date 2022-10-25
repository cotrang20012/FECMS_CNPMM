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
}

const novelApi = new NovelApi();
export default novelApi;
