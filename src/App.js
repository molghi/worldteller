import { Provider } from "./context/MyContext";
import Map from "./components/Map";

function App() {
    return (
        <Provider>
            <Map />
        </Provider>
    );
}

export default App;
