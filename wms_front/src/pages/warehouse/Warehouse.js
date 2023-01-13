import React from 'react'
import '../../css/Warehouse.css'
import SideBar from '../../components/SideBar'
import {useNavigate} from 'react-router-dom'

const Warehouse = () => {
  
  const navigate = useNavigate()

  const goToShelf =()=>{
    navigate('/shelf')
  }
  
  
  return (
    // 창고 가장 큰 div
    <div className='wh_top_div'>
      <SideBar/>

      <div className='wh_second_div'>                     {/* 창고 사이드바를 뺀 가장 큰 div */}
        <div className='wh_management_div'>               {/* 창고관리와 선반관리 버튼인 있는 관리 div */}
          <span>창고관리</span>
          <span onClick={goToShelf}>선반관리</span>
        </div>
        
        <div className='horizonLine'></div>               {/* 가로 선 긋기 */}
        <div className='wh_button_div'>                   {/* 수정,검색,추가 등 각종 버튼이 있는 div */}
          <button>수정</button> <input type="text"></input><button>검색</button> <button>추가</button>
        </div>
        <div className='wh_main_div'>                     {/* 표와 그래프들이 들어있는 가장 메인 기능 div */}
          <div className = 'wh_graph'>                    {/* 표가 들어있는 div */}
          </div>              
          <div className='wh_mini_div'>                   {/* 도형과 선반관련 표가 들어있는 div */}
            <div  className = 'wh_mini_diagram'>          {/* 도형 div */}
            </div>    
            <div className='wh_mini_graph'>               {/* 선반관련 표가 들어있는 div */}
            </div>         
          </div>
        </div>
      </div>
    </div>
  )
}

export default Warehouse