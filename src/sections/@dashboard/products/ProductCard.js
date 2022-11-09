import PropTypes from 'prop-types';
// material
import { Box, Card, Typography, Stack, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils

// components
import Label from '../../../components/Label';
import Iconify from 'src/components/Iconify';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  // const { name, cover, status } = product;
  const { id, author, genre, name, image, status } = product;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        <ProductImgStyle alt={name} src={image} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography className="" variant="subtitle2" style={nameStoryStyled} noWrap>
            {name}
          </Typography>
          <IconButton>
            <Iconify icon="eva:more-horizontal-fill" width={20} height={20} />
          </IconButton>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}

          <Typography variant="subtitle1">{author}</Typography>
          <Typography variant="subtitle1">{genre}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

const nameStoryStyled = {
  whiteSpace: 'nowrap',
  WebkitLineClamp: '1',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  OTextOverflow: 'ellipsis',
  textOverflow: 'ellipsis',
};
