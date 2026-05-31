import { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, message, Modal } from "antd";
import { contactApi } from "../../api/contactApi/contactApi.js";
import dayjs from "dayjs";
import {
    notFutureDateValidator,
    maxStringLengthValidator,
    phoneNumberValidator,
} from "../../utils/validators.js";
import { normalizeMobilePhone } from "../../utils/mobilePhoneHelper.js";
import { API_DATE_FORMAT } from "../../constants/contacts.js";

const ContactModal = ({
    isModalOpen,
    setIsModalOpen,
    currentContact,
    setCurrentContact,
    getContacts,
}) => {
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);

    useEffect(() => {
        if (currentContact) {
            form.setFieldsValue({
                ...currentContact,
                mobilePhone: currentContact?.mobilePhone
                    ? normalizeMobilePhone(currentContact.mobilePhone)
                    : null,
                birthDate: currentContact?.birthDate ? dayjs(currentContact?.birthDate) : null,
            });
        }
    }, [currentContact, form]);

    const onFinish = (values) => {
        const purePhone = values.mobilePhone?.replace(/\D/g, "");

        const contact = {
            ...values,
            id: currentContact?.id,
            mobilePhone: purePhone ? `+375${purePhone}` : null,
            birthDate: values?.birthDate ? values.birthDate.format(API_DATE_FORMAT) : null,
        };

        setConfirmLoading(true);

        const apiMethod = currentContact ? contactApi.update : contactApi.create;

        apiMethod(contact)
            .then(() => {
                handleCancel();
                getContacts();
            })
            .catch((error) => {
                message.error(error?.response?.data?.message || "Ошибка при сохранении контакта");
            })
            .finally(() => {
                setConfirmLoading(false);
            });
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
                disabled={confirmLoading}
            >
                <Form.Item
                    name="name"
                    label="Имя"
                    rules={[{ required: true }, { validator: maxStringLengthValidator(50) }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="mobilePhone"
                    label="Мобильный телефон"
                    normalize={normalizeMobilePhone}
                    rules={[{ required: true }, { validator: phoneNumberValidator() }]}
                >
                    <Input prefix={"+375"} placeholder="(__) ___-__-__" />
                </Form.Item>
                <Form.Item
                    name="jobTitle"
                    label="Место работы"
                    rules={[{ required: true }, { validator: maxStringLengthValidator(100) }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="birthDate"
                    label="Дата рождения"
                    rules={[{ required: true }, { validator: notFutureDateValidator() }]}
                >
                    <DatePicker format="DD.MM.YYYY" />
                </Form.Item>
                <Button htmlType="submit" type="primary" loading={confirmLoading}>
                    Сохранить
                </Button>
            </Form>
        </Modal>
    );
};

export default ContactModal;
