// Samer A.Ayash
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex)
axios.defaults.baseURL = 'http://localhost:8000/api';
export default new Vuex.Store({
  state: {
    filter: 'all',
    todos: []
  },
  getters: {
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length
    },
    anyRemaining(state, getters) {
      return getters.remaining != 0
    },
    todosFiltered(state) {
      if (state.filter == 'all') {
        return state.todos
      } else if (state.filter == 'active') {
        return state.todos.filter(todo => !todo.completed)
      } else if (state.filter == 'completed') {
        return state.todos.filter(todo => todo.completed)
      }
      return state.todos
    },
    showClearCompletedButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0
    }
  },
  mutations: {
    retrieveTodos(state,todos){
      state.todos = todos;
    },
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        editing: false,
      })
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id == todo.id)
      state.todos.splice(index, 1, {
        'id': todo.id,
        'title': todo.title,
        'completed': todo.completed,
      })
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id == id)
      state.todos.splice(index, 1)
    },
    checkAll(state, checked) {
      state.todos.forEach(todo => (todo.completed = checked))
    },
    updateFilter(state, filter) {
      state.filter = filter
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed)
    }
  },
  actions: {
    retrieveTodos(context){
      axios.get('/todos')
          .then(response => {
            context.commit('retrieveTodos',response.data);
          })
          .catch(error =>{
            console.log(error);
          });
    },
    addTodo(context, todo) {
        axios.post('/todos',{
          title: todo.title,
          completed: todo.completed
        })
            .then(response => {
              context.commit('addTodo', response.data)
            })
            .catch(error =>{
              console.log(error);
            });
    },
    updateTodo(context, todo) {
      axios.patch('/todos/' + todo.id, {
        title: todo.title,
        completed: todo.completed
      })
          .then(response => {
            context.commit('updateTodo', response.todo)
          })
          .catch(error =>{
            console.log(error);
          });
    },
    deleteTodo(context, id) {
      axios.delete('/todos/' + id)
          .then(response => {
            context.commit('deleteTodo', id)
          })
          .catch(error =>{
            console.log(error);
          });
    },
    checkAll(context, checked) {
      axios.patch('/todosCheckAll',{
        completed: checked
      })
          .then(response => {
            context.commit('checkAll', checked)
          })
          .catch(error =>{
            console.log(error);
          });
    },
    updateFilter(context, filter) {
        context.commit('updateFilter', filter)
    },
    clearCompleted(context) { //////// context equal to this.$store
      const completed = context.state.todos.filter(todo => todo.completed).map(todo => todo.id);
      axios.delete('/todosDeleteCompleted', {
        data: {
          todos: completed
        }
      })
          .then(response => {
            context.commit('clearCompleted')
          })
          .catch(error =>{
            console.log(error);
          });
    }
    ///////// You can cut context.commit to commit with argument clearCompleted({commit})
  }
})
