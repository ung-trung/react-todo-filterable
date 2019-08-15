import React from 'react'
import Loader from 'react-loader-spinner'

const WatchLoader = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Loader type="Watch" color="hsl(348, 100%, 61%)" height={33} width={33} />
    </div>
  )
}

export default WatchLoader
