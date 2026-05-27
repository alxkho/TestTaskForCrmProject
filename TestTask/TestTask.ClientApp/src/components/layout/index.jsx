import "./style.css"
import TopMenu from "../topMenu/index.jsx";
import Contacts from "../contacts/index.jsx";

const Layout = () => {
    return (
        <div className="layout">
            <TopMenu />
            <div className="content">
                <Contacts />
            </div>
        </div>
    );
};

export default Layout;