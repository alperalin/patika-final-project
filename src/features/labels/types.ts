// Interfaces
interface LabelInterface {
	id: number;
	title: string;
	color: string;
	createdAt: string;
	updatedAt: string;
}

interface LabelReduxInterface {
	data: LabelInterface[];
	apiStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
	apiMessage: string | null;
}

interface CardLabelInterface {
	id: number;
	cardId: number;
	labelId: number;
	createdAt: string;
	updatedAt: string;
}

export type { LabelInterface, CardLabelInterface, LabelReduxInterface };
