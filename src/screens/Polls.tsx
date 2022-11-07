import { useEffect, useState } from "react";
import { FlatList, Icon, Toast, VStack } from "native-base";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { PollCard, PollCardProps } from "../components/PollCard";
import { EmptyPoolList } from "../components/EmptyPoolList";

import { api } from "../services/api";

export function Polls() {
	const [isLoading, setIsLoading] = useState(true);
	const [polls, setPolls] = useState<PollCardProps[]>([]);
	const { navigate } = useNavigation();

	async function fetchPolls() {
		try {
			setIsLoading(true);

			const response = await api.get("/polls");

			setPolls(response.data.polls);
		} catch (error) {
			console.log(error);

			Toast.show({
				title: "Não foi possível carregar os bolões",
				placement: "top",
				bgColor: "red.500"
			});
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchPolls();
	}, []);

	return (
		<VStack flex={1} bgColor="gray.900">
			<Header title="Meus bolões" />

			<VStack
				mt={6}
				mx={5}
				borderBottomWidth={1}
				borderBottomColor="gray.600"
				pb={4}
				mb={4}
			>
				<Button
					title="BUSCAR BOLÃO POR CÓDIGO"
					leftIcon={
						<Icon as={Octicons} name="search" color="black" size="md" />
					}
					onPress={() => navigate("find")}
				/>
			</VStack>

			{isLoading ? (
				<Loading />
			) : (
				<FlatList
					data={polls}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <PollCard data={item} />}
					px={5}
					showsVerticalScrollIndicator={false}
					_contentContainerStyle={{
						paddingBottom: 10
					}}
					ListEmptyComponent={() => <EmptyPoolList />}
				/>
			)}
		</VStack>
	);
}
