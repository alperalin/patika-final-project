import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';

// Component
import Header from '../Header';
import BoardItem from './BoardItem';

// Store
import {
	boardsCreate,
	boardsFetchAll,
	selectBoardsAll,
} from '../../features/boards/boardsSlice';
import { usersFetchAll } from '../../features/users/usersSlice';

// MUI
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CircularProgress,
	Container,
	Grid,
	Typography,
} from '@mui/material';

import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';

// Element
function Board() {
	const boards = useAppSelector(selectBoardsAll);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { status: boardsApiStatus } = useAppSelector((state) => state.boards);
	const { status: usersApiStatus } = useAppSelector((state) => state.users);

	// first init
	useEffect(() => {
		dispatch(usersFetchAll());
		dispatch(boardsFetchAll());
	}, []);

	// create new board
	async function createNewBoard(): Promise<void> {
		await dispatch(boardsCreate({ title: 'untitled' }))
			.then((response: any) => navigate(`/boards/${response.payload.id}`))
			.catch((error) => console.log(error));
	}

	return (
		<>
			<Header />
			<Container component="main" sx={{ mt: 5 }}>
				<Grid container>
					<Grid item md></Grid>

					{boardsApiStatus === 'loading' || usersApiStatus === 'loading' ? (
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
						<Grid item xs={12} sx={{ padding: 2 }}>
							<Typography
								component="h1"
								sx={{ fontSize: '2rem', textAlign: 'center' }}
							>
								Select A Board
							</Typography>
							<Grid
								container
								direction="row"
								justifyContent="center"
								alignItems="stretch"
								spacing={3}
								mt={5}
							>
								{boards?.length > 0 &&
									boards.map((board) => (
										<Grid item key={board.id} md={3} xs={4}>
											<BoardItem board={board} />
										</Grid>
									))}
								{/* Add New Card */}
								<Grid
									item
									key={
										boards?.length > 0 ? boards[boards.length - 1].id + 1 : 1
									}
									md={3}
									xs={4}
								>
									<Card
										sx={{
											width: '100%',
											minHeight: '245.16px',
											height: '100%',
										}}
									>
										<CardActionArea
											sx={{
												display: 'flex',
												height: '100%',
												alignContent: 'center',
												justifyContent: 'center',
											}}
											onClick={createNewBoard}
										>
											<CardContent sx={{ width: '100%', textAlign: 'center' }}>
												<AddBoxSharpIcon
													sx={{ fontSize: 64, color: '#1976d2', mb: 1 }}
												/>
												<Typography component="h5" variant="h5" gutterBottom>
													Add New
												</Typography>
											</CardContent>
										</CardActionArea>
									</Card>
								</Grid>
							</Grid>
						</Grid>
					)}
					<Grid item md></Grid>
				</Grid>
			</Container>
		</>
	);
}

export default Board;
