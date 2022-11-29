import { Box, Grid, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useEffect } from 'react';
import novelApi from 'src/apis/novelsApi';
import { useState } from 'react';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import commentApi from 'src/apis/commentApi';
import ratingApi from 'src/apis/ratingApi';
const NovelDetails = () => {
  const [novel, setNovel] = useState();
  const [comment, setComment] = useState();
  const [rating, stRating] = useState();
  const { url } = useParams();

  // Fetch data
  useEffect(() => {
    const handleGetNovelByUrl = async () => {
      const resp = await novelApi.getNovelByUrl(url);
      const data = resp?.data?.reviewNovelInfo;
      setNovel(data);
      setComment(data?.comments);
      stRating(data?.ratings);
    };
    handleGetNovelByUrl();
  }, [url]);
  // Render Star base on number
  const renderStar = (number) => {
    let sumStar = '';
    for (let i = 0; i < number; i++) {
      sumStar += '⭐';
    }
    return sumStar;
  };
  // Delete comment function
  const handleDeleteComment = async (id) => {
    try {
      const resp = await commentApi.deleteComment(id);
      if (resp.status === 200) {
        toast.success('Xóa đánh giá thành công');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.error('Xóa đánh giá thất bại');
      }
    } catch (error) {
      toast.error('Xóa bình luận thất bại');
      throw error;
    }
  };
  const handleDeleteRating = async (id) => {
    try {
      const resp = await ratingApi.deleteRating(id);
      if (resp.status === 200) {
        toast.success('Xóa đánh giá thành công');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.error('Xóa đánh giá thất bại');
      }
    } catch (error) {
      toast.error('Xóa đánh giá thất bại (lỗi hệ thống)');
      throw error;
    }
  };
  // Define comments columns
  const commentsColumns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'Username', width: 90 },
    {
      field: 'displayName',
      headerName: 'Tên hiển thị',
      width: 150,
      // editable: true,
    },
    {
      field: 'dateCreated',
      headerName: 'Ngày tạo',
      width: 150,
    },
    {
      field: 'timeCreated',
      headerName: 'Thời gian tạo',
      type: 'number',
      width: 110,
    },
    {
      field: 'content',
      headerName: 'Nội dung',
      sortable: false,
      width: 160,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Hành Động',
      sortable: false,
      width: 140,
      getActions: (params) => [
        <GridActionsCellItem
          onClick={() => handleDeleteComment(params.id)}
          icon={<DeleteForeverIcon />}
          label="Delete"
        />,
      ],
    },
  ];
  // Define ratings columns
  const ratingsColumns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    { field: 'username', headerName: 'Username', width: 90 },
    {
      field: 'displayName',
      headerName: 'Tên hiển thị',
      width: 150,
      // editable: true,
    },
    {
      field: 'dateCreated',
      headerName: 'Ngày tạo',
      width: 120,
    },
    {
      field: 'timeCreated',
      headerName: 'Thời gian tạo',
      type: 'number',
      width: 100,
    },
    {
      field: 'content',
      headerName: 'Nội dung',
      sortable: false,
      width: 160,
    },
    {
      field: 'rating',
      headerName: 'Sao',
      sortable: false,
      width: 120,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Hành Động',
      sortable: false,
      width: 140,
      getActions: (params) => [
        <GridActionsCellItem
          onClick={() => handleDeleteRating(params.id)}
          icon={<DeleteForeverIcon />}
          label="Delete"
        />,
      ],
    },
  ];
  // Define comment rows
  const commentsRows = comment?.map((item) => {
    return {
      id: item?._id,
      username: item?.userId?.username,
      displayName: item?.userId?.nickname,
      dateCreated: format(new Date(item?.createdAt), 'dd-MM-yyyy'),
      timeCreated: format(new Date(item?.createdAt), 'HH:mm:ss'),
      content: item?.content,
    };
  });
  // Define rating rows
  const ratingsRows = rating?.map((item) => {
    return {
      id: item?._id,
      username: item?.userId?.username,
      displayName: item?.userId?.nickname,
      dateCreated: format(new Date(item?.createdAt), 'dd-MM-yyyy'),
      timeCreated: format(new Date(item?.createdAt), 'HH:mm:ss'),
      content: item?.content,
      rating: renderStar(item?.rating),
    };
  });

  return (
    <div style={{ padding: '30px' }}>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ marginBottom: '30px', padding: '50px', borderRadius: '8px' }}
        style={backgroundBlur}
      >
        <Grid item xs={6} sx={{ border: '1px solid #333', padding: '8px', borderRadius: '8px' }}>
          <img src={novel?.image} alt="" style={{ borderRadius: '8px', display: 'block', margin: 'auto' }} />
        </Grid>
        <Grid item xs={6}>
          <Stack>
            <Typography variant="h4">Tên truyện: {novel?.name}</Typography>
            <Typography variant="body1">
              <strong>Tác giả</strong>: {novel?.author}
            </Typography>
            <Typography variant="body1">
              <strong>Đánh giá</strong>: {novel?.rating.toFixed(2)} ⭐
            </Typography>
            <Typography variant="body1">
              <strong>Thể loại</strong>: {novel?.type}
            </Typography>
            <Typography variant="body1">
              <strong>Trạng thái</strong>: {novel?.state}
            </Typography>
            <Typography variant="body1">
              <strong>Số chương</strong>: {novel?.numberofchapter}
            </Typography>
            <Typography variant="body1">
              <strong>Số người đánh giá</strong>: {novel?.numberofrating}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Stack sx={{ marginBottom: '30px', rowGap: '30px' }}>
        <Typography variant="h3" color="primary" sx={{}}>
          Quản lý Comment
        </Typography>
        <Box
          sx={{
            height: 400,
            width: '100%',
            maxWidth: '900px',
            marginX: 'auto',

            borderRadius: '12px',
            padding: '8px',
          }}
          style={backgroundBlur}
        >
          {commentsRows && (
            <DataGrid rows={commentsRows} columns={commentsColumns} pageSize={4} rowsPerPageOptions={[4]} />
          )}
        </Box>
      </Stack>
      <Stack sx={{ marginBottom: '30px', rowGap: '30px' }}>
        <Typography variant="h3" color="secondary">
          Quản lý đánh giá
        </Typography>
        <Box
          sx={{
            height: 400,
            width: '100%',
            maxWidth: '900px',
            marginX: 'auto',

            borderRadius: '12px',
            padding: '8px',
          }}
          style={backgroundBlur}
        >
          {ratingsRows && (
            <DataGrid rows={ratingsRows} columns={ratingsColumns} pageSize={5} rowsPerPageOptions={[5]} />
          )}
        </Box>
      </Stack>
    </div>
  );
};

const backgroundBlur = {
  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
};
export default NovelDetails;
