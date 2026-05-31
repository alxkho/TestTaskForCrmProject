import { Button, Collapse, DatePicker, Form, Input, Row } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { API_DATE_FORMAT } from "../../constants/contacts.js";

const ContactFilters = ({ setFilters }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const { birthDate, ...otherValues } = values;

        setFilters({
            ...otherValues,
            birthDateFrom: birthDate && birthDate[0] ? birthDate[0].format(API_DATE_FORMAT) : null,
            birthDateTo: birthDate && birthDate[1] ? birthDate[1].format(API_DATE_FORMAT) : null,
        });
    };

    const resetFilters = () => {
        form.resetFields();
        setFilters({});
    };

    const items = [
        {
            key: "1",
            label: "Фильтр",
            children: (
                <Form form={form} onFinish={onFinish} className="filters" layout="inline">
                    <div className="filters-form">
                        <Row gutter={[10, 10]}>
                            <Form.Item name="name">
                                <Input placeholder="Имя" />
                            </Form.Item>
                            <Form.Item name="mobilePhone">
                                <Input placeholder="Мобильный телефон" />
                            </Form.Item>
                            <Form.Item name="jobTitle">
                                <Input placeholder="Место работы" />
                            </Form.Item>
                            <Form.Item name="birthDate">
                                <DatePicker.RangePicker
                                    placeholder={["Дата рождения от", "До"]}
                                    format="DD.MM.YYYY"
                                    allowEmpty
                                />
                            </Form.Item>
                        </Row>
                    </div>
                    <div className="filters-btn">
                        <Button icon={<CloseOutlined />} onClick={resetFilters}></Button>
                        <Button type="primary" htmlType="submit" icon={<SearchOutlined />}></Button>
                    </div>
                </Form>
            ),
        },
    ];

    return (
        <div className="filters">
            <Collapse ghost items={items} onChange={resetFilters} />
        </div>
    );
};

export default ContactFilters;
