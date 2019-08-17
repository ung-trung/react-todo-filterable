export default todos => [...new Set(todos.map(todo => todo.createDate))]
