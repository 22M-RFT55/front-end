//상품목록을 출력하고 form의 입력상자 내용이 변경 될때마다 form state 값 변경 
//onSubmit 핸들러에 상품등록 함수, onReset 핸들러에 입력상자 초기화 함수등록
//상품 등록시 useRef를 이용해 id 증가시키고 이름 입력상자에 포커스 지정
//상품목록 특정행에서 마우스 오른쪽 버튼 클릭시 해당상품 삭제
//----------------------------------------------------------------------
import React, { useRef, useState } from 'react'
import '../Style03.css'

const data = [
    { id: 1, name: '삼성 세탁기', price: 2500000},
    { id: 2, name: '엘지 냉장고', price: 3500000},
    { id: 3, name: '삼성 스타일러', price: 150000},
]

const initForm = {name:'엘지 TV', price:2000000};

const RegisterPage = () => {
    const [products, setProducts] = useState(data);
    const idRef = useRef(4);
    const nameRef = useRef(null);

    const [form, setForm] = useState(initForm);
    const {name, price} = form;

    const onChange = (e) => {           {/* form을 펼쳐서 복사해오고 [e.target.name]으로 form.name이나 form.price골라서 form의 value값 바꾸기 */}
        setForm({...form, [e.target.name]:e.target.value});
    }

    const onSubmit = (e) => {           {/* 새 배열에 ...products로 기존 상품 복사해오고 idRef.current++로 id 붙여주고 form에 작성한 데이터 펼쳐서 붙이기 */}
        e.preventDefault();
        setProducts([...products, {id:idRef.current++, ...form}]);  
        nameRef.current.focus();
    }

    const onReset = (e) => {
        e.preventDefault();
        setForm(initForm);
        nameRef.current.focus();
    }

    const onRemove = (e, id) => {
        e.preventDefault();
        if(window.confirm(`${id}번 상품을 삭제하시겠습니까?`)) {
            const data = products.filter(p => p.id !== id);
            setProducts(data);
        }
    }

    return (
        <div className='box'>
            <h1>상품등록</h1>
            <form onSubmit={onSubmit} onReset={onReset}>
                <input onChange={onChange}
                    value={name} ref={nameRef} placeholder='상품이름' name='name'/>
                <input onChange={onChange}
                    value={price} placeholder='상품가격' name='price' type='number' step={1000}/>
                <div>
                    <button type='submit' disabled={!name || !price}>등록</button>
                    <button type='reset' disabled={JSON.stringify(form) === JSON.stringify(initForm)}>취소</button>
                </div>
            </form>
            <h1 style={{marginTop:'30px'}}>상품목록</h1>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>NAME</td>
                        <td>PRICE</td>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => 
                        <tr key={p.id} onClick={(e)=> onRemove(e, p.id)}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.price}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
export default RegisterPage