const Footer = ({dark, setDark}) => {
    return (
        <div className={`footer ${dark ? 'black' : 'gray'}`}>
            <button onClick={()=> setDark(!dark)}>{!dark ? 'Dark Mode' : 'Light Mode'}</button>
        </div>
    )
}
export default Footer