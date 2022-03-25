import { useEffect } from 'react';
import { selectListsById } from '../../features/lists/listsSlice';
import { useAppSelector } from '../../hooks/hooks';

interface ListItemInterface {
	listId: number;
}

function ListItem({ listId }: ListItemInterface) {
	const list = useAppSelector((state) => selectListsById(state, listId));

	return <div>{`${list.title} ${list.id}`}</div>;
}

export default ListItem;
