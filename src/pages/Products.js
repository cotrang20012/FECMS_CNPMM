import { useState } from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import novelApi from 'src/apis/novelsApi';
import { getNovels } from 'src/redux/novelSlice';

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
      const resp = await novelApi.getNovels();
      dispatch(getNovels(resp?.data));
    };
    handleGetNovels();
  }, [dispatch]);

  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={novelList} />
        <ProductCartWidget />
      </Container>
    </Page>
  );
}
