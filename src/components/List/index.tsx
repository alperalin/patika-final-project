// imports
import { useRef } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { selectListsById } from '../../features/lists/listsSlice';
import { useAppSelector } from '../../hooks/hooks';

// Components
import Card from '../Card';
import AddListItem from '../App/AddListItem';

// Mui
import { Box, Typography } from '@mui/material';

// Interface
interface ListItemInterface {
	listId: number;
}

const listStyles = {
	display: 'flex',
	flexDirection: 'column',
	width: 300,
	height: 600,
	flex: '300px 0 0',
	overflow: 'scroll-y',
	backgroundColor: '#dcefff',
	borderRadius: '10px',
	padding: 0,
	mr: 3,
	boxShadow: 3,
};

const headerStyles = {
	padding: 2,
	borderBottom: '1px solid black',
	cursor: 'move',
};

const cardListStyles = { flexGrow: 1, minHeight: 200, padding: 2 };

function List({ listId }: ListItemInterface) {
	const { id, title, order, cards } = useAppSelector((state) =>
		selectListsById(state, listId)
	);

	return (
		<Draggable draggableId={id.toString()} index={order}>
			{(provided) => (
				<Box
					{...provided.draggableProps}
					ref={provided.innerRef}
					sx={listStyles}
				>
					<Box
						{...provided.dragHandleProps}
						component="header"
						sx={headerStyles}
					>
						<Typography component="h2" fontSize="1.25rem">
							{title}
						</Typography>
					</Box>
					<Droppable droppableId={id.toString()} type="card">
						{(provided) => (
							<Box
								ref={provided.innerRef}
								{...provided.droppableProps}
								sx={cardListStyles}
							>
								{cards?.length > 0 &&
									cards.map((cardId: number) => (
										<Card key={cardId} cardId={cardId} />
									))}
								{provided.placeholder}
							</Box>
						)}
					</Droppable>
					<AddListItem />
				</Box>
			)}
		</Draggable>
	);
}

export default List;
