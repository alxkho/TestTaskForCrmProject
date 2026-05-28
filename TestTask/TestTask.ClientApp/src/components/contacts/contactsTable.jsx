import {Button, Popconfirm, Table} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {contactApi} from "../../api/contactApi/contactApi.js";
import dayjs from "dayjs";
import {normalizeMobilePhone} from "../../utils/mobilePhoneHelper.js";

const ContactsTable = ({data, setCurrentContact, setIsModalOpen, getContacts}) => {

    const deleteHandler = (contactId) => {
        contactApi.delete({id: contactId})
            .then(() => getContacts())
    };

    const editButtonHandler = (contact = null) => {
        setIsModalOpen(true);
        setCurrentContact(contact);
    }

    const columns = [
        {
            title: "Имя",
            dataIndex: "name",
            key: "name",
        },{
            title: "Мобильный телефон",
            dataIndex: "mobilePhone",
            key: "mobilePhone",
            render: (text) => "+375 " + normalizeMobilePhone(text),
        },{
            title: "Место работы",
            dataIndex: "jobTitle",
            key: "jobTitle",
        },{
            title: "Дата рождения",
            dataIndex: "birthDate",
            key: "birthDate",
            render: (text) => dayjs(text).format("DD.MM.YYYY"),
        },{
            title: "",
            key: "edit",
            render: (_, contact) => (
                <div className={"table-btn"}>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => editButtonHandler(contact)}
                    />

                    <Popconfirm title={"Вы уверены?"}
                                onConfirm={() => deleteHandler(contact.id)}
                                okText="Да"
                                cancelText="Нет">
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </div>
            )
        }
    ]
    
    return (
        <Table dataSource={data} columns={columns} bordered/>
    );
};

export default ContactsTable;