// API Components
import PropTypes from 'prop-types'
import { Button, DatePicker, Layout, Modal, notification, Space } from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import { saveAs } from 'file-saver'
import dayjs from 'dayjs'
import moment from 'moment'
import { animated, config, Transition } from 'react-spring'
// Global components
import { s2ab } from '@utils/functions'
import { useAuthContext } from '@context/AuthContext'
import { API_URL, MODAL_OPTIONS } from '@constants/Settings'
import { BreadCrumbItem, IframeWrapper, Loader, SearchBox } from '@components/Common'

// Local components
import ImagesList from './components/ImagesList'
import ImageFilter from './components/ImageFilter'
import PlaceList from './components/PlaceList'
import { useQueryImages } from './hooks/useQueryImages'
import { useIframeURL } from './hooks/useIframeURL'
import { useImageContext } from './context/ImageContext'
import { useFilters } from '@hooks/filters.hook'

import styles from './styles/styles.module.css'

const { RangePicker } = DatePicker
const { Content, Header, Sider } = Layout

const showImageDetail = (fullUrl) => {
    return Modal.info({
        ...MODAL_OPTIONS,
        content: <IframeWrapper url={fullUrl} />,
    })
}

const ImagesPage = () => {
    const filters = useFilters(['task_id', 'place_id', 'status', 'processed', 'valid', 'date_ini', 'date_end'])
    const { accessToken: token } = useAuthContext()
    const uiContext = useImageContext()
    const useIURL = useIframeURL()

    const { error, isLoading, data: images } = useQueryImages('images', filters.current)

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
            ...filters.current,
            ...values,
        }
        filters.apply(_filters)
    }

    const onApplyFilters = (newFilters) => {
        const _filters = {
            ...filters.current,
            ...newFilters,
        }
        filters.apply(_filters)
    }

    const handlePlaceClick = async (placeId) => {
        onApplyFilters({ place_id: placeId })
    }

    const handleDateChange = async (date, [start, end]) => {
        let values = {
            date_ini: dayjs(start).startOf('day').format('YYYY-MM-DD'),
            date_end: dayjs(end).endOf('day').format('YYYY-MM-DD'),
        }

        if (values.date_end && values.date_ini) {
            onApplyFilters(values)
        }
    }

    const handleSearchChange = (event) => {
        const searchVal = String(event.target.value).trim()
        uiContext.setSearchPlace(searchVal)
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
                        <Button shape="round">
                            <RangePicker
                                style={{ marginTop: '-5px' }}
                                showToday
                                bordered={false}
                                allowClear={false}
                                onChange={handleDateChange}
                                defaultValue={[moment(filters.current.date_ini), moment(filters.current.date_end)]}
                            />
                        </Button>
                        <Button
                            type="link"
                            icon={<FilterOutlined />}
                            onClick={() => uiContext.setFilterVisible(true)}
                        />
                    </Space>
                </Header>
                <Layout className={styles.appContent}>
                    <Sider collapsed={false} theme="light" width={220} className={styles.filterSider}>
                        <SearchBox width={180} onChange={handleSearchChange} />
                        <PlaceList search={uiContext.searchPlace} onClick={handlePlaceClick} />
                    </Sider>
                    <Content className={styles.imagesContent}>
                        {isLoading ? (
                            <Loader label="Cargando..." />
                        ) : (
                            <Transition
                                items={!isLoading}
                                from={{ opacity: 0 }}
                                enter={{ opacity: 1 }}
                                leave={{ opacity: 0 }}
                                delay={100}
                                config={config.molasses}
                                onRest={() => {}}
                            >
                                {(styles, item) =>
                                    item && (
                                        <animated.div style={styles}>
                                            <ImagesList
                                                data={images?.results}
                                                loading={false}
                                                filters={uiContext.filters}
                                                actions={{
                                                    onShowDetail: handleShowDetail,
                                                    setPagination: () => {},
                                                }}
                                            />
                                        </animated.div>
                                    )
                                }
                            </Transition>
                        )}
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
