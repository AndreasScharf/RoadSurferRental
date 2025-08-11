<template>
    <div class="p-3">
      
        <div v-if="!loadingBooking">
            <div class="d-flex flex-row">
                <h2>Booking Details</h2>
                <div class="flex-grow-1"></div>
                <button type="button" class="btn btn-close" @click="$router.go(-1)"></button>
            </div>

            <div class="d-flex flex-column">
            
                <div 
                    class="d-grid gap-2 my-3 text-start"
                    style="grid-template-columns: 24px 1fr;">
                    <div></div>
                    <strong>Customer Name:</strong>

                    <img
                        :src="require('../assets/user-solid-full.svg')"
                        alt="User"
                        class="img-fluid rounded mb-0"
                        style="width:20px;height:20px"
                        />
                    <p class="mb-0" id="customerName">{{ customerName }}</p>
                </div>
                

                <div
                    class="d-grid gap-2 mt-3 mb-3"
                    style="
                        grid-template-columns: 24px 1fr 1fr;
                        align-items: start;
                        justify-items: start;
                    ">
                        <!-- Row 1: Headers -->
                        <div></div>
                        <strong>Pickup</strong>
                        <strong>Return</strong>

                        <!-- Row 2: Time -->
                        <img
                            :src="require('../assets/clock-solid-full.svg')"
                            alt="Clock"
                            class="img-fluid rounded"
                            style="width:20px;height:20px"
                        />
                        <span :class="{ 'underline':isPickup}" id="startDate">{{ startDate }}</span>
                        <span :class="{ 'underline':isReturn}" id="endDate">{{ endDate }}</span>

                        <!-- Row 3: Location -->
                        <img
                            :src="require('../assets/location-dot-solid-full.svg')"
                            alt="Location"
                            class="img-fluid rounded"
                            style="width:20px;height:20px"
                        />
                        <span :class="{ 'underline':isPickup}" id="pickupStation">{{ pickupStation }}</span>
                        <span :class="{ 'underline':isReturn}" id="returnStation">{{ returnStation ? returnStation : pickupStation }}</span>
                    </div>

                <div 
                    class="d-grid gap-2 mt-3 mb-3 text-start"
                    style="grid-template-columns: 24px 1fr;">
                    <div></div>
                    <strong>Booking Duration:</strong>

                    <img
                        :src="require('../assets/user-clock-solid-full.svg')"
                        alt="UserDuration"
                        class="img-fluid rounded"
                        style="width:20px;height:20px"
                        />
                    <p>{{ bookingDuration }}</p>
                </div>
            </div>
           
        </div>
        <div v-else>
            <p>Loading booking details...</p>
        </div>

    </div>
</template>
<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
    name: "BookingDetailsView",
    props: {
        date: String,
        pickupStationId: String,
        bookingId: String
    },
    computed: {
        ...mapGetters(['getStationById']),

        isPickup(){
            return this.date == moment.utc(this.startDate).format('YYYY-MM-DD');
        },
        isReturn(){
            return this.date == moment.utc(this.endDate).format('YYYY-MM-DD');
        }
    },
    data() {
        return {
            booking: null,
            loadingBooking: true,

            startDate: '',
            endDate: '',
            customerName: '',
            bookingDuration: '',

            pickupStation: '',
            returnStation: '',

        };
    },
    mounted() {
        this.fetchBookingDetails();
    },
    
    methods: {
        fetchBookingDetails() {
            // Fetch booking details based on bookingId prop


            fetch(`https://605c94c36d85de00170da8b4.mockapi.io/stations/${this.pickupStationId}/bookings/${this.bookingId}`)
                .then(response => response.json())
                .then(data => {
                    
                    this.booking = data;

                    this.startDate = moment.utc(data.startDate).format('YYYY-MM-DD HH:mm');
                    this.endDate = moment.utc(data.endDate).format('YYYY-MM-DD HH:mm');


                    this.bookingDuration = '';
                    // Calculate booking duration in days and hours
                    const bookingDays = moment.utc(data.endDate).diff(moment.utc(data.startDate), 'days');
                    this.bookingDuration += bookingDays ? bookingDays + ' days ' : '';

                    const bookingHours = moment.utc(data.endDate).diff(moment.utc(data.startDate), 'hours') % 24;
                    this.bookingDuration += bookingHours ? bookingHours + ' hours' : '';

                    
                    if(!( data.pickupStation && data.returnStation )) {
                        const station = this.getStationById(data.pickupReturnStationId);
                        this.pickupStation = station.name;
                    }else {
                        this.pickupStation = data.pickupStation;
                        this.returnStation = data.returnStation;

                    }

                    this.customerName = data.customerName;

                    this.loadingBooking = false;
                })
                .catch(error => {
                    console.error('Error fetching booking details:', error);
                });
            
        }
    }
};
</script>

<style>
.underline{
    text-decoration: underline;
}
</style>