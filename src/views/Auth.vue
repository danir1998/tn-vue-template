<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Авторизации</v-toolbar-title>
                        <v-spacer/>

                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field v-model="username" label="Логин" name="login" prepend-icon="mdi-account" type="text"/>
                            <v-text-field v-model="password" id="password" label="Пароль" name="password" prepend-icon="mdi-lock" type="password"/>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn color="primary" @click="onAuth" :loading="isLoading">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Auth",
        props: ["source"],
        data: () => ({
            username: '',
            password: ''
        }),
        methods: {
            onAuth() {
                const {username, password} = this;

                this.$store.dispatch('login', {username, password})
                    .then(() => {
                        //this.$router.go();
                    })
            }
        },
        computed: {
            ...mapGetters(['isLoading'])
        },
    }
</script>

<style scoped>

</style>