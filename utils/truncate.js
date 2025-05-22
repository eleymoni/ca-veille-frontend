// if the title length is too long, maxLength is the max length of the title
export default function truncate(text, maxLength) {
    if (!text) return "";
    return text.length > maxLength
        ? text.substring(0, maxLength - 1) + "..."
        : text;
}
