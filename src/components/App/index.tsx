// imports
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// Store
import {
	boardsFetchById,
	boardsUpdate,
	selectBoardsById,
	boardsChangeListOrder,
	boardClearStatus,
} from '../../features/boards/boardsSlice';
import { boardsMemberFetchAll } from '../../features/boardsMember/boardsMemberSlice';
import { labelsFetchAll } from '../../features/labels/labelsSlice';
import {
	listChangeCardOrder,
	listClearStatus,
	listsUpdate,
} from '../../features/lists/listsSlice';
import { cardsUpdate } from '../../features/cards/cardsSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';

// Component
import Header from '../Header';
import ListItem from '../ListItem';
import AddItem from '../ListItem/AddItem';

// MUI
import { Box, CircularProgress, Container, Grid } from '@mui/material';

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
	const [dndObj, setDndObj] = useState<any>({});

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
	const { status: boardsApiStatus } = useAppSelector((state) => state.boards);
	const { status: labelsApiStatus } = useAppSelector((state) => state.labels);
	const { status: boardMemberApiStatus } = useAppSelector(
		(state) => state.boardsMember
	);

	const dispatch = useAppDispatch();
	const isUserOwner = userId === board?.ownerId ? true : false;

	// Functions
	// First init
	useEffect(() => {
		dispatch(boardsFetchById({ id: Number(boardId) }));
		dispatch(boardsMemberFetchAll({ boardId: Number(boardId) }));
		dispatch(labelsFetchAll());
		setDndObj({});
		// eslint-disable-next-line
	}, []);

	// Dispatch card order changes to api after redux changed
	useEffect(() => {
		if (dndObj && dndObj.type === 'card' && listUpdateStatus === 'succeeded') {
			// Get list Ids
			const startListId = Number(dndObj.source.droppableId);
			const finishListId = Number(dndObj.destination.droppableId);

			// Get lists
			const startList = listEntities[startListId];
			const finishList = listEntities[finishListId];

			// If Lists are the same
			// Dispatch only one list
			if (startList === finishList) {
				startList.cards.forEach((cardId: number, index: number) => {
					dispatch(cardsUpdate({ id: cardId, order: index }));
				});

				dispatch(listClearStatus());
				return;
			}

			// If List are not the same
			// Dispatch for both of them
			startList.cards.forEach((cardId: number, index: number) => {
				dispatch(
					cardsUpdate({ id: cardId, listId: startListId, order: index })
				);
			});

			finishList.cards.forEach((cardId: number, index: number) => {
				dispatch(
					cardsUpdate({ id: cardId, listId: finishListId, order: index })
				);
			});

			dispatch(listClearStatus());
		}
		// eslint-disable-next-line
	}, [listEntities]);

	// Dispatch list order changes to api after redux changed
	useEffect(() => {
		if (dndObj && dndObj.type === 'list' && boardsApiStatus === 'succeeded') {
			// Get lists
			const startList = board.lists;

			startList.forEach((listId: number, index: number) => {
				dispatch(listsUpdate({ id: listId, order: index }));
			});

			dispatch(boardClearStatus());
		}
		// eslint-disable-next-line
	}, [board]);

	// Handle Board Title Save
	function handleBoardTitleSave(title: string): void {
		dispatch(boardsUpdate({ id: Number(boardId), title }));
	}

	// DnD
	function onDragEnd(result: any) {
		// get DnD variables
		const { destination, source, draggableId, type } = result;

		// Controls
		if (!destination) return;

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		// get
		setDndObj({ destination, source, draggableId, type });

		if (type === 'list') {
			dispatch(
				boardsChangeListOrder({ boardId, destination, source, draggableId })
			);
			return;
		}

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
					{boardsApiStatus === 'loading' ||
					labelsApiStatus === 'loading' ||
					boardMemberApiStatus === 'loading' ? (
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								width: '100%',
								mt: 5,
							}}
						>
							<CircularProgress />
						</Box>
					) : (
						<DragDropContext onDragEnd={onDragEnd}>
							<Droppable
								droppableId="all-lists"
								direction="horizontal"
								type="list"
							>
								{(provided) => (
									<Grid
										{...provided.droppableProps}
										ref={provided.innerRef}
										item
										xs={12}
										sx={listsContainerStyles}
									>
										{board?.lists?.length > 0 &&
											board.lists.map((listId: number, index: number) => (
												<ListItem key={listId} listId={listId} index={index} />
											))}
										{provided.placeholder}
										<AddItem
											type="list"
											parentId={Number(boardId)}
											order={board?.lists?.length > 0 && board.lists.length}
										/>
									</Grid>
								)}
							</Droppable>
						</DragDropContext>
					)}
				</Grid>
			</Container>
		</>
	);
}

export default App;
