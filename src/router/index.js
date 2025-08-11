import { createRouter, createWebHistory } from 'vue-router';
import CalendarView from '@/views/CalendarView.vue';
import CalendarDateView from '@/views/CalendarDateView.vue'
//import ChildView from '@/views/ChildView.vue';

// Import your components

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
    history: createWebHistory(),
    routes,
});

export default router;