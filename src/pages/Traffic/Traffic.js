import { useState } from 'react';
// material
import { Container, Paper, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
// mock
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import novelApi from 'src/apis/novelsApi';
import { getNovels } from 'src/redux/novelSlice';
import { useNavigate } from 'react-router-dom';
import trafficApi from 'src/apis/trafficApi';
import { setTraffics } from 'src/redux/trafficSlice';
import BarChartPoint from './BarChartPoint';
import moment from 'moment';

// ----------------------------------------------------------------------

export default function Traffic() {
  const [openFilter, setOpenFilter] = useState(false);
  const { traffics } = useSelector((state) => state.traffic);
  const trafficList = traffics.map((traffic) => ({
    label: moment(traffic?.date).toISOString().substring(0, 10),
    count: traffic?.count,
  }));
  const dispatch = useDispatch();
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  useEffect(() => {
    const handleGetTraffics = async () => {
      const resp = await trafficApi.getAllTraffic();
      dispatch(setTraffics(resp?.data?.traffics));
    };
    handleGetTraffics();
  }, [dispatch]);
  // check access token
  const accessToken = localStorage.getItem('accessToken');
  const naviagate = useNavigate();
  useEffect(() => {
    if (!accessToken) {
      naviagate('/login');
    }
  }, []);
  return (
    <Page title="Traffics">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Traffics
        </Typography>

        <Paper>
          <BarChartPoint seriesData={trafficList} />
        </Paper>
      </Container>
    </Page>
  );
}
