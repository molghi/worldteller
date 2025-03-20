// FORMATTING CAPITAL DATE-TIME, POPULATION, AND AREA (in modal window) IN A FRIENDLIER WAY

function formatDateTime(dateTimeString) {
    const [date, time] = dateTimeString.split(" ").map((x) => x.trim());
    const timeDone = time
        .split(":")
        .filter((x, i) => i !== 2)
        .join(":");
    const dateDone = date
        .split("-")
        .reverse()
        .map((x, i) => {
            if (i === 2) return x.slice(2);
            return x;
        })
        .join("/");
    return `${dateDone} ${timeDone}`;
}

// ================================================================================================

function formatPopulation(string) {
    let formatted = new Intl.NumberFormat("en-UK").format(+string);
    if (formatted.split(",").length === 2)
        formatted = formatted.split(",")[0] + "," + formatted.split(",")[1].slice(0, 1) + " thousand people";
    else if (formatted.split(",").length === 3)
        formatted = formatted.split(",")[0] + "," + formatted.split(",")[1].slice(0, 1) + " mln people";
    else if (formatted.split(",").length === 4) formatted = formatted.slice(0, 3) + " bln people";
    return formatted;
}

// ================================================================================================

function formatArea(string) {
    let formatted = new Intl.NumberFormat("en-UK").format(+string);
    if (formatted.split(",").length === 3)
        formatted = formatted.split(",")[0] + "," + formatted.split(",")[1].slice(0, 1) + " mln";
    return formatted + " km²";
}

// ================================================================================================

export { formatDateTime, formatPopulation, formatArea };
