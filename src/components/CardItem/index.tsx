// imports
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
	cardsDelete,
	cardsUpdate,
	selectCardsById,
} from '../../features/cards/cardsSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';

// Component
import DueDatePicker from './DueDatePicker';
import Comments from '../Comments';
import CheckListAdder from '../CheckList/CheckListAdder';
import ChecklistChip from '../CheckList/ChecklistChip';
import Checklists from '../CheckList';
import LabelsPicker from '../Labels/LabelsPicker';
import LabelsBox from '../Labels/LabelsBox';
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
import CommentSharpIcon from '@mui/icons-material/CommentSharp';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';

// Interface
interface PropsInterface {
	listTitle: string;
	cardId: number;
	index: number;
}

// Styles
const boxStyles = {
	width: '100%',
	backgroundColor: '#ffffff',
	borderRadius: '5px',
	padding: 0,
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

const cardHeaderStyles = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	p: 2,
	pr: '10px',
};

const cardBodyStyles = { p: 0, pl: 2, pr: 2 };

const cardFooterStyles = {
	display: 'flex',
	alignItems: 'center',
	p: 2,
	pt: 1,
	pb: 1,
	borderTop: '1px solid rgba(0, 0, 0, 0.12)',
	'& > .MuiBox-root': {
		display: 'flex',
		alignItems: 'center',
		'&:last-of-type': {
			ml: 'auto',
		},
	},
};

const cardTitleStyles = {
	fontSize: '1rem',
	fontWeight: '500',
	color: '#111111',
	cursor: 'pointer',
};

function CardItem({ listTitle, cardId, index }: PropsInterface) {
	// Redux
	const {
		id,
		listId,
		title,
		description,
		duedate,
		comments,
		checklists,
		labels,
	} = useAppSelector((state) => selectCardsById(state, cardId));
	const dispatch = useAppDispatch();

	// States
	const [open, setOpen] = useState<boolean>(false);
	const [newDueDate, setNewDueDate] = useState<Date | null>(
		duedate ? new Date(duedate) : null
	);
	const [newLabels, setNewLabels] = useState<number[]>(
		labels?.length > 0 ? [...labels] : []
	);
	const [formValues, setFormValues] = useState<{
		title: string;
		description: string;
	}>({
		title: title,
		description: description || '',
	});

	// Functions
	function handleOpen() {
		setOpen(true);
	}

	function handleClose() {
		// If due Date changed
		// Dispatch Card Changes
		if (newDueDate) {
			dispatch(
				cardsUpdate({
					id,
					title: formValues['title'] || title,
					description: formValues['description'] || '',
					duedate: newDueDate && formatDate(newDueDate),
				})
			);
			setOpen(false);
			return;
		}

		// if no due date
		// Dispatch Card Changes
		if (
			formValues['title'] !== title ||
			formValues['description'] !== description
		) {
			dispatch(
				cardsUpdate({
					id,
					title: formValues['title'] || title,
					description: formValues['description'] || '',
				})
			);
		}

		setOpen(false);
	}

	function handleInputChange(
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	): void {
		const { name, value } = event.target;

		setFormValues((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	function formatDate(date: Date | string) {
		if (typeof date === 'string') date = new Date(date);

		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();

		return `${year}-${month < 10 ? `0${month}` : month}-${
			day < 10 ? `0${day}` : day
		}`;
	}

	function handleDueDateChange(selectedDueDate: Date | null) {
		setNewDueDate(selectedDueDate);
	}

	function handleLabelsChange(labelsArray: number[]) {
		setNewLabels([...labelsArray]);
	}

	function handleCardDelete(
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		event.stopPropagation();
		dispatch(cardsDelete({ id, listId }));
	}

	return (
		<>
			<Draggable key={cardId} draggableId={cardId.toString()} index={index}>
				{(provided) => (
					<Box
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
						key={cardId}
						sx={boxStyles}
						onClick={handleOpen}
					>
						<Box component="header" sx={cardHeaderStyles}>
							<Typography component="h3" sx={cardTitleStyles}>
								{title}
							</Typography>
							<IconButton
								aria-label="delete this card"
								size="small"
								sx={{ p: 0 }}
								onClick={handleCardDelete}
							>
								<DeleteOutlineSharpIcon />
							</IconButton>
						</Box>
						<Box sx={cardBodyStyles}>
							{duedate && (
								<Chip
									icon={<AccessTimeSharpIcon />}
									label={new Date(duedate).toDateString()}
									color="warning"
									sx={{ mr: 1, mb: 1 }}
								/>
							)}
							{checklists?.length > 0 &&
								checklists.map((checklistId: number) => (
									<ChecklistChip key={checklistId} checklistId={checklistId} />
								))}
						</Box>
						<Box component="footer" sx={cardFooterStyles}>
							<Box>
								{labels?.length > 0 &&
									labels.map((label: number) => (
										<LabelsBox key={label} labelId={label} />
									))}
							</Box>
							<Box>
								<CommentSharpIcon sx={{ mr: 1 }} />
								{comments?.length ? comments.length : 0}
							</Box>
						</Box>
					</Box>
				)}
			</Draggable>
			<Modal
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
			</Modal>
		</>
	);
}

export default CardItem;
