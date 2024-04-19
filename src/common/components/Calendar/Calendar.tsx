import * as React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Europe/Moscow");

export default function BasicDateCalendar() {
    const [selectedDate, setSelectedDate] = React.useState<dayjs.Dayjs | null>(null);

    React.useEffect(() => {
        const savedDate = localStorage.getItem('selectedDate');
        if (savedDate) {
            setSelectedDate(dayjs(savedDate));
        }
    }, []);

    const handleDateChange = (newDate: dayjs.Dayjs | null) => {
        setSelectedDate(newDate);
        if (newDate) {
            localStorage.setItem('selectedDate', newDate.format("YYYY-MM-DD"));
        } else {
            localStorage.removeItem('selectedDate');
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar value={selectedDate} onChange={handleDateChange} />
        </LocalizationProvider>
    );
}
