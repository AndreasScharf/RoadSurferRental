import { mount } from '@vue/test-utils'
import WeekSelector from '../src/components/WeekSelector.vue'

describe('WeekSelector.vue', () => {
  it('renders the component', () => {
    const wrapper = mount(WeekSelector, {
      props: { date: '2025-08-10' },
      

    })
    expect(wrapper.exists()).toBe(true)
   
  })   


  it('weekdaysFromDate function edge case Sunday', () => {

    const wrapper = mount(WeekSelector, {props: { date: '2025-08-10' }, global: { stubs: { 'router-link': true } } })
    const result = wrapper.vm.weekdaysFromDate('2025-08-10')
    expect(result).toEqual([
      '2025-08-04', // Mon
      '2025-08-05', // Thu
      '2025-08-06', // Wen
      '2025-08-07', // Tue
      '2025-08-08', // Fri
      '2025-08-09', // Sat
      '2025-08-10'  // Sun
    ])  
   
  })    
  it('weekdaysFromDate function', () => {

    const wrapper = mount(WeekSelector, {props: { date: '2025-08-09' },})
    const result = wrapper.vm.weekdaysFromDate('2025-08-09')
    expect(result).toEqual([
      '2025-08-04', // Mon
      '2025-08-05', // Thu
      '2025-08-06', // Wen
      '2025-08-07', // Tue
      '2025-08-08', // Fri
      '2025-08-09', // Sat
      '2025-08-10'  // Sun
    ])  
   
  })    

})