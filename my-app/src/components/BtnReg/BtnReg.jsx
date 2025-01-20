import React from 'react'
import classes from "./BtnReg.module.css"

const BtnReg = ({ children, ...props }) => {
    return (
        <>
            <button {...props} className={classes.btn_reg} >{children}</button>
        </>
    )
}

export default BtnReg