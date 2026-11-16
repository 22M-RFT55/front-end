//MainRouter에 등록한다.
//--------------------------------------------
import React, { useContext, useState } from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { ModalContext } from '../../context/ModalContext'
import { app } from '../../initFirebase'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { create } from 'axios'

const JoinPage = () => {
    const { setAlert } = useContext(ModalContext);
    const navi = useNavigate();
    const auth = getAuth(app)

    const [form, setForm] = useState({
        email: 'hong@test.com',
        pass: '12341234'
    });
    const { email, pass } = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onJoin = (e) => {
        e.preventDefault();
        if (email === '' || !email.includes('@')) {
            alert('invalid Email!');
        }
        else if (pass.length < 8) {
            alert('invalid Password!');
        }
        else { //Join Check
            createUserWithEmailAndPassword(auth, email, pass)
            .then(success=>{
                alert('Success Join!');
                navi('/login')
            })
            .catch(error=> {
                alert(`error: ${error.message}`)
            })
        }
    }

    return (
        <Row className='my-5 justify-content-center'>
            <Col xs={7} md={6} lg={5} xl={4} className='my-5'>
                <Card>
                    <Card.Header>
                        <h3 className='text-center'>회원가입</h3>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={onJoin}>
                            <Form.Control onChange={onChange} value={email} name='email' className='mb-2' />
                            <Form.Control onChange={onChange} value={pass} name='pass' type='password' className='mb-2' />
                            <Button type='submit' className='w-100'>로그인</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}
export default JoinPage