import {Button, Collapse, DatePicker, Form, Input, Row} from "antd";
import {CloseOutlined, SearchOutlined} from "@ant-design/icons";

const ContactFilters = ({setFilters}) => {
    const [form] = Form.useForm()

    const onFinish = (values) => {
        setFilters({
            ...values,
            birthDateFrom: values?.birthDate && values?.birthDate[0]
                ? values.birthDate[0].format('YYYY-MM-DD')
                : null,
            birthDateTo: values?.birthDate && values?.birthDate[1]
                ? values.birthDate[1].format('YYYY-MM-DD')
                : null,
        })
    }

    const resetFilters = () => {
        form.resetFields()
        setFilters({})
    }

    const items = [
        {
            key: '1',
            label: 'Фильтр',
            children: <>
                <Form form={form} onFinish={onFinish} className="filters" layout="inline">
                    <div className="filters-form">
                            <Row type="flex" gap="10px">
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
            </>,
        }]

    return (
        <div className="filters">
            <Collapse ghost host items={items} onChange={resetFilters}/>
        </div>
    );
};

export default ContactFilters;