import { reactive } from 'vue';

export default{
    namespaced: true,
    state: reactive({
        dropElement: null,
    }),
    getters: {
        isDropping(state) {
            return state.dropElement? true : false;
        },
    },
    mutations: {
        startDrop(state, element) {
            state.dropElement = element;
        },
        stopDrop(state) {
            state.dropElement = null;
        },
    },
};
