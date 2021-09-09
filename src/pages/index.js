import { API_URL_AIT, JWT_DEMO } from '@constants/Settings'
import ImagesPage from '@modules/ImagesPage'

export async function getServerSideProps() {
    let data = null
    try {
        const request = await fetch(`${API_URL_AIT}/image`, {
            method: 'GET',
            headers: {
                Authorization: `jwt ${JWT_DEMO}`,
            },
        })

        data = await request.json()
    } catch (error) {
        console.log(error)
    }

    return {
        props: {
            data: data,
        },
    }
}

function Home({ data }) {
    return (
        <div className="ImagePage">
            <ImagesPage data={data} />
        </div>
    )
}

export default Home
