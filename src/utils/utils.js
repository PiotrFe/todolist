export const downloadCSV = (csvData, fileName) => {

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    
    a.href = url;
    a.download = `${fileName}.csv` || "download";

    const clickHandler = () => {
        setTimeout(() => {
            URL.revokeObjectURL(url);
            a.removeEventListener("click", clickHandler)
        }, 150)
    }

    a.addEventListener("click", clickHandler, false);
    a.click();
}

export const handleServerErrors = async response => {
    if (!response.ok) {
        const text = await response.text()
        throw new Error(text);
    }
    return response;
}
