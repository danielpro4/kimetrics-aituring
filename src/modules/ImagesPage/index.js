import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Modal, notification } from 'antd'
import { useQuery } from 'react-query'
import { MODAL_OPTIONS } from '@constants/Settings'
import ImagesList from './components/ImagesList'
import { BreadCrumbItem, IframeWrapper, Loader, ProductSearch } from '@components/Common'
import { useAuthContext } from '@context/AuthContext'
import useHttp from '@hooks/useHttp'
import styles from './styles/styles.module.css'

const { Content, Header } = Layout

const showImageDetail = (fullUrl) => {
    return Modal.info({
        ...MODAL_OPTIONS,
        content: <IframeWrapper url={fullUrl} />,
    })
}

const ImagesPage = () => {
    const { accessToken } = useAuthContext()
    const http = useHttp()

    const { isLoading, error, data } = useQuery('fetchImages', () => http.get('/image'), {
        retry: 0,
    })

    const handleShowDetail = async ({ host, task_id }) => {
        try {
            const task = await http.get(`/task/${task_id}/`)
            const fullUrl = `${host}?jwt=${accessToken}&canal=${task?.canalID}`

            showImageDetail(fullUrl)
        } catch (error) {
            notification.error({
                description: error?.message,
            })
        }
    }

    if (isLoading) {
        return <Loader>Cargando...</Loader>
    }

    if (error) {
        return <div>Se ha producido un error: {error.message}</div>
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
