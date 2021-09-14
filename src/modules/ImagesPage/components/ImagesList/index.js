import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import Image from 'next/image'
import { Table } from 'antd'
import { FcCheckmark } from 'react-icons/fc'
import { MdClose as GiCrossed } from 'react-icons/md'
import { Card, Loader, NoDataView } from '@components/Common'
import { dateInHumanFormat } from '@utils/functions'
import styles from './styles.module.css'

const getColumns = ({ onShowDetail }) => {
    return [
        {
            title: 'Imagen',
            dataIndex: 'url',
            align: 'center',
            width: 80,
            render: (_, record) => (
                <Image
                    onClick={() => onShowDetail(record)}
                    alt={record.task}
                    src={record.url}
                    width={100}
                    height={100}
                    objectFit="contain"
                    className={styles.image}
                />
            ),
        },
        {
            title: 'Fecha',
            dataIndex: 'date',
            width: 100,
            responsive: ['sm'],
            render: (_, record) => dateInHumanFormat(record.date, 'MMM DD, YYYY'),
        },
        {
            title: 'Cliente',
            dataIndex: 'place_name',
            responsive: ['md'],
            render: (_, record) => record.place_name,
        },
        {
            title: 'Tarea',
            dataIndex: 'task_name',
            responsive: ['md'],
            render: (_, record) => record.task_name,
        },
        {
            title: 'Usuario',
            dataIndex: 'user_name',
            responsive: ['md'],
            width: 200,
            render: (_, record) => record.user_name,
        },
        {
            title: 'Procesado',
            dataIndex: 'valid',
            width: 80,
            align: 'center',
            render: (_, record) => {
                return record.processed === true ? (
                    <FcCheckmark style={{ fontSize: 19 }} />
                ) : (
                    <GiCrossed className={styles.unprocessed} />
                )
            },
        },
        {
            title: 'Correcto',
            dataIndex: 'valid',
            align: 'center',
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
                scroll={{ y: `calc(100vh - 220px)` }}
                loading={loading}
                rowKey={(record) => `record_id:${record.id}`}
                columns={getColumns({
                    onShowDetail: events?.onShowDetail,
                })}
                dataSource={data}
                pagination={{
                    ...pagination,
                    showTotal: (total, [start, end]) => `${start}-${end} de ${total} registros`,
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
