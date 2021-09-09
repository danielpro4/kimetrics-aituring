import React from 'react'
import PropTypes from 'prop-types'

const IframeWrapper = ({ url }) => {
    return <iframe height={'100%'} width={'100%'} src={`${url}`} frameBorder="0" />
}

IframeWrapper.propTypes = {
    name: PropTypes.string,
}

export default IframeWrapper
