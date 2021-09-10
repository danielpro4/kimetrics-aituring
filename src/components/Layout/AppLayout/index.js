import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import { useRouter } from 'next/router'
import styles from './layout.module.css'
import AppLogoItem from '../AppLogoItem'
import AppMenuItem from '../AppMenuItem'

const { Content, Sider } = Layout

const AppLayout = ({ session, children }) => {
    const router = useRouter()
    const withSidebar = !!router.query['with-sider']
    return (
        <Layout className={styles.appLayout}>
            {withSidebar && (
                <Sider className={styles.appSider} theme="light" width={220} collapsed={true}>
                    <AppLogoItem collapsed={true} />
                    <AppMenuItem current={router.route} session={session} theme="light" />
                </Sider>
            )}

            <Content className="site-layout">
                <div>{children}</div>
            </Content>
        </Layout>
    )
}

AppLayout.propTypes = {
    session: PropTypes.object,
    children: PropTypes.node.isRequired,
}

export default AppLayout
