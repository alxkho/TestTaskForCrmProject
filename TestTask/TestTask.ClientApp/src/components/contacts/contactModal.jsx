import {useEffect} from 'react';
import {Button, DatePicker, Form, Input, Modal} from "antd";
import moment from "moment";
import {contactApi} from "../../api/contactApi/contactApi.js";

const ContactModal = ({isModalOpen, setIsModalOpen, currentContact, setCurrentContact, getContacts}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
                ...currentContact,
                birthDate: currentContact?.birthDate ? moment(currentContact?.birthDate) : null})
    }, [currentContact]);

    const onFinish = (values) => {
        console.log(values);
        const promise = currentContact
            ? contactApi.update({id: currentContact.id, ...values})
            : contactApi.create(values);

        promise.then(() => {
            handleCancel()
            getContacts()
        })
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setCurrentContact(null);
        form.resetFields();
    };

    return (
        <Modal
            title={`${currentContact ? "Редактирование" : "Создание"} контакта`}
            open={isModalOpen}
            closable={true}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                form={form}
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item name="name" label="Имя">
                    <Input />
                </Form.Item>
                <Form.Item name="mobilePhone" label="Мобильный телефон">
                    <Input />
                </Form.Item>
                <Form.Item name="jobTitle" label="Место работы">
                    <Input />
                </Form.Item>
                <Form.Item name="birthDate" label="Дата рождения">
                    <DatePicker format={"DD.MM.YYYY"} />
                </Form.Item>
                <Button htmlType="submit" type="primary">
                    Сохранить
                </Button>
            </Form>
        </Modal>
    );
};

export default ContactModal;