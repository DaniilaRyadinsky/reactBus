import React from 'react'
import { useState } from 'react'

const InputEdit = ({...props}) => {
    const [data, setData] = useState(props.value)

    function handleSearchChange(event) {
         setData(event.target.value)
         console.log(data)
      }

    //   console.log(props.data1)
    //   console.log(data2)
// type='text' className={styles.input}
    
  return (
    <>
    <input {...props} value={data} onChange={handleSearchChange}/>
    </>
  )
}

export default InputEdit