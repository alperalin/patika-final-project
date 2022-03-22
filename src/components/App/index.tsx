import React, { useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';

import { fetchAll } from '../../features/boards/boardsSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';

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
	// const boards = useAppSelector((state) => state.boards.data);
	// const apiStatus = useAppSelector((state) => state.boards.apiStatus);
	// const apiMessage = useAppSelector((state) => state.boards.apiMessage);
	// const dispatch = useAppDispatch();
	const { boardId } = useParams();

	// Boards cekiliyor
	// useEffect(() => {
	// 	if (apiStatus === 'idle') {
	// 		dispatch(fetchAll());
	// 	}
	// }, [dispatch, apiStatus]);

	return (
		<Grid item xs={12} sx={{ padding: 2 }}>
			<Typography component="h1" sx={{ fontSize: '2rem', textAlign: 'center' }}>
				Welcome To {boardId}
			</Typography>

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
