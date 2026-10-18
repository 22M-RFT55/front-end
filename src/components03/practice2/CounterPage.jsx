//마우스 왼쪽 버튼을 클릭(onClick)하면 1증가, 
//마우스 오른쪽 버튼을 클릭(onContextMenu)하면 1감소
//-------------------------------------------------
import React, { useState } from 'react'
import '../Style03.css'

const CounterPage = () => {
    const [number, setNumber] = useState(0);

    const onClickLeft = () => {
        setNumber(number+1);
    }

    const onClickRight = (e) => {
        e.preventDefault();
        setNumber(number-1);
    }

    const onKeyDown = (e) => {
        if(e.key === 'Enter') {
            alert(`현재 값은 ${number}입니다`);
        }
    }

    return (
        <div className='box'>
            <input style={{width:'100px'}} type='number' value={number}
                onKeyDown={onKeyDown} onChange={(e)=> setNumber(parseInt(e.target.value))}/> {/* onChange에 있는거 해야 input에 들어가있는 숫자 바꿀 수 있음 */}
                                                                                             {/* parseInt 해야 숫자 입력했을 때 이상하게 안바뀜 */}
            <button onClick={onClickLeft} onContextMenu={onClickRight}>증감</button>
        </div>
    )
}
export default CounterPage