import React from 'react';
import './style.css';

const Container = React.forwardRef(({children, style, className}, ref)=>{
  return (
    <div ref={ref} className={className} style={{...style}}>
        {children}
    </div>
  )
})


export default Container;