const DATE_FORMATTER = new Intl.DateTimeFormat("es-CO", {
    weekday: "long",
    month: "long",
    day: "2-digit",
    year: "numeric",
});

const TIME_FORMATTER = new Intl.DateTimeFormat("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
});

function buildLocalDate(dateInput?: string, timeInput?: string) {
    if (!dateInput) return null;

    const [datePart] = dateInput.split("T");
    const [year, month, day] = datePart
        .split("-")
        .map((value) => Number(value));

    if ([year, month, day].some((value) => Number.isNaN(value))) {
        return null;
    }

    if (!timeInput) {
        return new Date(year, month - 1, day);
    }

    const [hourPart = "0", minutePart = "0", secondPart = "0"] =
        timeInput.split(":");

    const hour = Number(hourPart);
    const minute = Number(minutePart);
    const second = Number(secondPart);

    return new Date(
        year,
        month - 1,
        day,
        Number.isNaN(hour) ? 0 : hour,
        Number.isNaN(minute) ? 0 : minute,
        Number.isNaN(second) ? 0 : second,
    );
}

function capitalizeFirstLetter(value: string) {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatEventDate(date?: string, time?: string) {
    const eventDate = buildLocalDate(date);
    const startDateTime = buildLocalDate(date, time);

    const dateLabel = eventDate
        ? capitalizeFirstLetter(DATE_FORMATTER.format(eventDate))
        : "";

    const timeLabel = startDateTime ? TIME_FORMATTER.format(startDateTime) : "";

    if (dateLabel && timeLabel) {
        return `${dateLabel} | ${timeLabel}`;
    }

    if (dateLabel) {
        return dateLabel;
    }

    if (timeLabel) {
        return timeLabel;
    }

    return "-";
}
