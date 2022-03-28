// imports
import { useState } from 'react';

// Mui
import { TextField, IconButton, Popover, Box } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';

// Interface
interface PropsInterface {
	cardDueDate: Date | null;
	onDueDateChange: (dueDate: Date | null) => void;
}

// Element
function DueDatePicker({ cardDueDate, onDueDateChange }: PropsInterface) {
	// States
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [dueDate, setDueDate] = useState<Date | null>(cardDueDate);

	// Variables
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	// Functions
	function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		onDueDateChange(dueDate);
		setAnchorEl(null);
	}

	// Return
	return (
		<>
			<IconButton aria-label="Select a due date" onClick={handleClick}>
				<CalendarMonthSharpIcon />
			</IconButton>

			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<Box sx={{ p: 2 }}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DatePicker
							label="Due Date"
							value={dueDate}
							onChange={(newDueDate) => {
								setDueDate(newDueDate);
							}}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
				</Box>
			</Popover>
		</>
	);
}

export default DueDatePicker;
