import React from 'react'
import { CircularProgress } from '@material-ui/core'

export const Loader = (props) => {
  return (
    <div style={{height: props.height || '100vh',display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
        <CircularProgress />
    </div>
  )
}
