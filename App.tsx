import { NativeBaseProvider, Center, Text } from "native-base";
import { StatusBar } from "expo-status-bar";

export default function App() {
	return (
		<NativeBaseProvider>
			<Center flex={1} bg="black">
				<Text color="white">NLW Copa</Text>
				<StatusBar style="light" />
			</Center>
		</NativeBaseProvider>
	);
}
