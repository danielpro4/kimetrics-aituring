import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles/styles.module.css'
import { Layout } from 'antd'
import { BreadCrumbItem } from '@components/Common'
import ImagesList from './components/ImagesList'

const { Content, Header } = Layout

const Images = () => {
    return (
        <Layout className={styles.App}>
            <Header className={styles.appHeader}>
                <div>
                    <BreadCrumbItem
                        title={'Imágenes'}
                        items={[
                            {
                                id: 1,
                                href: '/',
                                label: 'Imágenes',
                            },
                        ]}
                    />
                </div>
            </Header>
            <Content>
                <ImagesList />
            </Content>
        </Layout>
    )
}

Images.propTypes = {
    name: PropTypes.string,
}

export default Images
