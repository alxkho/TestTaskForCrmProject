import './App.css'
import Layout from "./components/layout/index.jsx";
import {ConfigProvider} from "antd";

function App() {
  return (
      <ConfigProvider locale="ru">
        <Layout />
      </ConfigProvider>
  )
}

export default App
