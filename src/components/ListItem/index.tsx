// imports
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { selectListsById } from '../../features/lists/listsSlice';
import { useAppSelector } from '../../hooks/hooks';

// Components
import CardItem from '../CardItem';
import ListHeader from './ListHeader';

// Mui
import { Box } from '@mui/material';
import ListFooter from './ListFooter';

// Interface
interface ListItemInterface {
	listId: number;
	index: number;
}

// Styles
const listStyles = {
	display: 'flex',
	flexDirection: 'column',
	width: 300,
	minHeight: 600,
	flex: '300px 0 0',
	backgroundColor: '#dcefff',
	borderRadius: '5px',
	padding: 0,
	mr: 3,
	boxShadow: 3,
};

const listMainStyles = { flexGrow: 1, minHeight: 200, padding: 2 };

// Element
function ListItem({ listId, index }: ListItemInterface) {
	// Redux
	const { title, boardId, cards } = useAppSelector((state) =>
		selectListsById(state, listId)
	);
	// Element
	return (
		<Draggable draggableId={`list-${listId}`} index={index}>
			{(provided) => (
				<Box
					{...provided.draggableProps}
					ref={provided.innerRef}
					sx={listStyles}
				>
					<ListHeader
						dnd={provided.dragHandleProps}
						title={title}
						listId={listId}
						boardId={boardId}
					/>
					<Droppable droppableId={listId.toString()} type="card">
						{(provided) => (
							<Box
								ref={provided.innerRef}
								{...provided.droppableProps}
								sx={listMainStyles}
							>
								{cards?.length > 0 &&
									cards.map((cardId: number, index: number) => (
										<CardItem
											key={cardId}
											listTitle={title}
											cardId={cardId}
											index={index}
										/>
									))}
								{provided.placeholder}
							</Box>
						)}
					</Droppable>
					<ListFooter
						type="card"
						parentId={listId}
						order={cards?.length > 0 ? cards.length : 0}
					/>
				</Box>
			)}
		</Draggable>
	);
}

export default ListItem;
