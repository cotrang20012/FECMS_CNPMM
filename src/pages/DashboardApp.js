import { faker } from '@faker-js/faker';

// @mui
import { Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// components
import Iconify from '../components/Iconify';
import Page from '../components/Page';
// sections
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import billApi from 'src/apis/billApi';
import novelApi from 'src/apis/novelsApi';
import userApi from 'src/apis/userApi';
import { getBills } from 'src/redux/billSlice';
import { countChapter, countNovel } from 'src/redux/novelSlice';
import { countUser } from 'src/redux/userSlice';
import {
  AppConversionRates,
  AppCurrentSubject,
  AppCurrentVisits,
  AppNewsUpdate,
  AppOrderTimeline,
  AppTasks,
  AppTrafficBySite,
  AppWebsiteVisits,
  AppWidgetSummary,
} from '../sections/@dashboard/app';
import { format } from 'date-fns';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const [totalRevenue, setToalRevenue] = useState(0);
  const [revenue, setRevenue] = useState([]);
  const { chapterNumber, novelNumber } = useSelector((state) => state.novel);
  const { userNumber, users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    if (!accessToken) {
      naviagate('/login');
    }
    const handleCountNovels = async () => {
      const resp = await novelApi.getCountNovel();

      dispatch(countNovel(resp?.data.novelNumber));
    };
    const handleCountChapters = async () => {
      const resp = await novelApi.getCountChapter();
      dispatch(countChapter(resp?.data.chapterNumber));
    };
    const countAccounts = async () => {
      const resp = await userApi.getCountAccount();
      dispatch(countUser(resp?.data.accountNumber));
      // setCount({ ...count, user: resp.data.accountNumber });
    };
    const handleGetBills = async () => {
      const resp = await billApi.getBills();
      dispatch(getBills(resp?.data));
    };
    const handleGetRevenue = async () => {
      const resp = await billApi.getTotalRevenue();
      const total = resp?.data?.totalRevenue;
      setToalRevenue(total);
    };
    const handleGetRevenueByDate = async () => {
      const resp = await billApi.getRevenueByDay();
      const data = resp?.data;
      setRevenue(data);
    };
    handleGetRevenueByDate();
    handleGetRevenue();
    handleGetBills();
    countAccounts();
    handleCountChapters();
    handleCountNovels();
  }, []);
  // if (revenue) {
  //   const dateArray = revenue.map((item) => {
  //     return item.dateAdd;
  //   });
  //   console.log('🚀 ~ dateArray ~ dateArray', dateArray);
  //   const amountArray = revenue.map((item) => {
  //     return item.amount;
  //   });
  //   console.log('🚀 ~ dateArray ~ amount', amountArray);
  // }
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          😍😚 Chào mừng admin trở lại 😎🤩
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Số người dùng" total={userNumber} icon={'bxs:user'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Tổng chương" total={chapterNumber} color="info" icon={'bi:book-half'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Tổng truyện" total={novelNumber} color="warning" icon={'bxs:book-alt'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Tổng doanh thu" total={totalRevenue} color="success" icon={'jam:coin-f'} />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <AppWebsiteVisits
              title="Doanh thu theo thời gian"
              subheader="Tổng hợp doanh thu"
              chartLabels={revenue.map((item) => {
                return item.dateAdd;
              })}
              chartData={[
                {
                  name: 'Doanh Thu',
                  type: 'area',
                  fill: 'gradient',
                  data: revenue.map((item) => {
                    return item.amount;
                  }),
                },
                // {
                //   name: 'Team B',
                //   type: 'area',
                //   fill: 'gradient',
                //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                // },
                // {
                //   name: 'Team C',
                //   type: 'line',
                //   fill: 'solid',
                //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                // },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <AppWebsiteVisits
              title="Doanh thu theo thời gian"
              subheader="Tổng hợp doanh thu"
              chartLabels={revenue.map((item) => {
                return item.dateAdd;
              })}
              chartData={[
                {
                  name: 'Doanh Thu',
                  type: 'bar',
                  fill: 'line',
                  data: revenue.map((item) => {
                    return item.amount;
                  }),
                },
                // {
                //   name: 'Team B',
                //   type: 'area',
                //   fill: 'gradient',
                //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                // },
                // {
                //   name: 'Team C',
                //   type: 'line',
                //   fill: 'solid',
                //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                // },
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
