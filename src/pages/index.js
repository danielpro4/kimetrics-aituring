import ImagesPage from '@modules/ImagesPage'

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
        <div className="ImagePage">
            <ImagesPage session={session} />
        </div>
    )
}

export default Home
