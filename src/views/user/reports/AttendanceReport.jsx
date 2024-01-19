import React, { useState, useEffect } from 'react';
import { AttendanceReportService } from './services/ReportServices';
import Report from './components/Report';
import { convert, getMinDate } from '../../../utils/CommonFunctions';
import { useDispatch } from 'react-redux';
import { updateToast } from '../../../app/redux/action/action';

const AttendanceReport = () => {
  // component state
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState(null);
  const [columnDef, setColumnDef] = useState([]);
  const [rowDef, setRowDef] = useState([]);

  const dispatch = useDispatch();

  // function to get attendance report data
  const getAttendanceReport = params => {
    setIsLoading(true);
    setDetails(params);
    let { deviceID, startDate, endDate } = params;
    params = { deviceID };
    // to intialize previous data
    setColumnDef([]);
    setRowDef([]);
    let param = `startdate=${startDate}&enddate=${endDate}&option=${params?.deviceID}`;

    AttendanceReportService(param)
      .then(({ data, status }) => {
        if (status === 200) {
          let analytics = data?.data ? data?.data : data?.report;
          if (analytics && analytics?.length) {
            analytics?.map((item, index) => {
              item['id'] = index;
              return item;
            });

            if (param?.deviceID === 'Date') {
              let dates = [],
                presentees = [],
                absentees = [],
                lateComers = [],
                earlyLeavers = [],
                lessWorkingHours = [];
              setColumnDef([
                {
                  title: 'Date',
                  field: 'date',
                  headerName: 'Date',
                  width: 200
                },
                {
                  title: 'Presentees',
                  field: 'present_days',
                  headerName: 'Presentees',
                  width: 200
                },
                {
                  title: 'Absentees',
                  field: 'absent_days',
                  headerName: 'Absentees',
                  width: 200
                },
                {
                  title: 'Late Commers',
                  field: 'late_days',
                  headerName: 'Late Commers',
                  width: 200
                },
                {
                  title: 'Early Leavers',
                  field: 'early_days',
                  headerName: 'Early Leavers',
                  width: 200
                },
                {
                  title: 'Less Working Hours',
                  field: 'lwh_days',
                  headerName: 'Less Working Hours',
                  width: 200
                }
              ]);
              analytics?.map(item => {
                dates.push(item['date']);
                presentees.push(item['presentees']);
                absentees.push(item['absentees']);
                lateComers.push(item['lateComers']);
                earlyLeavers.push(item['earlyLeavers']);
                lessWorkingHours.push(item['lessWorkinghours']);
                return item;
              });
            } else {
              let employeeNames = [],
                presentDays = [],
                absentDays = [],
                arrivingLateDays = [],
                leavingEarlyDays = [],
                lessWokingHoursDays = [];
              setColumnDef([
                {
                  title: 'Employee ID',
                  field: 'employeeID',
                  headerName: 'Employee ID',
                  width: 200
                },
                {
                  title: 'Employee Name',
                  field: 'employeeName',
                  headerName: 'Employee Name',
                  width: 200
                },
                {
                  title: 'Present (days)',
                  field: 'present_days',
                  headerName: 'Present (days)',
                  width: 200
                },
                {
                  title: 'Absent (days)',
                  field: 'absent_days',
                  headerName: 'Absent (days)',
                  width: 200
                },
                {
                  title: 'Arriving Late (days)',
                  field: 'late_days',
                  headerName: 'Arriving Late (days)',
                  width: 200
                },
                {
                  title: 'Leaving Early (days)',
                  field: 'late_days',
                  headerName: 'Leaving Early (days)',
                  width: 200
                },
                {
                  title: 'Less Working Hours (days)',
                  field: 'lwh_days',
                  headerName: 'Less Working Hours (days)',
                  width: 200
                }
              ]);
              analytics?.map(item => {
                employeeNames.push(item['employeeName']);
                presentDays.push(item['present(days)']);
                absentDays.push(item['absent(days)']);
                arrivingLateDays.push(item['arrivingLate(days']);
                leavingEarlyDays.push(item['earlyLeaving(days)']);
                lessWokingHoursDays.push(item['lessWorkinghours(days)']);
                return item;
              });
            }
            setRowDef(analytics);
          } else {
            dispatch(
              updateToast({
                show: true,
                message: 'Data not found!',
                severity: 'warning'
              })
            );
          }
        } else {
          dispatch(
            updateToast({
              show: true,
              message: 'Network error!',
              severity: 'error'
            })
          );
        }
        setIsLoading(false);
      })
      .catch(err => console.log('err :', err));
  };

  useEffect(() => {
    let payload = {
      deviceID: 'selectAll',
      startDate: convert(getMinDate(new Date())),
      endDate: convert(new Date())
    };
    getAttendanceReport(payload);
  }, []);

  const onSubmit = data => {
    let payload = {
      startDate: convert(data.fromDate),
      endDate: convert(data.toDate)
    };
    console.log('DATA', payload);
    getAttendanceReport(payload);
  };

  return (
    <Report
      title='Attendance Report'
      rowDef={rowDef}
      columnDef={columnDef}
      onSubmit={onSubmit}
      isLoading={isLoading}
      details={details}
      devices={['Employee', 'Date']}
      isAttendance={true}
    />
  );
};

export default AttendanceReport;
