import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Menu, Tooltip } from 'antd'
import { useQueryPlaces } from '../../hooks/useQueryPlaces'
import styles from './styles.module.css'
import { MdStore } from 'react-icons/md'
import { Loader } from '@components/Common'

const PlaceList = ({ search, onClick }) => {
    const [selectedKeys, setSelectedKeys] = useState(['all'])
    const { data: places } = useQueryPlaces('places')

    const [showChild, setShowChild] = useState(false)

    // Wait until after client-side hydration to show
    useEffect(() => {
        setShowChild(true)
    }, [])

    if (!showChild) {
        // You can show some kind of placeholder UI here
        return <Loader>Cargando...</Loader>
    }

    const handleClick = (event) => {
        setSelectedKeys([event.key])

        if (onClick) {
            onClick(event.key === 'all' ? null : event.key)
        }
    }

    return (
        <div className={styles.placeList}>
            <Menu mode="inline" theme="light" onClick={handleClick} inlineIndent={6} selectedKeys={selectedKeys}>
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
