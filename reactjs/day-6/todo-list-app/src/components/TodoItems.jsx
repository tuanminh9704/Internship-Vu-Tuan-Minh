export const TodoItems = ({text, index, onDelete, onEdit}) => {
    console.log(index);
    return (
        <li>
            <span className="todo-text">{text}</span>
            <button className="button-edit" onClick={() => onEdit(index)}>Sửa</button>
            <button className="button-delete" onClick={() => onDelete(index)}>Xóa</button>
        </li>
    )
}