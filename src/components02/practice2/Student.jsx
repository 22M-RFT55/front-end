//Fragment(프래그먼트)연습 .box>h3 글자색상변경
//------------------------------------------
const Student = ({stu}) => {
    return (
        <div>
            <h3>학번:{stu.id}</h3>
            <h3>이름:{stu.name}</h3>
            <h3>학과:{stu.dept}</h3>
            <br/>
        </div>
    )
}
export default Student