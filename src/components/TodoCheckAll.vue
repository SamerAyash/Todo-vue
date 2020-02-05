<template>
    <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkedAll"> Check All</label></div>
</template>

<script>
    export default {
        name: 'todo-check-all',
        computed: {
            anyRemaining() {
                return this.$store.getters.anyRemaining;
            }
        },
        methods: {
            checkedAll() {
                this.$store.dispatch('checkAll',event.target.checked);

            }
        }
    }
</script>
