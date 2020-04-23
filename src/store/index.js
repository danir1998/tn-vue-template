import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || '',
        loading: false,
        info: ''
    },
    mutations: {
        AUTH_LOGIN(state, token) {
            state.token = token;
        },
        SET_INFO(state, text) {
            state.info = text;
        }
    },
    actions: {
        fetchData({commit}, payload) {
            return new Promise((resolve) => {
                axios.get('tuples', payload)
                    .then(response => {
                        resolve(response.data);
                    })
            })
        },
        logout({commit}) {
            return new Promise((resolve) => {
                commit('AUTH_LOGIN', '');
                localStorage.removeItem('token');
                resolve(true);
            })
        },
        login({commit, state}, payload) {
            state.loading = true;
            return new Promise((resolve, reject) => {
                axios.post('site/login', payload)
                    .then(response => {
                        const {data} = response;
                        localStorage.setItem('token', data.token);
                        commit('AUTH_LOGIN', data.token);
                        resolve(data);
                    })
                    .catch(err => {
                        localStorage.removeItem('token');
                        commit('SET_INFO', 'Ошибка');
                        reject(err);
                    })
                    .finally(() => {
                        commit('SET_INFO', '');
                        state.loading = false;
                    });
            })
        }
    },
    getters: {
        isAuthenticated: state => !!state.token,
        isLoading: state => state.loading,
        info: state => state.info,
    },
    modules: {}
})
