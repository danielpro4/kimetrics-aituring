import React from 'react'
import PropTypes from 'prop-types'
import { Button, Drawer as DrawerBase, Row, Space } from 'antd'

const Drawer = ({
    children,
    title = '',
    visible = false,
    onClose = () => {},
    onSuccess = () => {},
    width = 500,
    textSuccess = 'Aceptar',
    ...props
}) => {
    return (
        <DrawerBase
            title={title}
            placement="right"
            maskClosable={false}
            destroyOnClose={true}
            closable={true}
            keyboard={false}
            width={width}
            visible={visible}
            onClose={onClose}
            footer={
                <Row justify="end">
                    <Space>
                        <Button onClick={onClose}>Cancelar</Button>
                        <Button onClick={onSuccess} key="submit" htmlType="submit" type="primary">
                            {textSuccess}
                        </Button>
                    </Space>
                </Row>
            }
            {...props}
        >
            {children}
        </DrawerBase>
    )
}

Drawer.propTypes = {
    children: PropTypes.element.isRequired,
    onSuccess: PropTypes.func,
    title: PropTypes.string,
    textSuccess: PropTypes.string,
}

export default Drawer
