const {  escapeHTML, isFullISODateTime, sanitizeStations, sanitizeBookingDetails } = require('../src/utils/sanitizeData.js');

describe('isFullISODateTime in utils/sanitizeData.js', () => {
    it('isFullISODateTime 2021-01-28T11:28:02.038Z valid', () => {
        expect((isFullISODateTime("2021-01-28T11:28:02.038Z"))).toBe(true);
    });
    it('isFullISODateTime 2025-08-13 invalid', () => {
        expect(isFullISODateTime("2025-08-13")).toBe(false);
    })

   
});


describe('escapeHTML in utils/sanitizeData.js', () => {
    it('escapes individual special characters', () => {
      expect(escapeHTML('&')).toBe('&amp;');
      expect(escapeHTML('<')).toBe('&lt;');
      expect(escapeHTML('>')).toBe('&gt;');
      expect(escapeHTML('"')).toBe('&quot;');
      expect(escapeHTML("'")).toBe('&#39;');
      expect(escapeHTML('`')).toBe('&#96;');
    });
  
    it('escapes combinations and preserves order (& first)', () => {
      expect(escapeHTML('&<>"\'`')).toBe('&amp;&lt;&gt;&quot;&#39;&#96;');


      // proves & is escaped before < so no double-encoding of the ampersand in &lt;
      expect(escapeHTML('<')).toBe('&lt;');
      expect(escapeHTML('&<')).toBe('&amp;&lt;');
    });
  
    it('leaves safe text untouched', () => {
      const input = 'Hello, world! 123 _-.:()/';
      expect(escapeHTML(input)).toBe(input);
    });
  
    it('handles typical XSS-y snippets', () => {
      expect(escapeHTML('<img src=x onerror=alert(1)>'))
        .toBe('&lt;img src=x onerror=alert(1)&gt;');
      expect(escapeHTML('<script>alert("x")</script>'))
        .toBe('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
    });
  
    it('handles quotes for attribute contexts', () => {
      const input = '"double" and \'single\' and `backtick`';
      expect(escapeHTML(input)).toBe('&quot;double&quot; and &#39;single&#39; and &#96;backtick&#96;');
    });
});


describe('sanitizeStations in utils/sanitizeData.js', () => {
    it('sanitizeStations removes empty objects', () => {
        const data = [
            { id: '1', name: 'Station 1', bookings: [] },
            { id: '2', name: 'Station 2', bookings: [{ id: '1', customerName: 'John Doe', pickupReturnStationId: '1', startDate: '2021-01-28T11:28:02.038Z', endDate: '2021-01-28T12:28:02.038Z' }] },
            {}, // empty object
            { id: '3', name: '', bookings: [] } // invalid name
        ];
        const result = sanitizeStations(data);
        expect(result.length).toBe(2); // only valid stations should remain
        expect(result[1].bookings.length).toBe(1); 

    });

    it('sanitizeStations remove booking objects without time', () => {
        const data = [
            { id: '1', name: 'Station 1', bookings: [] },
            { id: '2', name: 'Station 2', bookings: [{ id:'1', customerName: 'John Doe', pickupReturnStationId: '1', startDate: '2021-01-28', endDate: '2021-01-28' }] },
            {}, // empty object
            { id: '3', name: '', bookings: [] } // invalid name
        ];
        const result = sanitizeStations(data);
        expect(result.length).toBe(2); // only valid stations should remain

        expect(result[1].bookings.length).toBe(0); // booking without time should be removed
    });
})


describe('sanitizeBookingDetails in utils/sanitizeData.js', () => {
    it('sanitizeBookingDetails with html escape', () => {
        const booking = {"id":"1","pickupReturnStationId":"1","customerName":"Kera <Admin>","startDate":"2021-03-13T22:04:19.032Z","endDate":"2021-07-17T08:51:27.402Z"}
      
          const result = sanitizeBookingDetails(booking);
      
          expect(result).toEqual({
            id: '1',
            customerName: 'Kera &lt;Admin&gt;', // escaped
            pickupReturnStationId: '1',
            startDate: '2021-03-13T22:04:19.032Z',
            endDate:   '2021-07-17T08:51:27.402Z',
          });
    });

    it('sanitizeBookingDetails invalid startDate', () => {
        const booking = {"id":"1","pickupReturnStationId":"1","customerName":"Kera <Admin>","startDate":"2021-03-13","endDate":"2021-07-17T08:51:27.402Z"}
      
          const result = sanitizeBookingDetails(booking);
      
          expect(result).toEqual(false);
    });

    it('sanitizeBookingDetails invalid endDate', () => {
        const booking = {"id":"1","pickupReturnStationId":"1","customerName":"Kera <Admin>","startDate":"2021-03-13T22:04:19.032Z","endDate":"2021-07-17"}
      
          const result = sanitizeBookingDetails(booking);
      
          expect(result).toEqual(false);
    });
});