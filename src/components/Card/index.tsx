// imports
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { cardsUpdate, selectCardsById } from '../../features/cards/cardsSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';

// Component
import DueDatePicker from './DueDatePicker';
import Comments from '../Comments';
import LabelsPicker from '../Labels/LabelsPicker';
import CheckListAdder from '../CheckList/CheckListAdder';
import Checklists from '../CheckList';
import Labels from '../Labels';

// Mui
import {
	Box,
	Breadcrumbs,
	Modal,
	Typography,
	TextField,
	Chip,
	IconButton,
} from '@mui/material';
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

// Interface
interface PropsInterface {
	listTitle: string;
	cardId: number;
	index: number;
}

// Styles
const boxStyles = {
	width: '100%',
	backgroundColor: '#666666',
	borderRadius: '5px',
	padding: 2,
	mb: 2,
	boxShadow: 2,
};

const modalStyles = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	maxWidth: '50%',
	width: '100%',
	height: '600px',
	bgcolor: 'background.paper',
	borderRadius: '10px',
	boxShadow: 24,
	overflow: 'scroll',
};

const headerStyles = {
	display: 'flex',
	alignItems: 'center',
	bgcolor: '#231F47',
	'& .MuiButtonBase-root': {
		color: '#ffffff',
	},
	pl: 3,
	pr: 3,
	pt: 2,
	pb: 2,
	borderRadius: `${modalStyles.borderRadius} ${modalStyles.borderRadius} 0 0`,
};

const mainStyles = {
	padding: 3,
	borderRadius: `0 0 ${modalStyles.borderRadius} ${modalStyles.borderRadius}`,
};

function Card({ listTitle, cardId, index }: PropsInterface) {
	// Redux
	const { id, title, description, duedate, comments, checklists, labels } =
		useAppSelector((state) => selectCardsById(state, cardId));
	const dispatch = useAppDispatch();

	// States
	// const [open, setOpen] = useState<boolean>(false);
	// const [newDueDate, setNewDueDate] = useState<Date | null>(
	// 	duedate ? new Date(duedate) : null
	// );
	// const [newLabels, setNewLabels] = useState<number[]>(
	// 	labels?.length > 0 ? [...labels] : []
	// );
	// const [formValues, setFormValues] = useState<{
	// 	title: string;
	// 	description: string;
	// }>({
	// 	title: title,
	// 	description: description || '',
	// });

	// // Functions
	// function handleOpen() {
	// 	setOpen(true);
	// }

	// function handleClose() {
	// 	if (
	// 		formValues['title'] !== title ||
	// 		formValues['description'] !== description
	// 	) {
	// 		if (newDueDate && Date.parse(duedate) !== Date.parse(`${newDueDate}`)) {
	// 			dispatch(
	// 				cardsUpdate({
	// 					id,
	// 					title: formValues['title'] || title,
	// 					description: formValues['description'] || '',
	// 					duedate: newDueDate && formatDate(newDueDate),
	// 				})
	// 			);
	// 			return;
	// 		}

	// 		// Dispatch Card Changes
	// 		dispatch(
	// 			cardsUpdate({
	// 				id,
	// 				title: formValues['title'] || title,
	// 				description: formValues['description'] || '',
	// 			})
	// 		);
	// 	}

	// 	setOpen(false);
	// }

	// function handleInputChange(
	// 	event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	// ): void {
	// 	const { name, value } = event.target;

	// 	setFormValues((prev) => ({
	// 		...prev,
	// 		[name]: value,
	// 	}));
	// }

	// function formatDate(date: Date | string) {
	// 	if (typeof date === 'string') date = new Date(date);

	// 	const year = date.getFullYear();
	// 	const month = date.getMonth() + 1;
	// 	const day = date.getDate();

	// 	return `${year}-${month < 10 ? `0${month}` : `${month}`}-${day}`;
	// }

	// function handleDueDateChange(selectedDueDate: Date | null) {
	// 	setNewDueDate(selectedDueDate);
	// }

	// function handleLabelsChange(labelsArray: number[]) {
	// 	setNewLabels([...labelsArray]);
	// }

	return (
		<>
			<Draggable draggableId={cardId.toString()} index={index}>
				{(provided) => (
					<Box
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
						sx={boxStyles}
						// onClick={handleOpen}
					>
						<Typography
							component="h3"
							fontSize="1.25rem"
							color="#fff"
							sx={{ cursor: 'pointer' }}
						>
							{title}
						</Typography>
					</Box>
				)}
			</Draggable>
			{/* <Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={modalStyles}>
					<Box component="header" sx={headerStyles}>
						<DueDatePicker
							cardDueDate={newDueDate}
							onDueDateChange={handleDueDateChange}
						/>
						<LabelsPicker
							cardId={id}
							cardLabels={labels}
							onLabelsSave={handleLabelsChange}
						/>
						<CheckListAdder cardId={id} />

						<IconButton
							onClick={handleClose}
							sx={{ color: '#fff', ml: 'auto' }}
						>
							<CloseSharpIcon />
						</IconButton>
					</Box>

					<Box component="main" sx={mainStyles}>
						<Breadcrumbs maxItems={2} aria-label="breadcrumb" sx={{ mb: 4 }}>
							<Typography color="text.primary">{listTitle}</Typography>
							<Typography color="text.primary">{title}</Typography>
						</Breadcrumbs>

						{newDueDate && (
							<Box sx={{ mb: 5 }}>
								<Typography
									component="h3"
									variant="h5"
									sx={{
										display: 'flex',
										flexWrap: 'wrap',
										alignItems: 'center',
										mb: 1,
									}}
								>
									<AccessTimeSharpIcon sx={{ mr: 1 }} /> Duedate
								</Typography>
								<Chip
									icon={<AccessTimeSharpIcon />}
									label={newDueDate.toDateString()}
									color="warning"
								/>
							</Box>
						)}

						{newLabels?.length > 0 && (
							<Labels cardId={id} cardLabels={newLabels} />
						)}

						<Box sx={{ mb: 8 }}>
							<TextField
								fullWidth
								sx={{ mb: 2 }}
								name="title"
								label="Title"
								placeholder="Title"
								onChange={handleInputChange}
								value={formValues['title'] || title}
								required
							/>
							<TextField
								fullWidth
								multiline
								minRows={3}
								name="description"
								label="Description"
								placeholder="Description"
								onChange={handleInputChange}
								value={formValues['description']}
								required
							/>
						</Box>

						{checklists?.length > 0 && <Checklists checklists={checklists} />}

						<Comments cardId={id} comments={comments} />
					</Box>
				</Box>
			</Modal> */}
		</>
	);
}

export default Card;
