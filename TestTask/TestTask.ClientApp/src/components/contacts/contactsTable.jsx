import { Button, message, Pagination, Popconfirm, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { contactApi } from "../../api/contactApi/contactApi.js";
import dayjs from "dayjs";
import { normalizeMobilePhone } from "../../utils/mobilePhoneHelper.js";
import { DATE_DISPLAY_FORMAT } from "../../constants/contacts.js";

const ContactsTable = ({
    data,
    loading,
    setCurrentContact,
    setIsModalOpen,
    getContacts,
    pageNumber,
    setPageNumber,
    pageSize,
}) => {
    const deleteHandler = (contactId) => {
        contactApi
            .delete({ id: contactId })
            .then(() => {
                message.success("Контакт успешно удален");
                getContacts(pageNumber);
            })
            .catch(() => {
                message.error("Не удалось удалить контакт. Попробуйте позже.");
            });
    };

    const editButtonHandler = (contact = null) => {
        setIsModalOpen(true);
        setCurrentContact(contact);
    };

    const onPaginationChange = (pageNumber) => {
        setPageNumber(pageNumber);
        getContacts(pageNumber);
    };

    const columns = [
        {
            title: "Имя",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Мобильный телефон",
            dataIndex: "mobilePhone",
            key: "mobilePhone",
            render: (text) => "+375 " + normalizeMobilePhone(text),
        },
        {
            title: "Место работы",
            dataIndex: "jobTitle",
            key: "jobTitle",
        },
        {
            title: "Дата рождения",
            dataIndex: "birthDate",
            key: "birthDate",
            render: (text) => dayjs(text).format(DATE_DISPLAY_FORMAT),
        },
        {
            title: "",
            key: "actions",
            render: (_, contact) => (
                <div className={"table-btn"}>
                    <Button icon={<EditOutlined />} onClick={() => editButtonHandler(contact)} />

                    <Popconfirm
                        title={"Вы уверены?"}
                        onConfirm={() => deleteHandler(contact.id)}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <>
            <Table
                dataSource={data?.items ?? []}
                loading={loading}
                columns={columns}
                bordered
                pagination={false}
                rowKey="id"
            />
            {data?.totalItemsCount > 0 && (
                <Pagination
                    align="center"
                    pageSize={pageSize}
                    total={data?.totalItemsCount}
                    onChange={onPaginationChange}
                    current={pageNumber}
                    disabled={loading}
                />
            )}
        </>
    );
};

export default ContactsTable;
