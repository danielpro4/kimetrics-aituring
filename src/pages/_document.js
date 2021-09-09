import Document, { Head, Html, Main, NextScript } from 'next/document'

class WebDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="description" content="Kimetrics Integration with AITuring" />
                    <link rel="icon" href="/favicon.png" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Mada:wght@300;400;500;600&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default WebDocument
