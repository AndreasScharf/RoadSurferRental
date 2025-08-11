import moment from 'moment';
import { createStore } from 'vuex';
import dropstore from './dropStore.js';

const store = createStore({
    modules: {
        dropstore
    },
    state: {
        stations: []
    },
    mutations: {
        setStations(state, stations) {
            state.stations = stations;
        }
    },
    actions: { 
        async fetchStations({ commit }) {
            try {
                // usally i would outsource URL to .env file
                const response = await fetch('https://605c94c36d85de00170da8b4.mockapi.io/stations');
                const data = await response.json();
                commit('setStations', data);
        } catch (error) {
                console.error('Error fetching stations:', error);
            }
        }
    },
    getters: {
        getStations(state) {
            return state.stations.map(({id, name}) => {return {id, name}});
        },
        getStationsNamed(state){
            return state.stations.map(({name}) => name);
        },
        getStationById: (state) => (id) => {
            return state.stations.find(station => station.id == id);
        },

        getBookingsByStationIdAndDate: (state) => (stationId, date) => {
            const station = state.stations.find(station =>
                station.id === stationId
            );


            // prevent error if no bookings found
            if (!(station && station.bookings)) {
                return [];
            }
            

            return station.bookings.filter(booking =>
                booking.pickupReturnStationId === stationId && (
                moment.utc(booking.startDate).format('YYYY-MM-DD') === moment.utc(date).format('YYYY-MM-DD') ||
                moment.utc(booking.endDate).format('YYYY-MM-DD') === moment.utc(date).format('YYYY-MM-DD'))
            );

        }

    }
});

export default store;