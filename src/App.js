import { Provider } from "./context/MyContext";
import Main from "./components/Main";

function App() {
    return (
        <Provider>
            <Main />
        </Provider>
    );
}

export default App;
