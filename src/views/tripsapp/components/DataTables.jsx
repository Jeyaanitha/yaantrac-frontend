import React, { useCallback } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Box, Fab, Stack, Typography } from '@mui/material';
import CustomToolbar from '../../../views/components/customized/CustomToolbar';
import { dateConvert } from '../../../utils/CommonFunctions';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import './styles.scss';

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
            <GridToolbarQuickFilter
              {...props}
              variant='outlined'
              size='small'
              sx={{
                backgroundColor: '#fff',
                padding: '0',
                borderRadius: '6px',
                color: '#E8EEF2'
              }}
            />
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
      className='customKhubstyle'
      sx={{
        width: '100% !important',
        overflowX: 'scroll !important',
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: '#fff',
          color: '#59758A',
          headerAlign: 'right',
          fontSize: '13px',
          fontFamily: 'Lato',
          fontWeight: '700 !important',
          textAlign: 'left',
          marginTop: '15px',
          minHeight: '40px !important',
          maxHeight: '40px !important'
        },
        '& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle': {
          fontWeight: '700 !important'
        },
        '& 	.MuiDataGrid-columnHeaderTitleContainer': {
          justifyContent: 'left'
        },
        '&.css-4ztk7d-MuiDataGrid-root .MuiDataGrid-columnHeader': {
          minHeight: '40px !important',
          maxHeight: '40px !important'
        },
        '& .css-4ztk7d-MuiDataGrid-root .MuiDataGrid-columnHeader:focus,.css-4ztk7d-MuiDataGrid-root .MuiDataGrid-cell:focus':
          {
            outline: 'none !important'
          },
        '&.css-4ztk7d-MuiDataGrid-root .MuiDataGrid-cell:focus-within,.css-4ztk7d-MuiDataGrid-root .MuiDataGrid-cell:focus-within':
          {
            outline: 'none !important'
          },
        '& .css-4ztk7d-MuiDataGrid-root .MuiDataGrid-row': {
          backgroundColor: '#fff !important',
          marginBottom: '0 !important'
        },
        '& .css-4ztk7d-MuiDataGrid-root .MuiDataGrid-row:hover': {
          backgroundColor: '#EDF1F5 !important',
          cursor: 'pointer',
          color: '#485CF0'
        },
        '& .css-4ztk7d-MuiDataGrid-root .MuiDataGrid-row:hover .MuiDataGrid-cell': {
          color: '#485CF0'
        },
        '& .css-4ztk7d-MuiDataGrid-root .MuiDataGrid-cellContent': {
          fontSize: '13px'
        },
        '&	.MuiDataGrid-cell': {
          textAlign: 'left !important',
          justifyContent: 'left !important',
          color: '#333333',
          fontSize: '13px',
          fontFamily: 'Inter',
          fontWeight: '500'
        },
        '& .MuiDataGrid-root': {
          border: 'none'
        },
        '& .MuiDataGrid-sortIcon': {
          color: '#59758A !important'
        },
        '& .MuiDataGrid-menuIcon': {
          color: '#59758A !important'
        },
        '& .css-4ztk7d-MuiDataGrid-root .MuiDataGrid-columnSeparator--sideRight': {
          opacity: '0 !important'
        },
        '& .css-1ppqrkv-MuiInputBase-root-MuiInput-root': {
          borderBottom: '2px solid #59758A !important',
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
        rowHeight={40}
        columnHeaderHeight={40}
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
