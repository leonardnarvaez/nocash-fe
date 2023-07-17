const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function convertDate(d: Date): string {
    const datestring = d.getFullYear()  + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    ("0" + d.getDate()).slice(-2) + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
    return datestring;
}

export function getFirstAndLastDay(date: Date): [Date, Date] {
    // const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    // const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    // return [firstDay, lastDay];
    return [getFirstDay(date), getLastDay(date)];
}

export function getFirstDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getLastDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function previousMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}

export function nextMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}

export function getMonthAndYear(date: Date): string {
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
}