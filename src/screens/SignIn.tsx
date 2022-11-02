import { Center, Icon, Text } from "native-base";
import { Fontisto } from "@expo/vector-icons";

import { Button } from "../components/Button";

import Logo from "../assets/logo.svg";

export function SignIn() {
	return (
		<Center flex={1} bg="gray.900" p="7">
			<Logo />

			<Button
				type="SECONDARY"
				title="Entrar com google"
				leftIcon={<Icon as={Fontisto} name="google" size="md" />}
				mt={12}
			/>

			<Text color="white" textAlign="center" mt={4}>
				Não utilizamos nenhuma informação além {"\n"} do seu e-mail para criação
				de sua conta.
			</Text>
		</Center>
	);
}
