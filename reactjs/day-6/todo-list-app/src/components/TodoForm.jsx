export const TodoForm = ({ value, onChange, onSubmit, isEditing }) => {
  console.log(isEditing);
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Nhập công việc cần làm"
      />
      <button className="button-submit" onClick={onSubmit}>
        {isEditing ? 'Cập nhật' : 'Thêm'} 
      </button> 
    </div>
  );
};
  