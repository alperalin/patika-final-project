// Interfaces
interface UserInterface {
	id: number | null;
	username: string;
	token: string;
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

export type { UserInterface, LoginInterface, RegisterInterface };
