import React from 'react'
import SimpleFrame from './SimpleFrame'

const Xcode = () => {
  return (
    <SimpleFrame
        title="Xcode"
        id="xcode"
        icon="xcode"
        height="300"
        width="400"
        minWidth="400"
        minHeight="300"
        isResizable={true}
        hasPadding={false}
        hasDrawer={false}
        showDimensions={false}
    >
        Xcode

    </SimpleFrame>
  )
}

export default Xcode