import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, Typography } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

const BreadCrumbItem = ({ title, items = [] }) => {
    return (
        <div>
            <Typography.Title level={4} style={{ marginBottom: 0 }}>
                {title}
            </Typography.Title>
            <Breadcrumb>
                <Breadcrumb.Item href="/">
                    <HomeOutlined />
                </Breadcrumb.Item>
                {items.map((item) => {
                    return (
                        <Breadcrumb.Item key={item.id} href={item.href}>
                            <span>{item.label}</span>
                        </Breadcrumb.Item>
                    )
                })}
            </Breadcrumb>
        </div>
    )
}

BreadCrumbItem.propTypes = {
    title: PropTypes.any,
    items: PropTypes.array,
}

export default BreadCrumbItem
