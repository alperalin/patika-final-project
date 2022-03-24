import React, { useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { fetchById } from '../../features/boards/boardsSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { selectListsByBoardId } from '../../features/lists/listsSlice';

// MUI
import {
	Avatar,
	AvatarGroup,
	Box,
	Card,
	CardActionArea,
	CardContent,
	CircularProgress,
	Grid,
	Stack,
	Typography,
} from '@mui/material';

function App() {
	const { boardId } = useParams();
	const lists = useAppSelector((state) =>
		selectListsByBoardId(state, Number(boardId))
	);
	const dispatch = useAppDispatch();

	// Boards cekiliyor
	// useEffect(() => {
	// 	if (apiStatus === 'idle') {
	// 		dispatch(fetchAll());
	// 	}
	// }, [dispatch, apiStatus]);

	useEffect(() => {
		dispatch(fetchById({ id: Number(boardId) }));
	}, []);

	return (
		<Grid item xs={12} sx={{ padding: 2 }}>
			<Typography component="h1" sx={{ fontSize: '2rem', textAlign: 'center' }}>
				Welcome To {boardId}
			</Typography>

			{lists &&
				lists.map((list, index) => <span key={index}>{list.title}</span>)}

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
	);
}

export default App;
