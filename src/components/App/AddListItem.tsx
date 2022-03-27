import { useState } from 'react';

import { Box, Button } from '@mui/material';

function AddListItem() {
	const [showForm, setShowForm] = useState<boolean>(false);

	return (
		<Box
			sx={{
				backgroundColor: '#dcefff',
				borderRadius: '10px',
				padding: 2,
				mr: 3,
				boxShadow: 3,
			}}
		>
			<Button>Add List</Button>
		</Box>
	);
}

export default AddListItem;
