import { useState, useEffect } from "react";
import { FlatList, Toast } from "native-base";

import { Loading } from "./Loading";
import { Game, GameProps } from "./Game";

import { api } from "../services/api";

interface GuessesProps {
	pollId: string;
}

export function Guesses({ pollId }: GuessesProps) {
	const [isLoading, setIsLoading] = useState(true);
	const [games, setGames] = useState<GameProps[]>([]);
	const [firstTeamPoints, setFirstTeamPoints] = useState("");
	const [secondTeamPoints, setSecondTeamPoints] = useState("");

	async function fetchGames() {
		try {
			setIsLoading(true);

			const response = await api.get(`/polls/${pollId}/games`);

			setGames(response.data.games);
		} catch (error) {
			console.log(error);

			Toast.show({
				title: "Não foi possível carregar os jogos",
				placement: "top",
				color: "red.500"
			});
		} finally {
			setIsLoading(false);
		}
	}

	async function handleGuessConfirm(gameId: string) {
		try {
			setIsLoading(true);

			if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
				return Toast.show({
					title: "Informe o placar do palpite",
					placement: "top",
					color: "red.500"
				});
			}

			await api.post(`/polls/${pollId}/games/${gameId}/guesses`, {
				firstTeamPoints: Number(firstTeamPoints),
				secondTeamPoints: Number(secondTeamPoints)
			});

			Toast.show({
				title: "Palpite realizado",
				placement: "top",
				color: "green.500"
			});

			fetchGames();
		} catch (error) {
			console.log(error);

			Toast.show({
				title: "Não foi possível enviar o palpite",
				placement: "top",
				color: "red.500"
			});
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchGames();
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<FlatList
			data={games}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<Game
					data={item}
					setFirstTeamPoints={setFirstTeamPoints}
					setSecondTeamPoints={setSecondTeamPoints}
					onGuessConfirm={() => handleGuessConfirm(item.id)}
				/>
			)}
			_contentContainerStyle={{
				paddingBottom: 100
			}}
		/>
	);
}
