import { useState } from 'react';
// material
import { Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { ProductList } from '../sections/@dashboard/products';
// mock
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import novelApi from 'src/apis/novelsApi';
import { getNovels } from 'src/redux/novelSlice';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);
  const { novels } = useSelector((state) => state.novel);
  const novelList = novels.map((novel) => ({
    id: novel?._id,
    author: novel?.author,
    genre: novel?.type,
    name: novel?.name,
    image: novel?.image,
    status: novel?.state,
    comments: novel?.comments,
    ratings: novel?.ratings,
  }));
  const dispatch = useDispatch();
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    const handleGetNovels = async () => {
      const resp = await novelApi.getNovelReview();
      dispatch(getNovels(resp?.data));
    };
    handleGetNovels();
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
    <Page title="Novels">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Novels
        </Typography>

        <ProductList products={novelList} />
      </Container>
    </Page>
  );
}
