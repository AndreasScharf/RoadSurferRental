import moment from 'moment';
import { createStore } from 'vuex';
import dropstore from './dropStore.js';

import { sanitizeStations, } from '../utils/sanitizeData.js';


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
        },

        setBookingDate(state, { today, date, stationId, bookingId }) {

            
            const station = state.stations.find(station => station.id === stationId);
            if (station) {
                const booking = station.bookings.find(booking => booking.id === bookingId);
                if (booking) {

                    // i am using the selected date to set the startDate or endDate of the booking
                    // if the booking start is on the same day as today, set the startDate to the start of the moved day
                    // if the booking end is on the same day as today, set the endDate to the end of the moved day

                    // If the booking start and end is on the same day as today, set the startDate to split both dates

                    const startDate = moment.utc(booking.startDate);
                    const endDate = moment.utc(booking.endDate);

                    if( moment.utc(today).format('YYYY-MM-DD') === startDate.format('YYYY-MM-DD') ) {
                        booking.startDate = moment.utc(date).hours(startDate.hours()).minutes(startDate.minutes()).toISOString();

                    } else if (moment.utc(today).format('YYYY-MM-DD') === endDate.format('YYYY-MM-DD')) {

                        booking.endDate = moment.utc(date).hours(endDate.hours()).minutes(endDate.minutes()).toISOString();
                    } 

                    //console.log('Updated booking:', booking);
                    
                }
            }
        }
    },
    actions: { 
        async fetchStations({ commit }) {
            try {
                // usally i would outsource URL to .env file
                const response = await fetch('https://605c94c36d85de00170da8b4.mockapi.io/stations');
                const data = sanitizeStations(await response.json());

                //const data = (await response.json());

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