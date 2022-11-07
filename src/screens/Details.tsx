import { useState, useEffect } from "react";
import { Share } from "react-native";
import { HStack, Toast, VStack } from "native-base";
import { useRoute } from "@react-navigation/native";

import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { PollCardProps } from "../components/PollCard";
import { PollHeader } from "../components/PollHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Option } from "../components/Option";

import { api } from "../services/api";

interface RouteParams {
	id: string;
}

export function Details() {
	const [optionSelected, setOptionSelected] = useState<"guesses" | "ranking">(
		"guesses"
	);
	const [isLoading, setIsLoading] = useState(true);
	const [pollDetails, setPollDetails] = useState<PollCardProps>(
		{} as PollCardProps
	);

	const route = useRoute();
	const { id } = route.params as RouteParams;

	async function fetchPollsDetails() {
		try {
			setIsLoading(true);

			const response = await api.get(`/polls/${id}`);

			setPollDetails(response.data.poll);
		} catch (error) {
			console.log(error);

			Toast.show({
				title: "Não foi possível carregar os detalhes do bolão",
				placement: "top",
				bgColor: "red.500"
			});
		} finally {
			setIsLoading(false);
		}
	}

	async function handleCodeShare() {
		await Share.share({
			message: pollDetails.code
		});
	}

	useEffect(() => {
		fetchPollsDetails();
	}, [id]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<VStack flex={1} bg="gray.900">
			<Header
				title={pollDetails.title}
				onShare={handleCodeShare}
				showBackButton
				showShareButton
			/>

			{pollDetails._count?.participants > 0 ? (
				<VStack flex={1} px={5}>
					<PollHeader data={pollDetails} />

					<HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
						<Option
							title="Seus palpites"
							isSelected={optionSelected === "guesses"}
							onPress={() => setOptionSelected("guesses")}
						/>
						<Option
							title="Ranking do grupo"
							isSelected={optionSelected === "ranking"}
							onPress={() => setOptionSelected("ranking")}
						/>
					</HStack>
				</VStack>
			) : (
				<EmptyMyPoolList code={pollDetails.code} />
			)}
		</VStack>
	);
}
