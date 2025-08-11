import { mount } from '@vue/test-utils'
import BookingDetailsView from '../src/views/BookingDetailsView.vue'
import { makeRouter, makeStore, makeSuccessDefaultPayload } from './helperFunctions'
import { nextTick } from 'vue'

const flushPromises = () => new Promise((r) => setTimeout(r, 0))


describe('BookingDetailsView.vue', () => {

  // Mock global fetch to return a successful response
  beforeAll(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({})
    })
  });

  it('renders with real router', async () => {
    const router = makeRouter()        // <-- must define routes
    const store  = makeStore()         // <-- must provide needed getters
  
    // ✅ push a concrete start location WITH the param
    router.push('/booking-details/2020-06-20/2/2')
    await router.isReady()
  
    // now provide the payload the component expects
    const payload = makeSuccessDefaultPayload()
    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => payload })
  
    const wrapper = mount(BookingDetailsView, {
      global: { plugins: [router, store] }
    })
  
    await flushPromises()
  
    expect(global.fetch).toHaveBeenCalledTimes(1)
    //expect(wrapper.find('[data-test="booking-id"]').text()).toBe('123')
  });

  it('shows loading then renders fetched booking details', async () => {
    const router = makeRouter()        // <-- must define routes
    const store  = makeStore()         // <-- must provide needed getters
  
    // ✅ push a concrete start location WITH the param
    router.push('/booking-details/2020-06-20/2/2')
    await router.isReady()
  
    // now provide the payload the component expects
    const payload = makeSuccessDefaultPayload()
    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => payload })
  
    const wrapper = mount(BookingDetailsView, {
      global: { plugins: [router, store] }
    })
  
    await flushPromises()
    
    // Check if the request is data is shown correctly
    expect(wrapper.find('#customerName').text()).toBe('John Doe')

    expect(wrapper.find('#startDate').text()).toBe("2025-08-10 14:32")
    expect(wrapper.find('#endDate').text()).toBe("2025-08-15 22:46")

    // also check if the station names are rendered correctly
    expect(wrapper.find('#pickupStation').text()).toBe('Test Station')
    expect(wrapper.find('#returnStation').text()).toBe('Test Station')
  })

  
})
