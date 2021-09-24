import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Tooltip } from 'antd'
import { FolderOutlined } from '@ant-design/icons'
import { useQueryPlaces } from '../../hooks/useQueryPlaces'
import styles from './styles.module.css'

const PlaceList = ({ onClick }) => {
    const { data } = useQueryPlaces('places')

    const handleClick = (event) => onClick(event.key)

    return (
        <div className={styles.placeList}>
            <Menu mode="inline" theme="light" onClick={handleClick} inlineIndent={0}>
                {data?.results
                    .filter((item) => item.codigo_cliente)
                    .map((item) => {
                        return (
                            <Menu.Item icon={<FolderOutlined />} key={item.id}>
                                <Tooltip title={item.codigo_cliente}>{item.name}</Tooltip>
                            </Menu.Item>
                        )
                    })}
            </Menu>
            <style jsx global>{`
                .ant-menu {
                    border-right-color: transparent;
                }
            `}</style>
        </div>
    )
}

PlaceList.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default PlaceList
