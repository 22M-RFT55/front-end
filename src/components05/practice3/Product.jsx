import { ACTION_TYPE } from "./CartPage";

const Product = ({product, type, dispatch}) => {
    const {id, name} = product;

    return (
        <tr>
            <td width='50px'>{id}</td>
            <td width='270px'>{name}</td>
            {type === 'cart' ? 
                <td>
                    <button onClick={()=> dispatch({type: ACTION_TYPE.delete, product})}>삭제</button>
                    <button onClick={()=> dispatch({type: ACTION_TYPE.order, product})}>주문</button>
                </td>
                :
                <td>
                    <button onClick={()=> dispatch({type: ACTION_TYPE.cancel, product})}>취소</button>
                </td>
            }
        </tr>
    )
}
export default Product