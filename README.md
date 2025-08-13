# rental-calendar
## Demo
https://andreasscharf.github.io/RoadSurferRental/

## Summery of the Project
### Router
I choose a router loading approach, so ever user can use router controls to maneuver in my application. e.g. Back, Reload, or Share (Link).

eg.
```
/calendar-date/:date/:pickupStationId?

// AND
/booking-details/:date/:pickupStationId/:bookingId

```
### State Management
I chose to implement a `vuex` store so i can store my API request in the store, and can access them globally form the whole application, with the representative selector ids

#### Additons:  
In a production environment, I should change selectors especially in the url to uuid generated ids.

### drag & drop feature
Because of the mobile first approach it was quite difficult to use the Browser Native drag&drop events. 

My next approach was to try out different NPM packages, which have the touch handler already enabled. But neither `vue3-smooth-dnd` or `vuedraggable` worked as I intended and because of timing reasons I had to abort that.
<br>I implemented drag&drop for the desktop usage, but for mobile usage i came up with an other idea.

For this coding challenge I implemented the reschedule with a swipe on the booking element.<br>
If that would be a customer request now would be the point to write the be drag & drop mechanic by my self. With the representative touch elements
1. `touchstart` with delay to detect a drag intent
2. creation of a ghost element, in `z-index:9999`  and a absolute position
3. `touchmove` event to move the ghost element and a v binding to the coordinates
4. marking of the drop zones via rectangle and a global x, y position detection on the `touchmove` event
5. eventully the detection of a drag-enter into dropzone, and the firing or highlighting of the dropzone
6. with a `touchend` for the eventual dropping and detecting of the dropping zone
7. also add maybe some animation.

I would have stored the data object of the `booking` in a store variable at `drag-start`.
And received and cleared it when `drop` would have fired over my dropzone.

As a developer in 2025 i would describe this to the AI and adjust, implement and test but i dont think that would be a reasonable solution for a coding challenge

### Unit Tests
I implemented a `jest` test environment for the unit tests.
```
npm test
```

#### Function Test
I implemented unit test for all the helper functions especially `utils/sanitizeData.js`

#### Component Test
For the `WeekSelector.vue` I also implemented a component test, important note here a the computed function which calculates the current week 'Mon' - 'Fri' form the current date. 

#### View Test
I also build a View Tests for the `BookingDetailsView.vue` to see if all values are loaded correctly. If the API call triggers correctly on loading form the router.



### Addition
The API URL should normally be put into a `.env` but as I am hosting this as github webpages I need my environment variables