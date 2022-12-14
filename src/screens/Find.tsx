import { useState } from "react";
import { Heading, Toast, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

import { api } from "../services/api";

export function Find() {
	const [isLoading, setIsLoading] = useState(false);
	const [code, setCode] = useState("");

	const { navigate } = useNavigation();

	async function handleJoinPoll() {
		try {
			setIsLoading(true);

			if (!code.trim()) {
				return Toast.show({
					title: "Informe o código!",
					placement: "top",
					bgColor: "red.500"
				});
			}

			await api.post("/polls/join", { code });

			Toast.show({
				title: "Você entrou no bolão com sucesso!",
				placement: "top",
				bgColor: "green.500"
			});

			navigate("polls");
		} catch (error) {
			console.log(error);

			setIsLoading(false);

			if (error.response?.data?.message === "Poll not found.") {
				return Toast.show({
					title: "Bolão não encontrado!",
					placement: "top",
					bgColor: "red.500"
				});
			}

			if (error.response?.data?.message === "You already join this poll.") {
				return Toast.show({
					title: "Você está nesse bolão!",
					placement: "top",
					bgColor: "red.500"
				});
			}

			Toast.show({
				title: "Você está nesse bolão!",
				placement: "top",
				bgColor: "red.500"
			});
		}
	}

	return (
		<VStack flex={1} bg="gray.900">
			<Header title="Buscar por código" showBackButton />

			<VStack mt={8} mx={5} alignItems="center">
				<Heading
					color="white"
					fontFamily="heading"
					fontSize="xl"
					mb={8}
					textAlign="center"
				>
					Encontre um bolão através de {"\n"} seu código único
				</Heading>

				<Input
					mb={2}
					placeholder="Qual o código do bolão?"
					autoCapitalize="characters"
					value={code}
					onChangeText={setCode}
				/>

				<Button
					title="BUSCAR BOLÃO"
					onPress={handleJoinPoll}
					disabled={isLoading}
				/>
			</VStack>
		</VStack>
	);
}
