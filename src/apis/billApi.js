import axiosClient from './apiClient';

class BillApi {
  getBills = () => {
    const url = `/admin/bills/getbills`;
    return axiosClient.get(url);
  };
}

const billApi = new BillApi();
export default billApi;
