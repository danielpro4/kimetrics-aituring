import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles/styles.module.css'
import { Layout, Modal } from 'antd'
import { BreadCrumbItem } from '@components/Common'
import ImagesList from './components/ImagesList'
// import { useQuery } from 'react-query'
import { API_URL_AIT, JWT_DEMO } from '@constants/Settings'
import IframeWrapper from '@components/Common/IframeWrapper'
import ProductSearch from '@components/Common/ProductSearch'

const { Content, Header } = Layout

const fetchImages = () => {
    return fetch(`${API_URL_AIT}/image`, {
        method: 'GET',
        headers: {
            Authorization: `jwt ${JWT_DEMO}`,
        },
    }).then((res) => res.json())
}

const ImagesPage = ({ data }) => {
    /*const { isLoading, error, data } = useQuery('getImages', fetchImages, {
        retry: 1,
    })
    if (isLoading) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message
    console.log('error::', error)*/

    const handleShowDetail = ({ host, url }) => {
        Modal.info({
            title: null,
            icon: null,
            content: <IframeWrapper url={host} />,
            centered: true,
            width: '90vw',
        })
    }

    return (
        <Layout className={styles.App}>
            <Header className={styles.appHeader}>
                <BreadCrumbItem
                    title={'Imágenes'}
                    items={[
                        {
                            id: 1,
                            href: '/',
                            label: 'dashboard',
                        },
                    ]}
                />
                <ProductSearch />
            </Header>
            <Content>
                <ImagesList
                    data={data?.results}
                    loading={false}
                    events={{
                        onShowDetail: handleShowDetail,
                    }}
                />
            </Content>
        </Layout>
    )
}

ImagesPage.propTypes = {
    name: PropTypes.string,
}

export default ImagesPage
