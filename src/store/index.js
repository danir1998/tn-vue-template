import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || '',
        loading: false,
        info: '',
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
        async fetchData({commit}, payload) {
            return await axios.get('tuples', payload)
                .then(response => {
                    return response.data;
                })
        },
        logout({commit}) {
            return new Promise((resolve) => {
                commit('AUTH_LOGIN', '');
                localStorage.removeItem('token');
                resolve(true);
            })
        },
        async login({commit, state}, payload) {
            state.loading = true;
            return new Promise(async (resolve, reject) => {
                await axios.post('site/login', payload)
                    .then(response => {
                        const {data} = response;
                        localStorage.setItem('token', data.token);
                        resolve(data.token);
                        commit('AUTH_LOGIN', data.token);
                    })
                    .catch(err => {
                        reject();
                        localStorage.removeItem('token');
                        Vue.swal({ text: 'Ошибка', icon: "error" });
                    })
                    .finally(() => {
                        state.loading = false;
                    });
            });
        }
    },
    getters: {
        isAuthenticated: state => !!state.token,
        isLoading: state => state.loading,
        info: state => state.info,
    },
    modules: {}
})
