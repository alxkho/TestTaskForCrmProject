import './App.css'
import Layout from "./components/layout/index.jsx";
import {ConfigProvider} from "antd";
import customTheme from './theme.json';

function App() {
  return (
      <ConfigProvider locale="ru" theme={customTheme}>
        <Layout />
      </ConfigProvider>
  )
}

export default App
