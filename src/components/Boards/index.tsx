import React, { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
	create,
	fetchAll,
	clearStatus,
} from '../../features/boards/boardsSlice';
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
	Typography,
} from '@mui/material';

import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';
import AssessmentSharpIcon from '@mui/icons-material/AssessmentSharp';

function Board() {
	const boards = useAppSelector((state) => state.boards.data);
	const apiStatus = useAppSelector((state) => state.boards.apiStatus);
	const apiMessage = useAppSelector((state) => state.boards.apiMessage);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	// first init
	// Boards cekiliyor
	useEffect(() => {
		if (apiStatus === 'idle') {
			dispatch(fetchAll());
		}
	}, []);

	// Board islemleri yapildiktan sonra
	// apiStatus idle durumuna aliniyor
	useEffect(() => {
		if (apiStatus === 'succeeded') {
			dispatch(clearStatus());
		}
	}, [apiStatus]);

	// create new board
	function createNewBoard(): void {
		dispatch(create({ title: 'untitled' }));
		navigate(`/boards/${boards.length ? boards[boards.length - 1].id + 1 : 1}`);
	}

	return (
		<Grid item xs={12} sx={{ padding: 2 }}>
			<Typography component="h1" sx={{ fontSize: '2rem', textAlign: 'center' }}>
				Select A Board
			</Typography>

			{apiStatus === 'loading' && (
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress />
				</Box>
			)}

			{boards?.length && (
				<Grid
					container
					direction="row"
					justifyContent="center"
					alignItems="stretch"
					spacing={3}
					mt={5}
				>
					{boards &&
						boards.map((board) => (
							<Grid item key={board.id} xs={3}>
								<Card
									sx={{
										width: '100%',
										minHeight: 216,
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
										component={RouterLink}
										to={`/boards/${board.id}`}
									>
										<CardContent sx={{ width: '100%', textAlign: 'center' }}>
											<AssessmentSharpIcon sx={{ fontSize: 64, mb: 1 }} />
											<Typography component="h5" variant="h5" gutterBottom>
												{board.title}
											</Typography>
											<AvatarGroup max={2}>
												{board.members &&
													board.members.map((member) => (
														<Avatar key={member.id}>{`${member.username.charAt(
															0
														)}`}</Avatar>
													))}
											</AvatarGroup>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
						))}

					<Grid item key={boards ? boards[boards.length - 1].id + 1 : 1} xs={3}>
						<Card
							sx={{
								width: '100%',
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
									<AddBoxSharpIcon sx={{ fontSize: 64, mb: 1 }} />
									<Typography component="h5" variant="h5" gutterBottom>
										Add New
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				</Grid>
			)}
		</Grid>
	);
}

export default Board;
