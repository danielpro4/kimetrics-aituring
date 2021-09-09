import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import styles from './loader.module.css'

const Loader = ({ size = 80, children }) => (
    <div className={styles.wrapper}>
        <div className={styles.inner}>
            <Image src="/loader.svg" alt="loading" title="Cargando" width={size} height={size} />
            <div className={styles.label}>{children}</div>
        </div>
    </div>
)

Loader.propTypes = {
    children: PropTypes.node,
}

export default Loader
