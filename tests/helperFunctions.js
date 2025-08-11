import { createRouter, createMemoryHistory } from 'vue-router'
import { createStore } from 'vuex'
import BookingDetailsView from '../src/views/BookingDetailsView.vue'

export function makeRouter() {
    const routes = [
      { path: '/booking-details/:date/:pickupStationId/:bookingId', name: 'BookingDetails', component: BookingDetailsView }
    ]
    return createRouter({ history: createMemoryHistory(), routes })
}
  
// store exposes the getter your component reads
export function makeStore() {
    return createStore({
        getters: {
            getStationById: () => (id) => ({ id, name: 'Test Station' })
        }
    })
}
  
  // mock API payload shape matches what your template renders
  export function makeSuccessDefaultPayload() {
    return {
      id: 2,
      stationId: 2,
      customerName: 'John Doe' ,
      pickupReturnStationId: 2,
      startDate: '2025-08-10T14:32:00Z',
      endDate: '2025-08-15T22:46:00Z',
    }
  }