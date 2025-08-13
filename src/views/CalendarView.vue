<template>
    <div class="">
        <WeekSelector v-model:date="date" class="my-3"  />
        <AutoCompleteInput
            title="Pickup Station"
            v-model="pickupStation"
            :items="getStations"
            @query="handleQuery"
            @select="pickupStationSelected"

            />
        <router-view/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import moment from 'moment'

import AutoCompleteInput from '@/components/AutoCompleteInput.vue';
import WeekSelector from '@/components/WeekSelector.vue';

export default {
    name: "CalendarView",
    components: {
        WeekSelector, AutoCompleteInput
    },
    props: {
        
    },
    methods: {
        handleQuery() {
            // could performe an API call to filter stations based on input, but here we just use the full list
        },
        pickupStationSelected(station) {
            this.$router.push({ name: 'CalendarDateView', params: { date: this.date, pickupStationId: station.id } });
        }
    },
    computed:{
        ...mapGetters(['getStations', 'getStationById']),

        pickupStationName() {
            const station = this.getStationById(parseInt(this.$route.params.pickupStationId));
            return station ? station.name : '';
        }
        
    },
    watch:{
        pickupStationName(){
            if(this.pickupStation === '' && this.pickupStationName){
                this.pickupStation = this.pickupStationName;
            }
        }
    },
    data() {
        const date = (this.$route.params.date) ? this.$route.params.date : moment().format('YYYY-MM-DD');


        return {
            // Define any data properties needed for the calendar view
            date, // Default to today's date
            pickupStation: '',
           
        };
    },
    mounted() {

        
        if (!this.$route.params.date) {
            this.$router.push({ name: 'CalendarDateView', params: { date: this.date } });
        }

        this.pickupStation = this.pickupStationName;

      
    }

 
}
</script>