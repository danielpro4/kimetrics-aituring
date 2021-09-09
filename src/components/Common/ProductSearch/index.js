import React from 'react'
import PropTypes from 'prop-types'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'

const ProductSearch = ({ ...delegated }) => {
    return (
        <>
            <Input
                className="search-box"
                allowClear={true}
                placeholder={'Buscar...'}
                prefix={<SearchOutlined />}
                {...delegated}
            />
            <style jsx global>{`
                .search-box {
                    border-radius: 16px;
                    padding-left: 8px;
                    width: 240px;
                }
            `}</style>
        </>
    )
}

ProductSearch.propTypes = {
    delegated: PropTypes.any,
}

export default ProductSearch
