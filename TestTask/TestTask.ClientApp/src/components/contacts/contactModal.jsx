import {useEffect} from 'react';
import {Button, DatePicker, Form, Input, Modal} from "antd";
import {contactApi} from "../../api/contactApi/contactApi.js";
import dayjs from "dayjs";
import {notFutureDateValidator, maxStringLengthValidator, phoneNumberValidator} from "../../utils/validators.js";
import {normalizeMobilePhone} from "../../utils/mobilePhoneHelper.js";

const ContactModal = ({isModalOpen, setIsModalOpen, currentContact, setCurrentContact, getContacts}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            ...currentContact,
            mobilePhone: currentContact?.mobilePhone ? normalizeMobilePhone(currentContact.mobilePhone) : null,
            birthDate: currentContact?.birthDate ? dayjs(currentContact?.birthDate) : null})
    }, [currentContact]);

    const onFinish = (values) => {
        const contact = {
            ...values,
            id: currentContact?.id,
            mobilePhone: values?.mobilePhone
                ? "+375" + values.mobilePhone.replace(/\D/g, "")
                : null,
            birthDate: values?.birthDate
                ? values.birthDate.format('YYYY-MM-DD')
                : null
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
                        { validator: maxStringLengthValidator(50)}
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="mobilePhone"
                    label="Мобильный телефон"
                    normalize={normalizeMobilePhone}
                    rules={[
                        { required: true },
                        { validator: phoneNumberValidator()}
                    ]}
                >
                    <Input
                        prefix={"+375"}
                        placeholder="(__) ___-__-__"
                    />
                </Form.Item>
                <Form.Item
                    name="jobTitle"
                    label="Место работы"
                    rules={[
                        { required: true },
                        { validator: maxStringLengthValidator(100)}
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