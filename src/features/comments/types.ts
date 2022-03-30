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

interface CommentCreateInterface {
	cardId: CommentInterface['cardId'];
	message: CommentInterface['message'];
}

interface CommentDeleteInterface {
	id: CommentInterface['id'];
	cardId: CommentInterface['cardId'];
}

export type {
	CommentInterface,
	CommentCreateInterface,
	CommentDeleteInterface,
};
