<template>
    <div class="d-flex flex-column">
        <p v-if="!pickupStationId">Please select a pickup station</p>
        <div v-else>
          
            <ul class="p-0 flex-grow-1 overflow-scroll">
                <draggable
                    v-model="bookings" item-key="id"
                    :item="booking"
                    @dragstart="onDrag(booking)" >
                    <template #item="{booking}">
                        <li
                            @click="$router.push({ name: 'BookingDetails', params: { date:this.date, pickupStationId:this.pickupStationId, bookingId: booking.id } })"

                            class="d-flex flex-column p-3 rounded-3 border bg-white shadow-sm mb-3 text-reset position-relative hover-shadow"
                            >
                            <span>{{ booking.customerName }} </span>
                            <span class="text-muted">{{ booking.startDateFormat }} - {{ booking.endDateFormat }}</span>
                            
                        </li>
                    </template>
                </draggable>
            </ul>
        </div>

    </div>
</template>
<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
    name: 'CalendarDateView',
    props: { date: String, pickupStationId: String },
    methods: {
        onDrag(booking) {
            // Handle the drop event, e.g., update booking or show details
            console.log('Dropped booking:', booking);
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