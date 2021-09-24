import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Tooltip } from 'antd'
import { useQueryPlaces } from '../../hooks/useQueryPlaces'
import styles from './styles.module.css'
import { MdStore } from 'react-icons/md'

const PlaceList = ({ search, onClick }) => {
    const { data: places } = useQueryPlaces('places')

    const handleClick = (event) => {
        onClick(event.key === 'all' ? null : event.key)
    }

    return (
        <div className={styles.placeList}>
            <Menu mode="inline" theme="light" onClick={handleClick} inlineIndent={6} selectedKeys={['all']}>
                <Menu.Item icon={<MdStore size={18} />} key="all">
                    <Tooltip title="All places" placement="top">
                        TODOS
                    </Tooltip>
                </Menu.Item>
                {places?.results
                    .filter((place) => place.codigo_cliente && place.name.toLowerCase().includes(search.toLowerCase()))
                    .map((place) => {
                        return (
                            <Menu.Item icon={<MdStore size={18} />} key={place.id}>
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
