// API Components
import PropTypes from 'prop-types'
import { Button, DatePicker, Layout, Modal, notification, Space } from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import { saveAs } from 'file-saver'
import dayjs from 'dayjs'
import moment from 'moment'

// Global components
import { s2ab } from '@utils/functions'
import { useAuthContext } from '@context/AuthContext'
import { API_URL, MODAL_OPTIONS } from '@constants/Settings'
import { BreadCrumbItem, IframeWrapper, Loader, SearchBox } from '@components/Common'

// Local components
import ImagesList from './components/ImagesList'
import ImageFilter from './components/ImageFilter'
import { useQueryImages } from './hooks/useQueryImages'
import { useIframeURL } from './hooks/useIframeURL'
import { useImageContext } from './context/ImageContext'
import PlaceList from './components/PlaceList'
import styles from './styles/styles.module.css'

const { Content, Header, Sider } = Layout

const showImageDetail = (fullUrl) => {
    return Modal.info({
        ...MODAL_OPTIONS,
        content: <IframeWrapper url={fullUrl} />,
    })
}

const ImagesPage = () => {
    const { accessToken: token } = useAuthContext()
    const uiContext = useImageContext()
    const useIURL = useIframeURL()

    const { error, isLoading, data: images, onRefetch } = useQueryImages('images', uiContext.filters)

    const handleShowDetail = async ({ host, task_id }) => {
        try {
            const fullURL = await useIURL.get(host, task_id)
            showImageDetail(fullURL)
        } catch (error) {
            notification.error({
                description: error?.message,
            })
        }
    }

    const handleExport = () => {
        fetch(`${API_URL}/exporters?jwt=${token}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                }
                throw new Error('No se pudo procesar la solicitud.' + response.status)
            })
            .then(({ fileName, data: wbbuf }) => {
                if (wbbuf) {
                    saveAs(new Blob([s2ab(wbbuf)], { type: 'application/octet-stream' }), fileName)
                }
            })
            .catch((error) => {
                console.log('Fetch:', error)
            })
    }

    const handleImageFilter = async (values) => {
        const _filters = {
            ...uiContext.filters,
            ...values,
        }

        uiContext.setFilterVisible(false)
        uiContext.setFilters(_filters)
        await onRefetch(_filters)
    }

    const handlePlaceClick = async (placeId) => {
        const _filters = {
            ...uiContext.filters,
            place_id: placeId,
        }

        uiContext.setFilters(_filters)
        await onRefetch(_filters)
    }

    const handleDateChange = async (date, [start, end]) => {
        if (!start || !end) {
            return false
        }

        if (!dayjs(end).isSameOrAfter(dayjs(start), 'day')) {
            console.log('La fecha de inicio debe ser mayor', date)
            return false
        }

        let values = {
            date_ini: dayjs(start).startOf('day').format('YYYY-MM-DD'),
            date_end: dayjs(end).endOf('day').format('YYYY-MM-DD'),
        }

        const _filters = {
            ...uiContext.filters,
            ...values,
        }

        uiContext.setFilters(_filters)
        await onRefetch(_filters)
    }

    const handleSearchChange = (event) => {
        const searchVal = String(event.target.value).trim()
        uiContext.setSearchPlace(searchVal)
    }

    if (isLoading) {
        return <Loader>Cargando...</Loader>
    }

    if (error) {
        return <div>Se ha producido un error: {error.message}</div>
    }

    return (
        <Layout className={styles.App}>
            <Content>
                <Header className={styles.appHeader}>
                    <div className="main">
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
                    </div>
                    <Space className="sider">
                        <Button type="secondary" shape="round" onClick={handleExport}>
                            Exportar
                        </Button>
                        <DatePicker.RangePicker
                            showToday
                            onChange={handleDateChange}
                            defaultValue={[moment(uiContext.filters.date_ini), moment(uiContext.filters.date_end)]}
                        />
                        <Button
                            type="link"
                            icon={<FilterOutlined />}
                            onClick={() => uiContext.setFilterVisible(true)}
                        />
                    </Space>
                </Header>
                <Layout>
                    <Sider collapsed={false} theme="light" width={220} className={styles.siderFilters}>
                        <SearchBox width={180} onChange={handleSearchChange} />
                        <PlaceList search={uiContext.searchPlace} onClick={handlePlaceClick} />
                    </Sider>
                    <Content className={styles.listContent}>
                        <ImagesList
                            data={images?.results}
                            loading={false}
                            filters={uiContext.filters}
                            actions={{
                                onShowDetail: handleShowDetail,
                                setPagination: () => {},
                            }}
                        />
                        <ImageFilter
                            onFilter={handleImageFilter}
                            visible={uiContext.filterVisible}
                            onClose={() => uiContext.setFilterVisible(false)}
                        />
                    </Content>
                </Layout>
            </Content>
        </Layout>
    )
}

ImagesPage.propTypes = {
    name: PropTypes.string,
}

export default ImagesPage
