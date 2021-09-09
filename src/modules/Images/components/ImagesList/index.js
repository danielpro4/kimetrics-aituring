import React from 'react'
import PropTypes from 'prop-types'
import { Loader, Card, NoDataView } from '@components/Common'
import isEqual from 'lodash/isEqual'
import { Table } from 'antd'

const getColumns = ({ onShowDetail }) => {
    return [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 160,
            render: (_, record) => {
                return record ? record.id : ''
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
        <>
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
                        showTotal: (total, [start, end]) => total,
                        total: data.length,
                        showTitle: true,
                    }}
                    locale={{
                        emptyText: !loading && <NoDataView title="No hay elementos que mostrar" />,
                    }}
                />
            </Card>
        </>
    )
}

ImagesList.propTypes = {
    data: PropTypes.array,
}

export default ImagesList
