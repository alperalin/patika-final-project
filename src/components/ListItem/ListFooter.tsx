// Mui
import { Box } from '@mui/material';

// Component
import AddItem from './AddItem';

// Interface
interface PropsInterface {
	type: 'list' | 'card';
	parentId: number;
	order: number;
}

// Styles
const footerStyles = { borderTop: '1px solid #A1A6C2', padding: 2, mt: 'auto' };

function ListFooter({ type, parentId, order = 0 }: PropsInterface) {
	return (
		<Box component="footer" sx={footerStyles}>
			<AddItem type={type} parentId={Number(parentId)} order={order} />
		</Box>
	);
}

export default ListFooter;
