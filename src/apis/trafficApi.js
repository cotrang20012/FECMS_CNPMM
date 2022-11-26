import axiosClient from './apiClient';

class TrafficApi {
  getAllTraffic = () => {
    const url = `/traffic/getAll`;
    return axiosClient.get(url);
  };
}

const trafficApi = new TrafficApi();
export default trafficApi;
