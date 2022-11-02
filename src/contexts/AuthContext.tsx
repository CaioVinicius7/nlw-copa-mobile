import { createContext, ReactNode } from "react";

interface UserProps {
	name: string;
	avatarUrl: string;
}

export interface AuthContextDataProps {
	user: UserProps;
	signIn: () => Promise<void>;
}

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
	async function signIn() {
		console.log("Vamos Logar!");
	}

	return (
		<AuthContext.Provider
			value={{
				user: {
					name: "Caio",
					avatarUrl: "https://github.com/caiovinicius7.png"
				},
				signIn
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}