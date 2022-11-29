import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useEffect } from 'react';
import novelApi from 'src/apis/novelsApi';
import { useState } from 'react';
import { format } from 'date-fns';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const NovelDetails = () => {
  const [novel, setNovel] = useState();
  const { url } = useParams();
  console.log('🚀 ~ NovelDetails ~ url', url);

  // console.log('🚀 ~ NovelDetails ~ url', url);
  useEffect(() => {
    const handleGetNovelByUrl = async () => {
      const resp = await novelApi.getNovelByUrl(url);
      const data = resp?.data?.reviewNovelInfo;
      setNovel(data);
    };
    handleGetNovelByUrl();
  }, []);
  const renderStar = (number) => {
    let sumStar = '';
    for (let i = 0; i < number; i++) {
      sumStar += '⭐';
    }
    return sumStar;
  };
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
      getActions: (params) => [<GridActionsCellItem icon={<DeleteForeverIcon />} label="Delete" />],
    },
  ];
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
      getActions: (params) => [<GridActionsCellItem icon={<DeleteForeverIcon />} label="Delete" />],
    },
  ];

  const commentsRows = novel?.comments?.map((item) => {
    return {
      id: item?._id,
      username: item?.userId?.username,
      displayName: item?.userId?.nickname,
      dateCreated: format(new Date(item?.createdAt), 'dd-MM-yyyy'),
      timeCreated: format(new Date(item?.createdAt), 'HH:mm:ss'),
      content: item?.content,
    };
  });
  const ratingsRows = novel?.ratings?.map((item) => {
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
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ maxWidth: '600px', marginX: 'auto', marginBottom: '50px' }}
      >
        <img src={novel?.image} alt="" />
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
      </Stack>
      <Stack sx={{ marginBottom: '30px', rowGap: '30px' }}>
        <Typography variant="h3" color="primary">
          Quản lý Comment
        </Typography>
        <Box sx={{ height: 350, width: '100%', maxWidth: '900px', marginX: 'auto' }}>
          {commentsRows && (
            <DataGrid rows={commentsRows} columns={commentsColumns} pageSize={4} rowsPerPageOptions={[4]} />
          )}
        </Box>
      </Stack>
      <Stack sx={{ marginBottom: '30px', rowGap: '30px' }}>
        <Typography variant="h3" color="secondary">
          Quản lý đánh giá
        </Typography>
        <Box sx={{ height: 400, width: '100%', maxWidth: '900px', marginX: 'auto' }}>
          {ratingsRows && (
            <DataGrid rows={ratingsRows} columns={ratingsColumns} pageSize={5} rowsPerPageOptions={[5]} />
          )}
        </Box>
      </Stack>
    </div>
  );
};
export default NovelDetails;
