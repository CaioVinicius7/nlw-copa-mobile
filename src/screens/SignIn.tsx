import { Center, Icon } from "native-base";
import { Fontisto } from "@expo/vector-icons";

import { Button } from "../components/Button";

import Logo from "../assets/logo.svg";

export function SignIn() {
	return (
		<Center flex={1} bg="gray.900">
			<Logo />

			<Button
				title="Entrar com google"
				leftIcon={<Icon as={Fontisto} name="google" size="md" />}
				type="SECONDARY"
			/>
		</Center>
	);
}
