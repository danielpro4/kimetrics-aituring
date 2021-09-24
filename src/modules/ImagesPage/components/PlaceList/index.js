import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Tooltip } from 'antd'
import { FolderOutlined } from '@ant-design/icons'
import { useQueryPlaces } from '../../hooks/useQueryPlaces'
import styles from './styles.module.css'

const PlaceList = ({ search, onClick }) => {
    const { data: places } = useQueryPlaces('places')

    const handleClick = (event) => onClick(event.key)

    return (
        <div className={styles.placeList}>
            <Menu mode="inline" theme="light" onClick={handleClick} inlineIndent={6}>
                {places?.results
                    .filter((place) => place.codigo_cliente && place.name.toLowerCase().includes(search.toLowerCase()))
                    .map((place) => {
                        return (
                            <Menu.Item icon={<FolderOutlined />} key={place.id}>
                                <Tooltip title={place.codigo_cliente} placement="top">
                                    {place.name}
                                </Tooltip>
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
