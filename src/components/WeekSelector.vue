<template>
    <div class="d-flex flex-column"  v-touch:swipe.left="onSwipeLeft" v-touch:swipe.right="onSwipeRight">
        <label class="fw-bold text-secondary mb-2" style="text-align: left;">{{ titleDate }}</label>
        <div class="d-flex flex-row gap-1 justify-content-around">
            <div class="d-none d-md-flex" style="cursor: pointer;" @click="onSwipeRight">
                <p class="my-auto"  style="font-size: 24pt;">&larr;</p>
            </div>
            <router-link 
                v-for="(day, index) in weekdays" :key="index"
                :to="{name: 'CalendarDateView', params: { ...$route.params, date: day.date }}"
                v-on:click="$emit('update:date', day.date)"
                class="d-flex flex-column align-items-center text-center date-circle px-lg-4" :class="{'drag-over':dragOverIndex == index}"
                
                >
                <div class="drop-zone flex-grow-1 d-flex flex-column flex-lg-row align-items-center gap-lg-2"  @dragover="e => dragOver(e, index)" @dragleave="dragOverIndex = -1" @drop="() => onDrop(day)">
                    <div class="fw-bold order-1 flex-grow-1" style="font-size: 16px; line-height: 16px; flex-basis: 0;" >{{ day.labelDay }}</div>
                    <div class="order-0 mt-sm-1 my-lg-auto flex-grow-1 date-addition">{{ day.labelMonth }}</div>
                    <div class="order-2 mb-sm-1 my-lg-auto flex-grow-1 date-addition">{{ day.labelYear }}</div>

                </div>
                
            </router-link >
            <div class="d-none d-md-flex" style="cursor: pointer;" @click="onSwipeLeft">

                <p class="my-auto" style="font-size: 24pt;">&rarr;</p>
            </div>

        </div>
    </div>

</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'

export default{
    name: "WeekSelector",
    components: {  },
    props:{
        date: String,
    },
    computed: {

        ...mapGetters(['dropStore/getDragElement']),
        weekdays() {
            return this.weekdaysFromDate(this.date).map(day => {

                const momentDay = moment.utc(day);


                return {
                    date: day,
                    
                    labelDay: momentDay.format('DD'),
                    labelMonth: momentDay.month() != moment().month()? momentDay.format('MMM') : '',
                    labelYear: momentDay.year() != moment().year()?  momentDay.format('YYYY') : '',
                };
            });
        },
        titleDate() {
            return moment(this.date).format('YYYY MMM');
        },

        
    },
    methods: {
        weekdaysFromDate(date) {
            const startOfWeek = moment(date, 'YYYY-MM-DD').startOf('isoWeek'); 
            return Array(7).fill(0).map((e,i) => {return startOfWeek.clone().add(i, 'days').format('YYYY-MM-DD')}) 
        },
        // swipeLeft for new select header of week one week forward
        onSwipeLeft(){

            const date  = moment(this.date)
            
            date.add(7, 'days')

            const dateFormated = date.format('YYYY-MM-DD') 
            
            // update values and push to router to trigger reload of the DateView
            this.$emit('update:date', dateFormated)
            this.$router.push({name: 'CalendarDateView', params:{...this.$route.params, date: dateFormated}})
        },

        // swipeBackward for new select header of week one week into past
        onSwipeRight(){
            const date  = moment(this.date)
            
            date.add(-7, 'days')

            const dateFormated = date.format('YYYY-MM-DD') 
            

            // update values and push to router to trigger reload of the DateView
            this.$emit('update:date', dateFormated)
            this.$router.push({name: 'CalendarDateView', params:{ ...this.$route.params, date: dateFormated}})

        },
        onDrop(day) {
            
            const booking = this.$store.getters['dropstore/getDragElement'];


            if (booking) {
                const stationId = booking.pickupReturnStationId;

                this.$store.commit('setBookingDate', {today: this.date, date:day.date, stationId, bookingId:booking.id });

                this.$store.commit('dropstore/stopDrop')
            }
            
            this.dragOverIndex = -1
        },
        dragOver(event, index){
            event.preventDefault();

            this.dragOverIndex = index
            
            
        }
        
      
    },
    data() {
        return {
           list: [],

           // is the index of the currently hovered drag over element
           dragOverIndex: -1,
        };
    },
   


}
</script>

<style>
.date-circle {
  width: 48px;
  height: 48px;
  border: 1px solid #0d6efd; /* Bootstrap gray-300 */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  /*Remove User Highlight */
  user-select: none;
  color: auto;
  text-decoration: none;
}


.date-circle.drag-over{
    background-color: rgba(13, 110, 253, 0.5); /* Bootstrap primary with transparency */

    color: white;
}

.date-circle.router-link-active {
  background-color: #0d6efd; /* Bootstrap primary */
  color: #fff;
  border-color: #0d6efd;
}
.date-circle.user-select-none {
  user-select: none;
}

.date-circle .date-addition{
    font-size: 9px; 
    flex-basis: 0;
}


/* Styles for large screens and up (≥992px) */
@media (min-width: 992px) {
  .date-circle {
    width: auto;

    border-radius: 24px;

  }
  .date-circle .date-addition{
    font-size: 12px;
    flex: 0 0 auto;
  }
}


</style>