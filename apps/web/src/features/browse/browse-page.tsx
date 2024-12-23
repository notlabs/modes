import { Box } from '@mui/material';
import {
  DataGrid,
  type GridRenderCellParams,
  type GridSortModel,
} from '@mui/x-data-grid';
import { Page } from '../../shared/ui/page';
import { trpc } from '../../trpc';
import { useState } from 'react';

const MEDIA_URL = process.env.MEDIA_URL;

export const BrowsePage = () => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  const { data: mediaData } = trpc.media.listMediaItems.useQuery({
    page: paginationModel.page,
    limit: paginationModel.pageSize,
    sortField: sortModel[0]?.field,
    sortDirection: sortModel[0]?.sort as 'asc' | 'desc' | undefined,
  });

  const columns = [
    {
      field: 'thumbnail',
      headerName: 'Preview',
      width: 100,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <img
          src={`${MEDIA_URL}/${params.value}`}
          alt="Preview"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '60px',
            objectFit: 'contain',
          }}
        />
      ),
    },

    {
      field: 'originalFileName',
      headerName: 'File Name',
      width: 200,
      sortable: true,
    },
    { field: 'mimeType', headerName: 'Type', width: 130, sortable: true },
    { field: 'fileSize', headerName: 'Size', width: 130, sortable: true },
    { field: 'checksum', headerName: 'Checksum', width: 200, sortable: true },
    {
      field: 'tags',
      headerName: 'Tags',
      width: 200,
      sortable: false,
      valueFormatter: (params: GridRenderCellParams) => {
        const tags = params.value || [];
        return tags.join(', ');
      },
    },
  ];

  const rows =
    mediaData?.items.map((item) => ({
      id: item.id,
      thumbnail: item.mediaVersions[0]?.processedMedia[0]?.path,
      originalFileName: item.originalFileName,
      mimeType: item.mimeType,
      fileSize: item.fileSize,
      checksum: item.checksum,
      tags: item.mediaVersions[0]?.mediaTags?.map((mt) => mt.tag.value),
    })) || [];

  return (
    <Page title="Browse">
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowCount={mediaData?.totalCount ?? 0}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 25, 50]}
          paginationMode="server"
          sortingMode="server"
          sortModel={sortModel}
          onSortModelChange={setSortModel}
        />
      </Box>
    </Page>
  );
};
