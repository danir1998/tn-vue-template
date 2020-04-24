<template>
    <div>
        <HelloWorld msg="Welcome to Your Vue.js App"/>
        {{list}}
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'Home',
        data: () => ({
            list: []
        }),
        components: {
            HelloWorld
        },
        mounted() {
            this.$store.dispatch('fetchData').then(data => this.list = data);
        }
    }
</script>
