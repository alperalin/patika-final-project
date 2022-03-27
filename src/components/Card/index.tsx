// imports
import { Draggable } from 'react-beautiful-dnd';
import { selectCardsById } from '../../features/cards/cardsSlice';
import { useAppSelector } from '../../hooks/hooks';

// Mui
import { Box, Typography } from '@mui/material';

// Interface
interface CardItemInterface {
	cardId: number;
}

// Styles
const boxStyles = {
	width: '100%',
	backgroundColor: '#666666',
	borderRadius: '5px',
	padding: 2,
	mt: 3,
	mb: 3,
	boxShadow: 2,
};

function Card({ cardId }: CardItemInterface) {
	const { id, title, order } = useAppSelector((state) =>
		selectCardsById(state, cardId)
	);

	return (
		<Draggable draggableId={id.toString()} index={order}>
			{(provided) => (
				<Box
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					sx={boxStyles}
				>
					<Typography component="h3" fontSize="1.25rem" color="#fff">
						{title}
					</Typography>
				</Box>
			)}
		</Draggable>
	);
}

export default Card;
