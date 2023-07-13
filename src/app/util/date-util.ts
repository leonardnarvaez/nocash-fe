export function convertDate(d: Date): string {
    const datestring = d.getFullYear()  + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    ("0" + d.getDate()).slice(-2) + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
    return datestring;
}

export function getFirstAndLastDay(date: Date): [Date, Date] {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return [firstDay, lastDay];
}