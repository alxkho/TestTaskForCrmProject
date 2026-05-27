import "./style.css"
import {Button, Input} from "antd";
import ContactsTable from "./contactsTable.jsx";
import Title from "antd/es/typography/Title.js";
import  {useEffect, useState} from "react";
import ContactModal from "./contactModal.jsx";
import {PlusOutlined} from "@ant-design/icons";
import {contactApi} from "../../api/contactApi/contactApi.js";
import ContactFilters from "./contactFilters.jsx";

const Contacts = () => {
    const [contacts, setContacts] = useState(null)
    const [currentContact, setCurrentContact] = useState(null)
    const [filters, setFilters] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getContacts()
    }, [filters]);

    const getContacts = () => {
        contactApi.getAll(filters).then(response => setContacts(response));
    }

    const openModal = () => {
        setIsModalOpen(true);
    }

    return (
        <div className="contacts-container">
            <div className="contacts-header">
                <Title level={3}>Контакты</Title>
            </div>
            <div className="contacts-filter">
                <Input placeholder="Введите текст для поиска по таблице"/>
                <Button type="primary" icon={<PlusOutlined />} onClick={openModal}>Добавить</Button>
            </div>
            <ContactsTable
                data={contacts}
                setCurrentContact={setCurrentContact}
                setIsModalOpen={setIsModalOpen}
                getContacts={getContacts}/>
            <ContactModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                currentContact={currentContact}
                setCurrentContact={setCurrentContact}
                getContacts={getContacts}/>
        </div>
    );
};

export default Contacts;