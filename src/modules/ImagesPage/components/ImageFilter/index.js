import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Drawer } from '@components/Common'
import { Button, Form, Switch } from 'antd'

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
            style={{ width: '200px', margin: '5px auto', display: 'block' }}
            type="primary"
            shape="round"
            {...props}
        >
            {children}
        </Button>
    )
}

const ImageFilter = ({ onFilter, ...props }) => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    useEffect(() => {
        setLoading(false)
    }, [])

    const handleClick = async () => {
        let values = await form.validateFields()

        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            onFilter(values)
        }, 1000)
    }

    return (
        <Drawer title="Filtrar imágenes" width={420} footer={null} {...props}>
            <div style={{ padding: '10px 24px' }}>
                <Form
                    style={{ marginBottom: 60 }}
                    form={form}
                    layout={'vertical'}
                    initialValues={{
                        status: true,
                        processed: false,
                        valid: false,
                    }}
                >
                    <SwitchFilter label="Bien ejecutada" name="status" />
                    <SwitchFilter label="Imágenes procesadas" name="processed" />
                    <SwitchFilter label="Imágenes evaluadas" name="valid" />
                </Form>
                <ButtonFilter loading={loading} onClick={handleClick}>
                    Aplicar filtros
                </ButtonFilter>
            </div>
        </Drawer>
    )
}

ImageFilter.props = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
}

export default ImageFilter
