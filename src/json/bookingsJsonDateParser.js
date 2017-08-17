const bookingsJsonDateParser = (bookings) => {
    // TODO replace with more concise / reusable method
    for (let b = 0; b < bookings.bookings.length; b++) {  
    let booking = bookings.bookings[b];
    if (booking.start) 
        booking.start = new Date(booking.start);

    if (booking.end) 
        booking.end = new Date(booking.end);
    }
}

export default bookingsJsonDateParser