import ImagesPage from '@modules/ImagesPage'
import { AuthProvider } from '../context/AuthContext'

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
                <ImagesPage />
            </AuthProvider>
        </div>
    )
}

export default Home
