// Interfaces
interface CommentInterface {
	id: number;
	cardId: number;
	message: string;
	authorId: number;
	author?: {
		id: number;
		username: string;
		createdAt: string;
		updatedAt: string;
	};
	createdAt: string;
	updatedAt: string;
}

export type { CommentInterface };
