import React from 'react'

const Product = ({ p }) => {
    const { id, name, price, description } = p;

    return (
        <>
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{parseInt(price).toLocaleString()}</td>
            </tr>

            <tr style={{backgroundColor : 'gray', color: 'white'}}>
                <td colSpan={3}>{description}</td>
            </tr>
        </>
    )
}
export default Product