import React, { useCallback } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Box, Fab, Stack, Typography } from '@mui/material';
import CustomToolbar from './CustomToolbar';
import { dateConvert } from '../../../utils/CommonFunctions';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const DataTables = ({
  customToolbar,
  details,
  Title,
  filterFunction,
  isOpen,
  docPayload,
  ...props
}) => {
  let data = { ...props };
  function CustomGridToolbar(props) {
    return (
      <>
        <GridToolbarContainer
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0px !important'
          }}
        >
          {data.isDownload && (
            <>
              <GridToolbarQuickFilter
                {...props}
                sx={data.rows?.length > 0 ? null : { visibility: 'hidden' }}
              />
              {details && (
                <Typography
                  component='h5'
                  sx={{
                    fontSize: '14px',
                    color: '#00769E !important',
                    textAlign: 'center'
                  }}
                  py={2}
                >
                  {`${Title} from ${dateConvert(details?.startDate)} to ${dateConvert(
                    details?.endDate
                  )}`}
                </Typography>
              )}
              <Stack direction='row' spacing={1} alignItems='center'>
                {data.rows?.length > 0 && (
                  <CustomToolbar
                    rows={data.rows}
                    columns={data.columns}
                    title={data.title}
                    pdfName={data.pdfName}
                    xlsxName={data.xlsxName}
                    docPayload={docPayload}
                  />
                )}
                {
                  <Box justifyContent={data.rows?.length === 0 && 'end'} ml={2}>
                    {data.rows?.length >= 0 && (
                      <Fab
                        onClick={filterFunction}
                        size='small'
                        sx={{
                          backgroundColor: '#00769E',
                          '&:hover': { backgroundColor: '#00769E', color: 'white' }
                        }}
                      >
                        <FilterAltIcon sx={{ color: '#FFF' }} />
                      </Fab>
                    )}
                  </Box>
                }
              </Stack>
            </>
          )}
        </GridToolbarContainer>

        <GridToolbarContainer
          sx={{
            display: 'flex',
            justifyContent: 'start',
            borderRadius: '3px'
          }}
        >
          {!data.isDownload && data.rows?.length > 0 && (
            <GridToolbarQuickFilter {...props} />
          )}
        </GridToolbarContainer>
      </>
    );
  }

  // component for no rows
  const NoRowsOverlay = () => {
    return (
      <Stack height='100%' alignItems='center' justifyContent='center'>
        No Data Found
      </Stack>
    );
  };

  //row spacing
  const getRowSpacing = useCallback(params => {
    return {
      top: params.isFirstVisible ? 0 : 1,
      bottom: params.isLastVisible ? 0 : 1
    };
  }, []);

  return (
    <Box
      sx={{
        width: '100% !important',
        overflowX: 'scroll !important',
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: '#00769E',
          color: '#fff',
          headerAlign: 'right'
        },
        '& 	.MuiDataGrid-columnHeaderTitleContainer': {
          justifyContent: 'center'
        },
        '&	.MuiDataGrid-cell': {
          textAlign: 'center !important',
          backgroundColor: '#D9D9D9 !important',
          justifyContent: 'center !important'
        },
        '& .MuiDataGrid-root': {
          border: 'none'
        },
        '& .MuiDataGrid-sortIcon': {
          color: '#fff !important'
        },
        '& .MuiDataGrid-menuIcon': {
          color: '#fff !important'
        },
        '& .MuiSvgIcon-fontSizeSmall': {
          color: '#00769E',
          fontSize: '20px'
        },
        '& .css-1ppqrkv-MuiInputBase-root-MuiInput-root': {
          borderBottom: '2px solid #00769E !important',
          marginBottom: '5px !important'
        },
        '& .css-1ppqrkv-MuiInputBase-root-MuiInput-root:after': {
          borderBottom: 'none'
        }
      }}
    >
      <DataGrid
        sx={{
          '& .MuiTablePagination-displayedRows': {
            marginTop: '10px'
          },
          '& .MuiTablePagination-selectLabel': {
            marginTop: '10px'
          },
          '& .MuiDataGrid-cellContent': {
            fontSize: '12px'
          }
        }}
        {...props}
        disableColumnSelector={true}
        disableColumnFilter={true}
        disableDensitySelector={true}
        getRowSpacing={getRowSpacing}
        disableColumnMenu
        disableSelectionOnClick={true}
        components={{
          NoRowsOverlay,
          Toolbar: CustomGridToolbar
        }}
        autoHeight={true}
        disableVirtualization
      />
    </Box>
  );
};

export default DataTables;
