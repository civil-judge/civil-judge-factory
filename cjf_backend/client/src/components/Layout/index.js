import React from 'react'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header'
import { Homepage } from '../Home/Homepage'

export const Layout = (props) => {
  return (
    <div>
    <Homepage history={props.history}/>
    </div>
  )
}
