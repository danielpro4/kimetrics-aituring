import PropTypes from 'prop-types'
import { Drawer } from '@components/Common'
import { Button, Form, Row, Space, Switch } from 'antd'

const { Item: FormItem } = Form

const SwitchFilter = ({ label, name }) => {
    return (
        <FormItem label={label} name={name} valuePropName="checked">
            <Switch checkedChildren="Sí" unCheckedChildren="No" defaultChecked={false} />
        </FormItem>
    )
}

const ButtonFilter = ({ children, ...props }) => {
    return (
        <Button
            style={{ width: '140px', margin: '5px auto', display: 'block' }}
            type="primary"
            shape="round"
            {...props}
        >
            {children}
        </Button>
    )
}

const ImageFilter = ({ onFilter, ...props }) => {
    const [form] = Form.useForm()

    const handleClick = async () => {
        let values = await form.validateFields()

        onFilter(values)
    }

    const handleReset = async () => {
        let values = {
            status: false,
            processed: false,
            valid: false,
        }

        onFilter(values)
    }

    return (
        <Drawer
            title="Filtrar imágenes"
            width={420}
            footer={
                <Row justify="end">
                    <Space>
                        <Button onClick={handleReset} type={'link'}>
                            Reset filtros
                        </Button>
                        <ButtonFilter onClick={handleClick}>Aplicar filtros</ButtonFilter>
                    </Space>
                </Row>
            }
            {...props}
        >
            <div style={{ padding: '10px 24px' }}>
                <Form
                    style={{ marginBottom: 60 }}
                    form={form}
                    layout={'vertical'}
                    initialValues={{
                        status: false,
                        processed: false,
                        valid: false,
                    }}
                >
                    <SwitchFilter label="Bien ejecutada" name="status" />
                    <SwitchFilter label="Imágenes procesadas" name="processed" />
                    <SwitchFilter label="Imágenes evaluadas" name="valid" />
                </Form>
            </div>
        </Drawer>
    )
}

ImageFilter.props = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
}

export default ImageFilter
