//useEffect을 이용해 jsonplaceholder의 todos 데이터 불러오기
//page가 변경될 때마다 해당 페이지의 5개의 데이터 불러오기
//todos의 completed가 바뀔 때마다 체크상태 토글하기
//----------------------------------------------------------
import React, { useState, useEffect, useRef } from 'react'
import '../Style04.css';
import PageButtonPrac from './PageButtonPrac';

const TodoPage = () => {
    
const [todos, setTodos] = useState([]);
const [page, setPage] = useState(3);
const size = 10;
const lastRef = useRef(1);
const [checked, setChecked] = useState([]);

    const callAPI = () => {
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => {
            console.log(json);
            const start = (page - 1) * size + 1;
            const end = page * size;
            const data = json.filter(post => post.id >= start && post.id <= end);
            setTodos(data);
            lastRef.current = Math.ceil(json.length/size);
        });
    }

    useEffect(() => {
        callAPI();
    }, [page]);

    useEffect(() => {
        setChecked(todos.filter(todo => todo.completed))
    }, [todos])

    const onChange = (e, id) => {
        const data = todos.map(todo => 
            todo.id === id ? {...todo, completed : e.target.checked} : todo);
        setTodos(data);
    }

    const onChangeAll = (e) => {
        const data = todos.map(todo => ({...todo, completed : e.target.checked}));
        setTodos(data);
    }
    
    return (
        <div className='box'>
            <h1>Todos</h1>
            <div>
                <input type='checkbox' checked={todos.length===checked.length} 
                    onChange={onChangeAll}/>
                전체 선택 / 해제
            </div>
            <hr/>
            {todos.map(todo =>
                <div key = {todo.id}>
                    <input onChange={(e) => onChange(e, todo.id)}
                    type='checkbox' checked={todo.completed}/>
                    <span>{todo.id}. {todo.title}</span>
                </div>
            )}
            <PageButtonPrac page={page} setPage={setPage} last={lastRef.current}/>
        </div>
    )
}
export default TodoPage