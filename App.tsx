import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import Container from "./components/Container";

export default function App() {
    return (
        <GluestackUIProvider config={config}>
            <Home />
        </GluestackUIProvider>
    );
}

const Home = () => {
    return <Container />;
};
