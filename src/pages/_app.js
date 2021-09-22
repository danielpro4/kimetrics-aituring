import Head from 'next/head'
import AppLayout from '@components/Layout/AppLayout'
import dayjs from 'dayjs'

import 'antd/dist/antd.compact.css'
import '@styles/antd.css'
import '@styles/globals.css'

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

require('dayjs/locale/es')

let isSameOrAfter = require('dayjs/plugin/isSameOrAfter')

dayjs.extend(isSameOrAfter)
dayjs.locale('es')

function NextApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Kimetrics | AITuring</title>
                <link rel="icon" href="/favicon.png" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta name="description" content="Kimetrics Integration with AITuring" />
            </Head>
            <main className="App">
                <QueryClientProvider client={queryClient}>
                    <AppLayout>
                        <Component {...pageProps} />
                    </AppLayout>
                </QueryClientProvider>
            </main>
        </>
    )
}

export default NextApp
