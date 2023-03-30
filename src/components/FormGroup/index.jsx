import React from 'react'
import './style.css';


export const FormGroup = ({id, label ,children,...props}) => {
  return (
    <div className='form-group'>
        <label htmlFor={props.id}>{label ?? children}</label>
        <input
            {...props}
        />
    </div>
  )
}


export default FormGroup;