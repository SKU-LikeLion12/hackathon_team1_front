import React from 'react'
import { RiArrowLeftWideFill } from "react-icons/ri";


export default function Mypage() {
  return (

    <>
          <div className='flex justify-center'>


<div className='flex justify-center'>
    <RiArrowLeftWideFill />
    <div>마이페이지</div>
</div>


--
<div className='flex justify-center ml-4 mb-3'>
    <div className='mr-3'>
        이름
        --
    </div>
    <input className='place-content-center'/>
</div>

<div className='flex justify ml-4 mb-3'>
    <div className='mr-3'>
        금연 시작 일시 
        --
        {/* 여기에 달력 */}
    </div>
    <input/>
</div>

--
<div>
<div className='flex justify ml-4 mb-3 '>
    <div className='mr-3'>
        흡연 시작 일시
        {/* 여기에 달력 */}
    </div>
    <input/>
</div>
--
<div className='flex justify ml-4 mb-3'>
    <div className='mr-3'>
        하루 흡연량(개비)
    </div>
    <input/>
</div>

--   
<div className='flex justify ml-4 mb-3'>
    <div className='mr-3'>
        담배 가격
    </div>
    <input/>
</div>
--
<div className='flex justify ml-4 mb-3'>
    <div className='mr-3'>
        담배 한 갑당 개비 수 
    </div>
    <input/>
</div>
--
<div className='flex justify ml-4 mb-3'>
    <div className='mr-3'>
        전화번호
    </div>
    <input/>
</div>


</div>

</div>
    </>
  )
}