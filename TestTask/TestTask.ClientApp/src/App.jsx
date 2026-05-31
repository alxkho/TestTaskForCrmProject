import "./App.css";
import Layout from "./components/layout/index.jsx";
import { ConfigProvider } from "antd";
import customTheme from "./theme.json";
import ruRU from "antd/locale/ru_RU";

function App() {
    return (
        <ConfigProvider locale={ruRU} theme={customTheme}>
            <Layout />
        </ConfigProvider>
    );
}

export default App;
