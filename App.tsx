import { NativeBaseProvider, Center, Text } from "native-base";
import { StatusBar } from "expo-status-bar";

import { THEME } from "./src/styles/theme";

export default function App() {
	return (
		<NativeBaseProvider theme={THEME}>
			<Center flex={1} bg="gray.900">
				<Text color="white">NLW Copa</Text>
				<StatusBar style="light" />
			</Center>
		</NativeBaseProvider>
	);
}
