// Interfaces
interface BoardsMemberInterface {
	id: number;
	userId: number;
	boardId: number;
	createdAt: string;
	updatedAt: string;
}

interface BoardsMemberCreateInterface {
	userId: BoardsMemberInterface['userId'];
	username: string;
	boardId: BoardsMemberInterface['boardId'];
}

interface BoardsMemberDeleteInterface {
	id: BoardsMemberInterface['id'];
	userId: BoardsMemberInterface['userId'];
	boardId: BoardsMemberInterface['boardId'];
}

interface BoardsMemberFetchInterface {
	boardId: BoardsMemberInterface['boardId'];
}

export type {
	BoardsMemberInterface,
	BoardsMemberCreateInterface,
	BoardsMemberDeleteInterface,
	BoardsMemberFetchInterface,
};
