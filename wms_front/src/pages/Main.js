import React from 'react'
import {Link} from 'react-router-dom'

const Main = () => {
  return (
    <div>
      Main
      <p></p>
      <Link to='/login'>로그인으로 이동</Link>
      <p></p>
      <Link to='/warehouse'>창고로 이동</Link>
      <p></p>
      <Link to='/input'>입고로 이동</Link>
      <p></p>
      <Link to='/stock'>재고현황으로 이동</Link>
      <p></p>
      <Link to='/output'>출고로 이동</Link>
    </div>
  )
}

export default Main