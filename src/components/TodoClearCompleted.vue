<template>
    <button v-show="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
</template>

<script>
    export default {
        name: 'todo-clear-completed',
        computed: {
            showClearCompletedButton() {
                return this.$store.getters.showClearCompletedButton;
            }
        },
        methods: {
            clearCompleted() {
                return this.$store.dispatch('clearCompleted');
            }
        }
    }
</script>
