import React from 'react'
import PropTypes from 'prop-types'
import { Loader, Card, NoDataView } from '@components/Common'
import isEqual from 'lodash/isEqual'
import { Table } from 'antd'
import Image from 'next/image'
import dayjs from 'dayjs'

const getColumns = ({ onShowDetail }) => {
    return [
        {
            title: 'Imagen',
            dataIndex: 'url',
            width: 80,
            render: (_, record) => {
                return (
                    <Image
                        onClick={() => onShowDetail(record)}
                        alt={_}
                        src={record.url}
                        width={100}
                        height={100}
                        objectFit="contain"
                    />
                )
            },
        },
        {
            title: 'Cliente',
            dataIndex: 'place_name',
            render: (_, record) => {
                return record.place_name
            },
        },
        {
            title: 'Fecha',
            dataIndex: 'date',
            width: 80,
            render: (_, record) => {
                return dayjs(record.date).format('MMM DD, YYYY')
            },
        },
        {
            title: 'Tarea',
            dataIndex: 'task_name',
            render: (_, record) => {
                return record.task_name
            },
        },
        {
            title: 'Usuario',
            dataIndex: 'user_name',
            render: (_, record) => {
                return record.user_name
            },
        },
        {
            title: 'Procesado',
            dataIndex: 'valid',
            width: 80,
            render: (_, record) => {
                return record.processed === true ? 'Sí' : 'No'
            },
        },
        {
            title: 'Correcto',
            dataIndex: 'valid',
            width: 80,
            render: (_, record) => {
                return record.valid === true ? 'Sí' : 'No'
            },
        },
    ]
}

function ImagesList({ loading = false, data = [], pagination, events }) {
    // handlers
    const handleTableChange = (_pagination, _filters) => {
        const pager = { ..._pagination }
        const filtersChanged = !isEqual(_filters, filters)

        if (!filtersChanged) {
            pager.current = _pagination.current
        }

        events?.setPagination({
            ...pager,
        })
    }

    if (loading) {
        return <Loader />
    }

    return (
        <Card>
            <Table
                size="small"
                onChange={handleTableChange}
                scroll={{ y: `calc(100vh - 300px)` }}
                loading={loading}
                rowKey={(record) => `record_id:${record.id}`}
                columns={getColumns({
                    onShowDetail: events?.onShowDetail,
                })}
                dataSource={data}
                pagination={{
                    ...pagination,
                    showTotal: (total, [start, end]) => `Total: ${total} ${start}-${end}`,
                    total: data.length,
                    showTitle: true,
                }}
                locale={{
                    emptyText: !loading && <NoDataView title="No hay elementos que mostrar" />,
                }}
            />
        </Card>
    )
}

ImagesList.propTypes = {
    data: PropTypes.array,
}

export default ImagesList
