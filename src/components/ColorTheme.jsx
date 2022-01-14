import React from "react"
import { useSelector } from "react-redux"

export default function ColorTheme({ children }) {
  const light = useSelector(state => state.global.light);
  
  return (
    <div className={light ? '' : 'bg-dark text-white'}>
      {children}
    </div>
  )
}