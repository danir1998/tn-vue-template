<template>
    <v-app>
        <v-app-bar app color="secondary" dark>
            <div class="d-flex align-center">
                <v-img alt="Vuetify Logo" class="link shrink mr-2" contain src="@/assets/logo1.png" @click="$router.push('/')" transition="scale-transition"/>
            </div>
            <v-spacer></v-spacer>
            <v-btn color="red" v-show="isAuthenticated" dark @click="exit">Выход</v-btn>
        </v-app-bar>
        <v-content>
            <RouterView></RouterView>
        </v-content>
    </v-app>
</template>

<script>
    import HelloWorld from './components/HelloWorld';
    import axios from 'axios';
    import {mapGetters} from "vuex";

    export default {
        name: 'App',

        components: {
            HelloWorld,
        },
        methods: {
            exit() {
                this.$store.dispatch('logout').then(() => this.$router.go());
            }
        },
        created: function () {
            let self = this;
            axios.interceptors.response.use(function (response) {
                return response;
            }, function (error) {
                if (401 === error.response.status && error.config && !error.config.__isRetryRequest) {
                    self.$store.dispatch('logout').then(() => self.$router.go())
                }
           });
        },
        data: () => ({
            //
        }),
        computed: {
            ...mapGetters(['isAuthenticated']),
        }
    };
</script>

<style>
    .link {
        cursor: pointer;
    }

</style>
