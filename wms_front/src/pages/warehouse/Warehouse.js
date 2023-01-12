import React from 'react'
import '../../css/Warehouse.css'
import SideBar from '../../components/SideBar'

const Warehouse = () => {
  return (
    <div className='wh_top_div'>
      <SideBar/>
      <div >
        <div className='wh_management_div'>
          창고관리/선반관리
        </div>
        <div className='wh_button_div'>
          <button>수정</button> 검색 추가
        </div>
        <div className='wh_main_div'>
          <div className = 'wh_graph'></div>
          <div className='wh_mini_div'>
            <div  className = 'wh_mini_diagram'></div>
            <div className='wh_mini_graph'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Warehouse