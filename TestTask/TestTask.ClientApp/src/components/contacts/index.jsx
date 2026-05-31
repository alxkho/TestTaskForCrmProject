import "./style.css";
import { Button, message, Typography } from "antd";
import ContactsTable from "./contactsTable.jsx";
import { useCallback, useEffect, useState } from "react";
import ContactModal from "./contactModal.jsx";
import { PlusOutlined } from "@ant-design/icons";
import { contactApi } from "../../api/contactApi/contactApi.js";
import ContactFilters from "./contactFilters.jsx";
import { DEFAULT_PAGE_SIZE } from "../../constants/contacts.js";

const { Title } = Typography;

const Contacts = () => {
    const [contacts, setContacts] = useState(null);
    const [currentContact, setCurrentContact] = useState(null);
    const [filters, setFilters] = useState({});
    const [pageNumber, setPageNumber] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const pageSize = DEFAULT_PAGE_SIZE;

    const getContacts = useCallback(
        (currentPageNumber = pageNumber) => {
            setLoading(true);
            contactApi
                .getPaged({
                    filter: filters,
                    pageSize: pageSize,
                    pageNumber: currentPageNumber,
                })
                .then((response) => {
                    setContacts(response);
                })
                .catch(() => {
                    message.error("Не удалось загрузить список контактов");
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [filters, pageNumber, pageSize],
    );

    useEffect(() => {
        setPageNumber(1);
        getContacts(1);
    }, [filters]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="contacts-container">
            <div className="contacts-header">
                <Title level={3}>Контакты</Title>
            </div>
            <div className="contacts-filter">
                <Button type="primary" icon={<PlusOutlined />} onClick={openModal}>
                    Добавить
                </Button>
                <ContactFilters setFilters={setFilters} />
            </div>
            <ContactsTable
                data={contacts}
                loading={loading}
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
                getContacts={getContacts}
            />
        </div>
    );
};

export default Contacts;
