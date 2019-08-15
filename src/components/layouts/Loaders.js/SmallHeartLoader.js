import React from 'react'
import Loader from 'react-loader-spinner'

const SmallHeartLoader = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Loader
        type="Hearts"
        color="hsl(348, 100%, 61%)"
        height={20}
        width={240}
      />
    </div>
  )
}

export default SmallHeartLoader
