export function parseDate(data) {
    const date = new Date(data);

    console.log(`Date submitted: ${date} `);
    return `${date.getFullYear().toString()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`

}