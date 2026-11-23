//1. PostRouter에 등록
//2. ListPage 제목에 ReadPage 연결하기
//3. posts에서 id에 해당하는 정보읽기
//4. 로그인한 경우에만 수정, 삭제버튼 보이기
//5. 삭제한 경우 ListPage로 이동하고 수정버튼 클릭시 수정페이지로 이동
//----------------------------------------------------------------------
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { app } from '../../initFirebase'
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { ModalContext } from '../../context/ModalContext'
import { get } from 'firebase/database'

const ReadPage = () => {
    const { setConfirm } = useContext(ModalContext);
    const navi = useNavigate();
    const email = sessionStorage.getItem('email');
    const { id } = useParams();
    const db = getFirestore(app);
    const [post, setPost] = useState('');

    const getData = async() => {
        const snapshot = await getDoc(doc(db, 'posts', id));
        console.log(snapshot.data());
        setPost(snapshot.data());
    };

    const onDelete = async() => {
        if(window.confirm('Do you want to delete?')) {
            await deleteDoc(doc(db, 'posts', id));
            navi('/post');
        }
    }

    useEffect(() => {
        getData();
    }, []);

    if(!post) {
        return(
            <h1 className='text-center my-5'>Loading...</h1>
        )
    }

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>게시글 정보</h1>
            <Row className='justify-content-center'>
                <Col md={10} lg={9} xl={8}>
                {email === post.email &&
                    <div className='text-end mb-2'>
                        <Button onClick={()=> navi(`/post/update/${id}`)} className='px-3 me-2' variant='outline-primary'>수정</Button>
                        <Button onClick={onDelete} className='px-3' variant='outline-danger'>삭제</Button>
                    </div>
                }
                <h5>{post.title}</h5>
                <hr/>
                <div style={{whiteSpace:'pre-wrap'}}>{post.body}</div>
                <hr/>
                <div>Posted on {post.date} by {post.email}</div>
                </Col>
            </Row>
        </div>
    )
}
export default ReadPage