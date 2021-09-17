import { useState } from 'react'
import PropTypes from 'prop-types'
import { Drawer } from '@components/Common'
import { Button, DatePicker, Form, Switch, Typography } from 'antd'
import dayjs from 'dayjs'

const { Item: FormItem } = Form
const { Title } = Typography

const ImageFilter = ({ onFilter, ...props }) => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    const handleClick = async () => {
        let { executed, date, ...rest } = await form.validateFields()

        executed = executed?.format('YYYY-MM-DD')
        date = date?.format('YYYY-MM-DD')

        setLoading(true)

        setTimeout(() => {
            onFilter({
                executed,
                date,
                ...rest,
            })
        }, 1000)
    }

    return (
        <Drawer title="Filtrar imágenes" footer={null} {...props}>
            <div style={{ padding: '10px 24px' }}>
                <div style={{ marginBottom: 50 }}>
                    <Title level={5}>Período</Title>
                    <Form
                        form={form}
                        layout={'vertical'}
                        initialValues={{
                            executed: dayjs(),
                            date: dayjs(),
                        }}
                    >
                        <FormItem label="Fecha de ejecución" name="executed">
                            <DatePicker format="YYYY-MM-DD" mode="date" style={{ width: 200 }} />
                        </FormItem>
                        <FormItem label="Fecha de registro" name="date">
                            <DatePicker format="YYYY-MM-DD" mode="date" style={{ width: 200 }} />
                        </FormItem>
                    </Form>
                    <Title level={5}>Opciones de imágen</Title>
                    <Form
                        form={form}
                        layout={'vertical'}
                        initialValues={{
                            valid: true,
                            processed: true,
                            evaluated: true,
                        }}
                    >
                        <FormItem label="Bien ejecutada" name="valid" valuePropName="checked">
                            <Switch checkedChildren="Sí" unCheckedChildren="No" defaultChecked={false} />
                        </FormItem>
                        <FormItem label="Imágenes procesadas" name="processed" valuePropName="checked">
                            <Switch checkedChildren="Sí" unCheckedChildren="No" defaultChecked={false} />
                        </FormItem>
                        <FormItem label="Imágenes evaluadas" name="evaluated" valuePropName="checked">
                            <Switch checkedChildren="Sí" unCheckedChildren="No" defaultChecked={false} />
                        </FormItem>
                    </Form>
                </div>
                <Button
                    style={{ width: '220px', margin: '5px auto', display: 'block' }}
                    onClick={handleClick}
                    type="primary"
                    shape="round"
                    loading={loading}
                >
                    Aplicar filtros
                </Button>
            </div>
        </Drawer>
    )
}

ImageFilter.props = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
}

export default ImageFilter
