import React from 'react'
import { useState } from 'react'

const InputEdit = ({...props}) => {
    const [data, setData] = useState(props.value)

    function handleSearchChange(event) {
         setData(event.target.value)
         console.log(data)
      }

    
  return (
    <>
    <input {...props} value={data} onChange={handleSearchChange}/>
    </>
  )
}

export default InputEdit