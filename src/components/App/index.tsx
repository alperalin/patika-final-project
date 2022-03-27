// imports
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// Store
import {
	boardsFetchById,
	boardsUpdate,
	selectBoardsById,
} from '../../features/boards/boardsSlice';
import {
	changeOrder,
	listChangeCardOrder,
} from '../../features/lists/listsSlice';
import { cardsChangeOrder } from '../../features/cards/cardsSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';

// Component
import Header from '../Header';
import List from '../List';

// MUI
import { Container, Grid } from '@mui/material';

// styles
const listsContainerStyles = {
	display: 'flex',
	flexWrap: 'nowrap',
	alignItems: 'flex-start',
	maxWidth: '100%',
	width: '100%',
	height: '100vh',
	overflow: 'scroll',
};

// Element
function App() {
	// Variables
	const { boardId } = useParams();

	// Redux
	const { id: userId } = useAppSelector((state) => state.user);
	const board = useAppSelector((state) =>
		selectBoardsById(state, Number(boardId))
	);

	const dispatch = useAppDispatch();
	const isUserOwner = userId === board?.ownerId ? true : false;

	// Functions
	// First init
	useEffect(() => {
		dispatch(boardsFetchById({ id: Number(boardId) }));
	}, []);

	// Handle Board Title Save
	function handleBoardTitleSave(title: string): void {
		dispatch(boardsUpdate({ id: Number(boardId), title }));
	}

	// DnD
	function onDragEnd(result: any) {
		// TODO: Re order lists

		const { destination, source, draggableId } = result;

		if (!destination) return;

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		console.log(destination, source, draggableId);
		// dispatch(listChangeCardOrder({ destination, source, draggableId }));
	}

	// Element
	return (
		<>
			<Header
				title={board?.title}
				editable={isUserOwner}
				onTitleSave={handleBoardTitleSave}
			/>
			<Container component="main" maxWidth={false} sx={{ mt: 3 }}>
				<Grid container>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable
							droppableId="all-lists"
							direction="horizontal"
							type="list"
						>
							{(provided) => (
								<Grid
									item
									{...provided.droppableProps}
									ref={provided.innerRef}
									xs={12}
									sx={listsContainerStyles}
								>
									{board?.lists?.length > 0 &&
										board.lists.map((listId: number) => (
											<List key={listId} listId={listId} />
										))}
									{provided.placeholder}
								</Grid>
							)}
						</Droppable>
					</DragDropContext>
				</Grid>
			</Container>
		</>
	);
}

export default App;
