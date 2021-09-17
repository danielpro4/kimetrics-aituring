import ImagesPage from '@modules/ImagesPage'
import { AuthProvider } from '@context/AuthContext'
import { ImageProvider } from '@modules/ImagesPage/context/ImageContext'

export async function getServerSideProps(props) {
    return {
        props: {
            session: {
                accessToken: props.query.jwt ? props.query.jwt : '',
            },
        },
    }
}

function Home({ session }) {
    if (!session.accessToken) {
        return 'Invalid access token'
    }

    return (
        <div id="ImagePage">
            <AuthProvider session={session}>
                <ImageProvider>
                    <ImagesPage />
                </ImageProvider>
            </AuthProvider>
        </div>
    )
}

export default Home
