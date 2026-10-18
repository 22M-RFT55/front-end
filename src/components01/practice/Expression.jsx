//JSX에서 자바스크립트 표현식을 구성하는 변수, 
//연산자(AND, OR, 삼항, 스프레드) 사용방법
//---------------------------------------
import '../Style01.css'

const Expression = () => {
    const name='Chris';
    const age = 30;
    const job = '';
    const isLogin = true;
    const student = {name, age};
    const person = {...student, job};
    
    return (
        <div className='box'>
            <h1>변수값 출력</h1>
            <div>{name}, {age + 1}, {job || '무직'}</div>
            <h1>삼항 연산자</h1>
            {isLogin ? <botton>로그아웃</botton> : <botton>로그인</botton>}
            <h1>AND 연산자</h1>
            {isLogin && <div>{name}, {age}, {job || '무직'}</div>}
            <h1>OR 연산자</h1>
            {isLogin  || <div>로그인 하세요!</div>}
            <h1>스프레드 연산자</h1>
            <div>{person.name}, {person.age}, {person.job || '무직'}</div>
        </div>
    )
}
export default Expression