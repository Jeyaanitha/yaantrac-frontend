import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  inputLabelClasses
} from '@mui/material';
import React from 'react';

function Tables({ data, isCustomization = false, isPersonTracking = false, title }) {
  const handleSubmit = () => alert('under construction ...');
  return (
    <TableContainer>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>
              <Typography component='h6' textAlign='center'>
                {title}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) =>
            isCustomization ? (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    variant='filled'
                    label={item.key}
                    size='small'
                    InputLabelProps={{
                      sx: {
                        [`&.${inputLabelClasses.shrink}`]: {
                          color: '#00769e'
                        }
                      }
                    }}
                  />
                </TableCell>
              </TableRow>
            ) : (
              <TableRow key={index}>
                <TableCell component='th'> {item.key} </TableCell>
                <TableCell> {item.value} </TableCell>
              </TableRow>
            )
          )}
          {isCustomization ? (
            <TableRow>
              <TableCell colSpan={2} align='center'>
                <Button variant='contained' fullWidth onClick={handleSubmit}>
                  Submit
                </Button>
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Tables;
