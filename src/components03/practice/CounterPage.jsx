//마우스 왼쪽 버튼을 클릭(onClick)하면 1증가, 
//마우스 오른쪽 버튼을 클릭(onContextMenu)하면 1감소
//-------------------------------------------------
import React, { useState } from 'react'
import '../Style03.css'

const CounterPage = () => {
    const [number, setNumber] = useState(0);
    const onChange = (e) => {
        setNumber(parseInt(e.target.value));
    }

    const onClickLeft = (e) => {
        setNumber(number + 1);
    }

    const onClickRight = (e) => {
        e.preventDefault();
        setNumber(number - 1)
    }

    const keyDown = (e) => {
        if(e.key === 'Enter') alert(`현재값 : ${number}`);
    }

    return (
        <div className='box'>
            <input value={number}
                onChange={onChange}
                onKeyDown={keyDown}
                style={{width:'100px'}} type='number'/>
            <button onClick={onClickLeft}
                onContextMenu={onClickRight}>증감</button>
        </div>
    )
}
export default CounterPage