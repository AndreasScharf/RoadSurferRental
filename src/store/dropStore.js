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
        getDragElement(state){

            return state.dropElement
        }
    },
    mutations: {
        startDrag(state, element) {
            
            state.dropElement = element;
        },
        stopDrop(state) {
            state.dropElement = null;
        },
    },
};
