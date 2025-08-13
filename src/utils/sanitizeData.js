import moment from 'moment';

function isFullISODateTime(str) {
    
    // strict datetime parse
    const m = moment.utc(str, 'YYYY-MM-DDTHH:mm:ss.sssZ', true); 
    return m.isValid()
}


function escapeHTML(str) {
    return String(str)
      .replace(/&/g, "&amp;")  
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/`/g, "&#96;"); 
}

function sanitizeStations(data) {
    // remove empty objects
    
        return data.map(({id, name, bookings}) => {
    
            if( !id || !name || !bookings) {
                
                return 0;
            }else if (typeof id !== 'string' || typeof name !== 'string' || !Array.isArray(bookings)) {
                
                return 0;
            }
            
            // this could also be a own function, but i want to keep it simple i have only one use
            const bookingMapped = bookings.map(({customerName, pickupReturnStationId, startDate, endDate, id}) => {
                
                // check if every data property is present
                if( !id || !customerName || !pickupReturnStationId || !startDate || !endDate) {
                    // console.log('Invalid booking data structure:', {id, customerName, pickupReturnStationId, startDate, endDate});
                    
                    return 0;
                }
                // check if dates are valid and customerName is a string and pickupReturnStationId is a number
                const bookingValid = isFullISODateTime(startDate) && isFullISODateTime(endDate) && typeof id === 'string' && typeof customerName === 'string' && typeof pickupReturnStationId === 'string';
                if (!bookingValid) {
                    // console.log('Invalid booking data types:', {id, customerName, pickupReturnStationId, startDate, endDate});
                    
                    return 0;
                }
    
                return { id, customerName: escapeHTML(customerName), pickupReturnStationId, startDate, endDate}
    
            })
            
            // return sanitized data
            return {id, name: escapeHTML(name), bookings: bookingMapped.filter(item => item)}; 
    
        }).filter(item => item); // filter out empty objects
}
function sanitizeBookingDetails(data) {
    // remove empty objects
    if (!data) {
       return false
    }
    const { id, customerName, pickupReturnStationId, startDate, endDate } = data;
    // check if every data property is present
    if (!id || !customerName || !pickupReturnStationId || !startDate || !endDate) {
        // console.log('Invalid booking data structure:', {id, customerName, pickupReturnStationId, startDate, endDate});
        return false;
    }

    // check if dates are valid and customerName is a string and pickupReturnStationId is a number
    const bookingValid = isFullISODateTime(startDate) && isFullISODateTime(endDate) && typeof id === 'string' && typeof customerName === 'string' && typeof pickupReturnStationId === 'string';
    if (!bookingValid) {
        // console.log('Invalid booking data types:', {id, customerName, pickupReturnStationId, startDate, endDate});
        return false;
    }
    return { id, customerName: escapeHTML(customerName), pickupReturnStationId, startDate, endDate }
}


export { sanitizeStations, escapeHTML, isFullISODateTime, sanitizeBookingDetails };