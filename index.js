const input = document.getElementById('title')
const todoContainer = document.querySelector('#todo-container')
const form = document.getElementById('form')
let todoData = []
const uuid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
const renderItem = (item) => {
    return `
    <div class='items'>
    <p class="delete" onclick="handleDelete('${item.id}')">❌</p>
    <p class='${item.completed ? 'strike' : 'normal' }' id=${`todo-items`} onclick="handleCompleted('${item.id}')">${item.title}</p>
    </div>`
}
const todoItems = document.getElementById('todo-items')
const handleCompleted = async (id) => {
    let newTodo = JSON.parse(localStorage.getItem('local'))
    let index = newTodo.findIndex(item => item.id === id)
    newTodo[index].completed = !newTodo[index].completed
    let items = ''
    newTodo.map(item => {
        items += renderItem(item)
    })
    todoContainer.innerHTML = items
    localStorage.setItem('local', JSON.stringify(newTodo))
    todoData = JSON.parse(localStorage.getItem('local'))
}

const handleDelete = async (id) => {
    let newTodo = []
    newTodo = todoData.filter(item => item.id !== id)
    let items = ''
    newTodo.map(item => {
        items += renderItem(item)
    })
    todoContainer.innerHTML = items
    localStorage.setItem('local', JSON.stringify(newTodo))
    todoData = JSON.parse(localStorage.getItem('local'))
}

const handleForm = async (e) => {
    e.preventDefault()
    if (input.value.length) {
        let newTodo = []
        newTodo = [...todoData,
            {
                id: uuid(),
                title: input.value,
                completed: false
            }
        ]
        let items = ''
        newTodo.map(item => {
            items += renderItem(item)
        })
        todoContainer.innerHTML = items
        localStorage.setItem('local', JSON.stringify(newTodo))
        todoData = JSON.parse(localStorage.getItem('local'))
        title.value = ''
    }
}
const submit = document.getElementById('submit')
submit.addEventListener('click', (e) => handleForm(e))
const getData = async () => {
    const local = localStorage.getItem('local')
    if (local) {
        todoData = JSON.parse(localStorage.getItem('local'))
        let items = ''
        todoData.map(item => {
            items += renderItem(item)
        })
        todoContainer.innerHTML = items
    } else {
        localStorage.setItem('local', JSON.stringify([]))
    }
}

getData()