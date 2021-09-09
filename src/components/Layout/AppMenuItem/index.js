import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'antd'
import Link from 'next/link'
import { DashboardOutlined } from '@ant-design/icons'
import { Loader } from '@components/Common'
import styles from './layout.module.css'

const AppMenuItem = ({ session, current, ...delegated }) => {
    const [showChild, setShowChild] = useState(false)

    // Wait until after client-side hydration to show
    useEffect(() => {
        setShowChild(true)
    }, [])

    if (!showChild) {
        // You can show some kind of placeholder UI here
        return <Loader>Cargando...</Loader>
    }

    if (current == !'/') {
        current = current.replace('/', '')
    } else {
        current = 'root'
    }

    return (
        <Menu
            collapsedWidth={60}
            className={styles.appMenu}
            defaultSelectedKeys={[current]}
            mode="inline"
            {...delegated}
        >
            <Menu.Item key="root" icon={<DashboardOutlined />}>
                <Link href={`/`} prefetch={false} passHref>
                    <a>Images</a>
                </Link>
            </Menu.Item>
        </Menu>
    )
}

AppMenuItem.propTypes = {
    name: PropTypes.string,
}

export default AppMenuItem
