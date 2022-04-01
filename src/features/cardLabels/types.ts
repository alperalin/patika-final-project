// Interfaces
interface CardLabelInterface {
	id: number;
	cardId: number;
	labelId: number;
	createdAt: string;
	updatedAt: string;
}

interface CardLabelCreateInterface {
	cardId: CardLabelInterface['cardId'];
	labelId: CardLabelInterface['labelId'];
}

interface CardLabelDeleteInterface {
	id: CardLabelInterface['id'];
	cardId: CardLabelInterface['cardId'];
	labelId: CardLabelInterface['labelId'];
}

export type {
	CardLabelInterface,
	CardLabelCreateInterface,
	CardLabelDeleteInterface,
};
