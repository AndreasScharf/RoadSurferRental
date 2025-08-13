import { createRouter, createWebHistory } from 'vue-router';
import CalendarView from '@/views/CalendarView.vue';
import CalendarDateView from '@/views/CalendarDateView.vue'
//import ChildView from '@/views/ChildView.vue';


const routes = [
    {
        path: '/',
        name: 'CalendarView',
        component: CalendarView,
        children: [
         
            {
                path: '/calendar-date/:date/:pickupStationId?',
                name: 'CalendarDateView',
                props: true,
                component: CalendarDateView,
            },
        ],
    },
    {
        path: '/booking-details/:date/:pickupStationId/:bookingId',
        name: 'BookingDetails',
        props: true,
        component: () => import('@/views/BookingDetailsView.vue'), 
    }
];

const router = createRouter({
    history:  process.env.NODE_ENV === 'production'? createWebHistory('/RoadSurferRental/') : createWebHistory(),
    //history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;