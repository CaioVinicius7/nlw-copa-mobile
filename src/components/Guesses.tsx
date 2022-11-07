import { useState, useEffect } from "react";
import { FlatList, Toast } from "native-base";

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

	useEffect(() => {
		fetchGames();
	}, []);
	return (
		<FlatList
			data={games}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<Game
					data={item}
					setFirstTeamPoints={setFirstTeamPoints}
					setSecondTeamPoints={setSecondTeamPoints}
					onGuessConfirm={() => null}
				/>
			)}
		/>
	);
}
