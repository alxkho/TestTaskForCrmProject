import {useEffect} from 'react';
import {Button, DatePicker, Form, Input, Modal} from "antd";
import {contactApi} from "../../api/contactApi/contactApi.js";
import dayjs from "dayjs";
import {notFutureDateValidator, notLongStringValidator} from "../../utils/validators.js";

const ContactModal = ({isModalOpen, setIsModalOpen, currentContact, setCurrentContact, getContacts}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            ...currentContact,
            birthDate: currentContact?.birthDate ? dayjs(currentContact?.birthDate) : null})
    }, [currentContact]);

    const onFinish = (values) => {
        const contact = {
            ...values,
            id: currentContact?.id,
            birthDate: values?.birthDate ? values.birthDate.format('YYYY-MM-DD') : null
        }

        const promise = currentContact
            ? contactApi.update(contact)
            : contactApi.create(contact);

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
                layout="vertical"
            >
                <Form.Item
                    name="name"
                    label="Имя"
                    rules={[
                        { required: true },
                        { validator: notLongStringValidator(50)}
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="mobilePhone"
                    label="Мобильный телефон"
                    rules={[
                        { required: true }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="jobTitle"
                    label="Место работы"
                    rules={[
                        { required: true },
                        { validator: notLongStringValidator(100)}
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="birthDate"
                    label="Дата рождения"
                    rules={[
                        { required: true },
                        { validator: notFutureDateValidator()}
                    ]}
                >
                    <DatePicker format="DD.MM.YYYY"/>
                </Form.Item>
                <Button htmlType="submit" type="primary">
                    Сохранить
                </Button>
            </Form>
        </Modal>
    );
};

export default ContactModal;