import "./style.css";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const TopMenu = () => {
    return (
        <div className="top-menu border-radius">
            <Button icon={<UserOutlined />}></Button>
        </div>
    );
};

export default TopMenu;
