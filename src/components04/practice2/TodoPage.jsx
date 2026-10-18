//useEffect을 이용해 jsonplaceholder의 todos 데이터 불러오기
//page가 변경될 때마다 해당 페이지의 5개의 데이터 불러오기
//todos의 completed가 바뀔 때마다 체크상태 토글하기
//----------------------------------------------------------
import React, { useState, useEffect, useRef } from 'react'
import '../Style04.css'
import PageButton from './PageButton';

const TodoPage = () => {
    const [todos, setTodos] = useState([]);
    const [page, setPage] = useState(1);
    const lastRef = useRef(1);
    const size = 20;

    const onChange = (e, id) => {
        const data = todos.map(t => t.id === id ? {...t, completed: e.target.checked} : t);
        setTodos(data);
    }
    
    const callAPI = () => {
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => {
            const start = (page - 1) * size + 1;
            const end = page * size;
            const data = json.filter(t => t.id >= start && t.id <= end);
            console.log(data);
            setTodos(data);
            lastRef.current = Math.ceil(json.length / size);
        });
    }

    useEffect(() => {
        callAPI();
    }, [page]);
    
    return (
        <div className='box'>
            <h1>Todos</h1>
            {todos.map(t =>
                <div key={t.id}>
                    <input type='checkbox' checked={t.completed} onChange={(e)=> onChange(e, t.id)}></input>
                    <span  className='title'>{t.title}</span>
                </div>
            )}
            <PageButton page={page} setPage={setPage} last={lastRef.current}/>
        </div>
    )
}
export default TodoPage