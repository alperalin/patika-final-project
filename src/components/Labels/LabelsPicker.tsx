// imports
import { useState } from 'react';

// Mui
import {
	TextField,
	IconButton,
	Popover,
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Checkbox,
} from '@mui/material';

import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import { useAppSelector } from '../../hooks/hooks';
import { selectLabelsAll } from '../../features/labels/labelsSlice';

// Interface
interface PropsInterface {
	cardDueDate: Date | null;
	onDueDateChange: (dueDate: Date | null) => void;
}

// Element
function LabelsPicker() {
	// States
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [checked, setChecked] = useState([0]);

	// Redux
	const labels = useAppSelector((state) => selectLabelsAll(state));

	// Variables
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	// Functions
	function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		// onDueDateChange(dueDate);
		setAnchorEl(null);
	}

	const handleToggle = (value: number) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	// Return
	return (
		<>
			<IconButton aria-label="Select a label" onClick={handleClick}>
				<LabelOutlinedIcon />
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
					<List
						sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
					>
						{labels?.length > 0 &&
							labels.map((label) => {
								const labelId = `checkbox-list-label-${label.id}`;

								return (
									<ListItem key={label.id} disablePadding>
										<ListItemButton
											role={undefined}
											onClick={handleToggle(label.id)}
											dense
										>
											<ListItemIcon>
												<Checkbox
													edge="start"
													checked={checked.indexOf(label.id) !== -1}
													tabIndex={-1}
													disableRipple
													inputProps={{ 'aria-labelledby': labelId }}
												/>
											</ListItemIcon>
											<ListItemText id={labelId} primary={label.title} />
										</ListItemButton>
									</ListItem>
								);
							})}
					</List>
				</Box>
			</Popover>
		</>
	);
}

export default LabelsPicker;
