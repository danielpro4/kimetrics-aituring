import React from 'react'
import PropTypes from 'prop-types'
import { APP_VERSION } from '@constants/Settings'
import styles from './styles.module.css'
import { Space } from 'antd'
import Image from 'next/image'

const URL_LOGO = '/kimetrics.png'

const AppLogoItem = ({ collapsed }) => {
    return (
        <Space className={styles.appLogo}>
            <div className="app-logo--name">
                <Image src={URL_LOGO} alt="kimetrics" height={38} objectFit="contain" width={90} />
            </div>
            {!collapsed && <div className={styles.appVersion}>v{APP_VERSION}</div>}
        </Space>
    )
}

AppLogoItem.propTypes = {
    collapsed: PropTypes.bool,
    onCollapse: PropTypes.func,
}

export default AppLogoItem
