<template>
    <div class="d-flex flex-column"  v-touch:swipe.left="onSwipeLeft" v-touch:swipe.right="onSwipeRight">
        <label class="fw-bold text-secondary mb-2" style="text-align: left;">{{ titleDate }}</label>
        <div class="d-flex flex-row gap-1 justify-content-around"
           
            >
            <router-link 
                v-for="(day, index) in weekdays" :key="index"
                :to="{name: 'CalendarDateView', params: { ...$route.params, date: day.date }}"
                v-on:click="$emit('update:date', day.date)"
                class="d-flex flex-column align-items-center justify-content-center rounded-circle text-center date-circle" >

                <div class="fw-bold order-1 flex-grow-1" style="font-size: 16px; line-height: 16px; flex-basis: 0;" >{{ day.labelDay }}</div>
                <div class="order-0 mt-1 flex-grow-1" style="font-size: 9px; flex-basis: 0;">{{ day.labelMonth }}</div>
                <div class="order-2 mb-1 flex-grow-1" style="font-size: 9px; flex-basis: 0;">{{ day.labelYear }}</div>
            </router-link >
        </div>
    </div>

</template>

<script>
import moment from 'moment'

export default{
    name: "WeekSelector",
    props:{
        date: String,
    },
    computed: {
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
        }
    },
    methods: {
        weekdaysFromDate(date) {
            const startOfWeek = moment(date, 'YYYY-MM-DD').startOf('isoWeek'); 
            return Array(7).fill(0).map((e,i) => {return startOfWeek.clone().add(i, 'days').format('YYYY-MM-DD')}) 
        },

        onSwipeLeft(){

            const date  = moment(this.date)
            
            date.add(7, 'days')

            const dateFormated = date.format('YYYY-MM-DD') 
            
            this.$emit('update:date', dateFormated)
            this.$router.push({name: 'CalendarDateView', params:{...this.$route.params, date: dateFormated}})
        },
        onSwipeRight(){
            const date  = moment(this.date)
            
            date.add(-7, 'days')

            const dateFormated = date.format('YYYY-MM-DD') 
            
            this.$emit('update:date', dateFormated)
            this.$router.push({name: 'CalendarDateView', params:{ ...this.$route.params, date: dateFormated}})

        }
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

.date-circle.router-link-active {
  background-color: #0d6efd; /* Bootstrap primary */
  color: #fff;
  border-color: #0d6efd;
}
.date-circle.user-select-none {
  user-select: none;
}

</style>