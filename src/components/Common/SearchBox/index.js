import React from 'react'
import PropTypes from 'prop-types'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'

const SearchBox = ({ width, ...delegated }) => {
    return (
        <>
            <Input
                className="search-box"
                allowClear={true}
                placeholder={'Buscar...'}
                prefix={<SearchOutlined />}
                style={{ width: width }}
                {...delegated}
            />
            <style jsx global>{`
                .search-box {
                    border-radius: 16px;
                    padding-left: 8px;
                    margin: 16px;
                }
            `}</style>
        </>
    )
}

SearchBox.propTypes = {
    delegated: PropTypes.any,
}

export default SearchBox
