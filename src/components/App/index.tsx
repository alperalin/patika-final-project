// imports
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Store
import {
	boardsFetchById,
	boardsUpdate,
	selectBoardsById,
} from '../../features/boards/boardsSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';

// Component
import Header from '../Header';
import ListItem from './ListItem';

// MUI
import { Container, Grid } from '@mui/material';

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

	function handleBoardTitleSave(title: string): void {
		dispatch(boardsUpdate({ id: Number(boardId), title }));
	}

	// Element
	return (
		<>
			<Header
				title={board?.title}
				editable={isUserOwner}
				onTitleSave={handleBoardTitleSave}
			/>
			<Container component="main" sx={{ mt: 5 }}>
				<Grid container>
					<Grid item xs={12}>
						{board?.lists?.length > 0 &&
							board.lists.map((listId: number) => (
								<ListItem key={listId} listId={listId} />
							))}

						{/* {apiStatus === 'loading' && (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress />
				</Box>
			)} */}

						{/* {apiStatus === 'succeeded' && ( */}
						{/* <Grid
					container
					direction="row"
					justifyContent="center"
					alignItems="stretch"
					spacing={3}
					mt={5}
				>
					
				</Grid> */}
						{/* )} */}
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default App;
