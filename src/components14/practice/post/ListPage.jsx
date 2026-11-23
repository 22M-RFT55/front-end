//posts collection 목록을 출력한다.(날짜 내림차순)
//페이징 처리를 한다.
import React, { useEffect, useState, useRef } from 'react'
import { Button,  Tab,  Table} from 'react-bootstrap'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { app } from '../../initFirebase'
import { getFirestore, collection, query, orderBy, onSnapshot, snapshotEqual } from 'firebase/firestore'
import PagingButton from '../../common/PagingButton'

const ListPage = () => {
    const navi = useNavigate();
    const email = sessionStorage.getItem('email');
    const db = getFirestore(app);
    const [response, setResponse] = useState('');

    const callData = () => {
        const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
        onSnapshot(q, snapshot => {
            const rows = [];
            snapshot.docs.forEach(row => {
                rows.push({id: row.id, ...row.data()})
            });
            console.log(rows);
            setResponse({posts: rows, count: rows.length});
        });
    };

    const onRegister = () => {
        if (email) {
            navi('/post/register');
        } else {
            navi('/login');
        }
    };

    useEffect(() => {
        callData();
    }, []);

    if(!response) return (
        <h1 className='text-center my-5'>Loading...</h1>
    );

    const {posts, count} = response;
    
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>게시글</h1>
            <div className='text-end'>
                <Button onClick={onRegister} className='px-5'>새글작성</Button>
            </div>
            <Table bordered striped hover className='mt-3'>
                <tbody>
                    {posts.map((post, index) => 
                        <tr key={post.id}>
                            <td>{count - index}</td>
                            <td>{post.title}</td>
                            <td>{post.email}</td>
                            <td>{post.date}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}
export default ListPage