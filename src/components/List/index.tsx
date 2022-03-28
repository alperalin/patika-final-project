// imports
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { selectListsById } from '../../features/lists/listsSlice';
import { useAppSelector } from '../../hooks/hooks';

// Components
import Card from '../Card';
import ListHeader from './ListHeader';

// Mui
import { Box } from '@mui/material';
import ListFooter from './ListFooter';

// Interface
interface ListItemInterface {
	listId: number;
}

// Styles
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

const cardListStyles = { flexGrow: 1, minHeight: 200, padding: 2 };

// Element
function List({ listId }: ListItemInterface) {
	// Redux
	const { id, title, order, cards, boardId } = useAppSelector((state) =>
		selectListsById(state, listId)
	);

	// Element
	return (
		<Draggable draggableId={id.toString()} index={order}>
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
					<ListFooter
						type="card"
						parentId={listId}
						order={cards?.length > 0 && cards.length}
					/>
				</Box>
			)}
		</Draggable>
	);
}

export default List;
