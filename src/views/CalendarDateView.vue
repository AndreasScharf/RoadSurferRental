<template>
    <div class="d-flex flex-column">
        <p v-if="!pickupStationId">Please select a pickup station</p>
        <div v-else>
          
            <ul class="p-0 flex-grow-1" >

                <li v-for="booking in bookings" :key="booking.id"
                    v-touch:swipe.left="() => onSwipeLeft(booking)" v-touch:swipe.right="() => onSwipeRight(booking)"
                    @click="$router.push({ name: 'BookingDetails', params: { date:this.date, pickupStationId:this.pickupStationId, bookingId: booking.id } })"

                    draggable="true" @dragstart="dragStartHandler(booking)"

                    class="d-flex flex-row p-3 rounded-3 border bg-white shadow-sm mb-3 text-reset position-relative hover-shadow"
                    >
                    <div class="drag-text-container">
                        <span>{{ booking.customerName }} </span>
                        <span class="text-muted">{{ booking.startDateFormat }} - {{ booking.endDateFormat }}</span>
                    </div>
                    
                    
                </li>
            </ul>
        </div>

    </div>
</template>
<script>
import moment from 'moment';
import { mapGetters } from 'vuex';


export default {
    name: 'CalendarDateView',
    components: { },
    props: { date: String, pickupStationId: String },
    methods: {
       
        getBookingPayload (index) {
            return this.bookings[index]
            
        },
        onSwipeLeft(booking) {
            this.$store.commit('setBookingDate', {today: this.date, date: moment.utc(this.date).add(-1, 'day'), stationId:this.pickupStationId, bookingId: booking.id});
        },
        onSwipeRight(booking) {
            this.$store.commit('setBookingDate', {today: this.date, date: moment.utc(this.date).add(1, 'day'), stationId:this.pickupStationId, bookingId: booking.id});

        },

        dragStartHandler(booking) {
            this.$store.commit('dropstore/startDrag', booking);
          
        }
    },
    computed: {
        ...mapGetters(['getBookingsByStationIdAndDate']),
        bookings() {
            return this.getBookingsByStationIdAndDate(this.pickupStationId, this.date).map(e => {
                return {
                    ...e,
                    startDateFormat: moment.utc(e.startDate).format('YYYY-MM-DD HH:mm'),
                    endDateFormat: moment.utc(e.endDate).format('YYYY-MM-DD HH:mm')
                };
            });
        }
    },
}
</script>

<style>
.drag-text-container {
    display: flex;
    flex-direction: column;
    justify-content: center;


    text-overflow: clip;
    width: 100%;
    transition: width 0.3s ease;
}


</style>