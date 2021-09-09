import React from 'react'
import PropTypes from 'prop-types'
import { Empty } from 'antd'
import styles from './styles.module.css'

const NoDataView = ({ title = '' }) => {
    return (
        <Empty
            className={styles.noData}
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
                height: 60,
            }}
            description={title}
        />
    )
}

NoDataView.propTypes = {
    title: PropTypes.string,
}

export default NoDataView
