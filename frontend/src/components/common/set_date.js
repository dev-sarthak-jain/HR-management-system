export const readableDate = (date_in_string) => {
    const currentDate = new Date(date_in_string);
    // Array of month names
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Get the date components
    const year = currentDate.getFullYear();
    const monthIndex = currentDate.getMonth();
    const day = currentDate.getDate().toString().padStart(2, '0');

    // Get the time components
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');


    // Create a readable date and time string with the month name
    const formattedDateTime = `${monthNames[monthIndex]} ${day}, ${year}.   ${hours}:${minutes}`;

    return formattedDateTime

}
