// Interfaces
interface BoardMemberInterface {
	id: number;
	boardId: number;
	userId: number;
	username?: string;
	createdAt: string;
	updatedAt: string;
}

export type { BoardMemberInterface };
