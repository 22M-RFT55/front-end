//message, color state 변수 설정 후 상태변경하기
//-------------------------------------------
import React, { useState } from 'react'
import '../Style02.css'

const SayPage = () => {
    const initMessage = 'Please press the button!'
    const [msg, setMsg] = useState(initMessage);
    const [color, setColor] = useState('black');

    return (
        <div className='box'>
            <h1 style={{color:color}}>{msg}</h1>
            <div>
                <button onClick={()=> setMsg("hello!")}>입장</button>
                <button onClick={()=> setMsg("good bye!")}>퇴장</button>
            </div>
            <div>
                <button onClick={()=> setColor('red')}>빨강색</button>
                <button onClick={()=> setColor('green')}>초록색</button>
                <button onClick={()=> setColor('blue')}>파랑색</button>
            </div>
        </div>
    )
}
export default SayPage