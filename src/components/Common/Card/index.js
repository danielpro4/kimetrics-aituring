import React from 'react'
import PropTypes from 'prop-types'
import { Card as CardBase } from 'antd'
import styles from './card.module.css'

const Card = ({ children, ...delegated }) => {
    return (
        <CardBase bordered={false} className={styles.card} {...delegated}>
            {children}
        </CardBase>
    )
}

Card.propTypes = {
    children: PropTypes.node,
}

export default Card
