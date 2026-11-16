//즐겨찾기에 등록하기(로그인되지 않은 경우 로그인 페이지로 이동)
//즐겨찾기에 등록된경우 채워진 하트, 등록되지 않은 경우 빈하트
//즐겨찾기에서 삭제하기
import React, { useContext, useEffect, useState } from 'react'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { app } from '../../initFirebase'
import { getDatabase, ref, set, onValue, remove } from 'firebase/database'
import { useNavigate } from 'react-router';
import { ModalContext } from '../../context/ModalContext';

const Favorite = ({ book }) => {
    const navi = useNavigate();
    const { setAlert } = useContext(ModalContext);
    const [favorite, setFavorite] = useState(false);

    const db = getDatabase(app);
    const uid = sessionStorage.getItem('uid');
    const bookRef = `/favorite/${uid}/${book.isbn}`;

    useEffect(() => {
        onValue(ref(db, bookRef), snapshot => {
            if (snapshot.exists()) {
                setFavorite(true);
            }
            else {
                setFavorite(false);
            }
        })
    }, []);

    const onRegister = async() => {
        if(uid) {
            await set(ref(db, bookRef), book);
            alert('Success Register!');
        }
        else {
            navi('/login');
        }
    }

    const onRemove = async() => {
        await remove(ref(db, bookRef));
        alert('Success Remove!')
    }

    return (
        <div className='position-absolute top-0 end-0 me-2 icon-heart'>
            {favorite ?
                <FaHeart onClick={onRemove}/>
                :
                <FaRegHeart onClick={onRegister}/>
            }
        </div>
    )
}

export default Favorite
