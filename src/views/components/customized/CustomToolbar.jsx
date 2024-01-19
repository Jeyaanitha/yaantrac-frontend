import React, { useState } from 'react';
import { GridToolbar, GridToolbarContainer } from '@mui/x-data-grid';
import 'jspdf-autotable';
import CustomButton from '../buttons/CustomButton';
import { createUseStyles } from 'react-jss';
import { updateToast } from '../../../app/redux/action/action';
import { useDispatch } from 'react-redux';

const useStyles = createUseStyles({
  root: {
    '& .MuiButtonBase-root': {
      fontSize: '10px'
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px'
  }
});

function CustomToolbar({ docPayload }) {
  const [isLoading, setIsLoading] = useState(false);
  // function to dispatch state

  const dispatch = useDispatch();
  // component styles
  const styles = useStyles();
  let { reportType, pdfURL, excelURL } = docPayload;

  // Function for downloading the report as PDF & Excel:
  const reportDownload = async docType => {
    setIsLoading(true);

    switch (reportType) {
      case 'KM':
        docType === 'pdf' ? downloadFile(pdfURL) : downloadExcelFile(excelURL);
        break;

      case 'Movement':
        docType === 'pdf' ? downloadFile(pdfURL) : downloadExcelFile(excelURL);
        break;

      case 'Parking':
        docType === 'pdf' ? downloadFile(pdfURL) : downloadExcelFile(excelURL);
        break;

      case 'Engine':
        docType === 'pdf' ? downloadFile(pdfURL) : downloadExcelFile(excelURL);
        break;

      case 'Overall':
        docType === 'pdf' ? downloadFile(pdfURL) : downloadExcelFile(excelURL);
        break;

      case 'Overspeed':
        docType === 'pdf' ? downloadFile(pdfURL) : downloadExcelFile(excelURL);
        break;

      case 'Idle':
        docType === 'pdf' ? downloadFile(pdfURL) : downloadExcelFile(excelURL);
        break;

      case 'Stoppage':
        docType === 'pdf' ? downloadFile(pdfURL) : downloadExcelFile(excelURL);
        break;

      default:
        break;
    }
    setIsLoading(false);
  };

  // Function to trigger the PDF file download:
  const downloadFile = async () => {
    try {
      const response = await fetch(pdfURL);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${reportType} Report.pdf`;
      link.click();

      // Clean up the Object URL after the download:
      URL.revokeObjectURL(url);

      dispatch(
        updateToast({
          show: true,
          severity: 'success',
          message: `${reportType} Report Downloaded as PDF Successfully.`
        })
      );
    } catch (error) {
      dispatch(
        updateToast({
          show: true,
          severity: 'error',
          message: `Error While Downloading ${reportType} PDF Report.`
        })
      );
    }
  };

  // Function to trigger the Excel file download:
  const downloadExcelFile = async excelDataURL => {
    try {
      const response = await fetch(excelDataURL);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      // Set the appropriate MIME type for Excel files
      link.href = url;
      link.download = `${reportType} Report.xlsx`; // Specify the file extension as .xlsx for Excel

      link.click();

      // Clean up the Object URL after the download:
      URL.revokeObjectURL(url);

      dispatch(
        updateToast({
          show: true,
          severity: 'success',
          message: `${reportType} Report Downloaded as Excel Successfully.`
        })
      );
    } catch (error) {
      dispatch(
        updateToast({
          show: true,
          severity: 'error',
          message: `Error While Downloading ${reportType} Excel Report.`
        })
      );
    }
  };

  return (
    <GridToolbarContainer className={styles.root}>
      <GridToolbar />
      <CustomButton
        component='h6'
        loading={isLoading}
        variant='contained'
        category='Download as PDF'
        onClick={() => reportDownload('pdf')}
      />
      <CustomButton
        component='h6'
        loading={isLoading}
        variant='contained'
        category='Download as Excel'
        onClick={() => reportDownload('excel')}
      />
    </GridToolbarContainer>
  );
}

export default CustomToolbar;
