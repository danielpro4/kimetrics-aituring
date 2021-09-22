// API Components
import PropTypes from 'prop-types'
import { Button, Layout, Modal, notification, Space, DatePicker } from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import { saveAs } from 'file-saver'
import dayjs from 'dayjs'
import moment from 'moment'

// Global components
import { s2ab } from '@utils/functions'
import { useAuthContext } from '@context/AuthContext'
import { API_URL, MODAL_OPTIONS } from '@constants/Settings'
import { BreadCrumbItem, IframeWrapper, Loader, ProductSearch } from '@components/Common'

// Local components
import ImagesList from './components/ImagesList'
import ImageFilter from './components/ImageFilter'
import { useQueryImages } from './hooks/useQueryImages'
import { useIframeURL } from './hooks/useIframeURL'
import { useImageContext } from './context/ImageContext'
import styles from './styles/styles.module.css'

const { Content, Header } = Layout

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
    const { error, isLoading, data, onRefetch } = useQueryImages('images', uiContext.filters)

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
        fetch(`${API_URL}/exporters?jwt=${token}`, {
            method: 'POST',
        })
            .then((response) => response.json())
            .then(({ wbbuf, file }) => {
                saveAs(new Blob([s2ab(wbbuf)], { type: 'application/octet-stream' }), file)
            })
            .catch((error) => {
                console.log('Fetch:', error)
            })
    }

    const handleFilter = async (values) => {
        uiContext.setFilterVisible(false)

        const _filters = {
            ...uiContext.filters,
            ...values,
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

    if (isLoading) {
        return <Loader>Cargando...</Loader>
    }

    if (error) {
        return <div>Se ha producido un error: {error.message}</div>
    }

    return (
        <Layout className={styles.App}>
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
                    <ProductSearch />
                    <DatePicker.RangePicker
                        showToday
                        onChange={handleDateChange}
                        defaultValue={[moment(uiContext.filters.date_ini), moment(uiContext.filters.date_end)]}
                    />
                    <Button type="link" icon={<FilterOutlined />} onClick={() => uiContext.setFilterVisible(true)} />
                </Space>
            </Header>
            <Content>
                <ImagesList
                    data={data?.results}
                    loading={false}
                    events={{
                        onShowDetail: handleShowDetail,
                    }}
                />
                <ImageFilter
                    onFilter={handleFilter}
                    visible={uiContext.filterVisible}
                    onClose={() => uiContext.setFilterVisible(false)}
                />
            </Content>
        </Layout>
    )
}

ImagesPage.propTypes = {
    name: PropTypes.string,
}

export default ImagesPage
