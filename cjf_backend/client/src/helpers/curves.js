import React from 'react'
import './curves.css';

export const Curves = (props) => {
  return (
    <section>
        {props.children}
        <div className="curve"></div>
    </section>
  )
}
