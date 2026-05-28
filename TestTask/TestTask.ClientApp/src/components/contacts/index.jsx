import "./style.css"
import {Button} from "antd";
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
    const [pageNumber, setPageNumber] = useState(1)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const pageSize = 5

    useEffect(() => {
        setPageNumber(1)
        getContacts(1)
    }, [filters])

    const getContacts = (currentPageNumber = pageNumber) => {
        contactApi.getPaged({
            filter: filters,
            pageSize,
            pageNumber: currentPageNumber
        })
            .then(response => setContacts(response));
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    return (
        <div className="contacts-container">
            <div className="contacts-header">
                <Title level={3}>Контакты</Title>
            </div>
            <div className="contacts-filter">
                <Button type="primary" icon={<PlusOutlined />} onClick={openModal}>Добавить</Button>
                <ContactFilters setFilters={setFilters}/>
            </div>
            <ContactsTable
                data={contacts}
                setCurrentContact={setCurrentContact}
                setIsModalOpen={setIsModalOpen}
                getContacts={getContacts}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                pageSize={pageSize}
            />
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