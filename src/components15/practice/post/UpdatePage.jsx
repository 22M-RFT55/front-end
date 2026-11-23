//1. PostRouter에 등록
//2. posts collection에서 id에 해당하는 정보읽기
//3. 저장버튼 클릭시 수정하기
//4. 취소버튼 클릭시 리셋하기
//-----------------------------------------------------
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { ModalContext } from '../../context/ModalContext';
import { useNavigate, useParams } from 'react-router-dom';
import { app } from '../../initFirebase'
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore';

const UpdatePage = () => {
    const { setConfirm } = useContext(ModalContext);
    const navi = useNavigate();
    const {id} = useParams();
    const db = getFirestore(app);
    const [form, setForm] = useState('');
    const {title, body} = form;
    const initForm = useRef('');

    const getData = async() => {
        const snapshot = await getDoc(doc(db, 'posts', id));
        console.log(snapshot.data());
        setForm(snapshot.data());
        initForm.current = snapshot.data();
    }

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        if(window.confirm('Do you want to update?')) {
            await setDoc(doc(db, 'posts', id), form);
        }
        navi(-1);
    }

    const onReset = (e) => {
        e.preventDefault();
        if(window.confirm('Do you want to Reset?')){
            getData();
        }
    }

    useEffect(() => {
        getData();
    }, []);

    if(!form) {
        return(
            <h1 className='text-center my-5'>Loading...</h1>
        )
    }

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>게시글 수정</h1>
            <Row className='justify-content-center'>
                <Col md={10} lg={9} xl={8}>
                    <Form onSubmit={onSubmit} onReset={onReset}>
                        <Form.Control onChange={onChange} value={title} name='title' placeholder='제목을 입력하세요.' className='mb-3'/>
                        <Form.Control onChange={onChange} value={body} name='body' placeholder='내용을 입력하세요.' className='mb-3' rows={10} as='textarea'/>
                        <div className='text-center'>
                            <Button type='submit' className='px-5 me-2'>저장</Button>
                            <Button disabled={JSON.stringify(initForm.current) === JSON.stringify(form)} type='reset' className='px-5' variant='secondary'>취소</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}
export default UpdatePage