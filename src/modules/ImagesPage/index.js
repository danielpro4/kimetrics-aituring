import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Modal } from 'antd'
import { useQuery } from 'react-query'
import axios from 'axios'
import { API_URL_AIT, MODAL_OPTIONS } from '@constants/Settings'
import ImagesList from './components/ImagesList'
import { BreadCrumbItem, IframeWrapper, Loader, ProductSearch } from '@components/Common'
import styles from './styles/styles.module.css'

const { Content, Header } = Layout

const fetchImages = (accessToken) => {
    let reqOptions = {
        url: `${API_URL_AIT}/image/`,
        method: 'GET',
        headers: {
            Authorization: `jwt ${accessToken}`,
        },
    }

    return axios.request(reqOptions).then((response) => response.data)
}

const ImagesPage = ({ session }) => {
    const { accessToken } = session
    const { isLoading, error, data } = useQuery('fetchImages', () => fetchImages(accessToken), {
        retry: 0,
    })

    if (isLoading) return <Loader>Loading...</Loader>

    if (error) return 'An error has occurred: ' + error.message

    console.log('images::', data?.count)

    const handleShowDetail = ({ host }) => {
        const fullUrl = `${host}?jwt=${accessToken}&canal=8`
        Modal.info({
            ...MODAL_OPTIONS,
            content: <IframeWrapper url={fullUrl} />,
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
                            label: '',
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
