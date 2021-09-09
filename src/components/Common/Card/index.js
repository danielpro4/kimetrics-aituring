import React from 'react'
import PropTypes from 'prop-types'
import { Card as CardBase } from 'antd'
import styles from './card.module.css'

const Card = (props) => {
    return (
        <CardBase bordered={false} className={styles.card}>
            {props.children}
        </CardBase>
    )
}

Card.propTypes = {
    children: PropTypes.node,
}

export default Card
