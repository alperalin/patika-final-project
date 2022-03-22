// Interfaces
interface UserInterface {
	id: number | null;
	username: string;
	token: string;
}

interface UserReduxInterface extends UserInterface {
	isLoggedIn: boolean;
	apiStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
	apiMessage: string | null;
}

interface LoginInterface {
	username: string;
	password: string;
}

interface RegisterInterface {
	username: string;
	password: string;
	passwordConfirm: string;
}

export type {
	UserReduxInterface,
	UserInterface,
	LoginInterface,
	RegisterInterface,
};
