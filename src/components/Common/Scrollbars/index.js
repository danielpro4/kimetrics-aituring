import React from 'react'
import { Scrollbars as ScrollbarsBase } from 'react-custom-scrollbars'

const Scrollbars = (props) => (
    <ScrollbarsBase
        style={{ minHeight: '100vh' }}
        autoHide
        renderTrackHorizontal={(props) => <div {...props} style={{ display: 'none' }} className="track-horizontal" />}
        {...props}
    />
)

export default Scrollbars
