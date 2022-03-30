// imports
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// Store
import {
	boardsFetchById,
	boardsUpdate,
	selectBoardsById,
} from '../../features/boards/boardsSlice';
import { boardsMemberFetchAll } from '../../features/boardsMember/boardsMemberSlice';
import { labelsFetchAll } from '../../features/labels/labelsSlice';
import {
	listChangeCardOrder,
	listClearStatus,
} from '../../features/lists/listsSlice';
import { cardsUpdate } from '../../features/cards/cardsSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';

// Component
import Header from '../Header';
import List from '../List';
import AddItem from '../List/AddItem';

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
	// State
	const [dndDropId, setDndDropId] = useState<number | null>(null);

	// Variables
	const { boardId } = useParams();

	// Redux
	const { id: userId } = useAppSelector((state) => state.user);
	const board = useAppSelector((state) =>
		selectBoardsById(state, Number(boardId))
	);
	const { status: listUpdateStatus, entities: listEntities } = useAppSelector(
		(state) => state.lists
	);

	const dispatch = useAppDispatch();
	const isUserOwner = userId === board?.ownerId ? true : false;

	// Functions
	// First init
	useEffect(() => {
		dispatch(boardsFetchById({ id: Number(boardId) }));
		dispatch(boardsMemberFetchAll({ boardId: Number(boardId) }));
		dispatch(labelsFetchAll());
	}, []);

	// Dispatch card order changes to api after redux changed
	useEffect(() => {
		if (dndDropId && listUpdateStatus === 'succeeded') {
			const changedCardIds = listEntities[dndDropId].cards;

			changedCardIds.forEach((cardId: number, index: number) => {
				dispatch(cardsUpdate({ id: cardId, order: index }));
			});

			dispatch(listClearStatus());
		}
	}, [listUpdateStatus]);

	// Handle Board Title Save
	function handleBoardTitleSave(title: string): void {
		dispatch(boardsUpdate({ id: Number(boardId), title }));
	}

	// DnD
	function onDragEnd(result: any) {
		// get DnD variables
		const { destination, source, draggableId } = result;

		// Controls
		if (!destination) return;

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		setDndDropId(Number(source.droppableId));

		// Dispatch card order change in redux
		dispatch(listChangeCardOrder({ destination, source, draggableId }));
	}

	// Element
	return (
		<>
			<Header
				boardId={Number(boardId)}
				members={board?.members}
				title={board?.title}
				editable={isUserOwner}
				onTitleSave={handleBoardTitleSave}
			/>
			<Container component="main" maxWidth={false} sx={{ mt: 3 }}>
				<Grid container>
					<DragDropContext onDragEnd={onDragEnd}>
						{/* <Droppable
							droppableId="all-lists"
							direction="horizontal"
							type="list"
						>
							{(provided) => ( */}
						<Grid
							item
							// {...provided.droppableProps}
							// ref={provided.innerRef}
							xs={12}
							sx={listsContainerStyles}
						>
							{board?.lists?.length > 0 &&
								board.lists.map((listId: number) => (
									<List key={listId} listId={listId} />
								))}
							<AddItem
								type="list"
								parentId={Number(boardId)}
								order={board?.lists?.length > 0 && board.lists.length}
							/>
							{/* {provided.placeholder} */}
						</Grid>
						{/* )}
						</Droppable>*/}
					</DragDropContext>
				</Grid>
			</Container>
		</>
	);
}

export default App;
