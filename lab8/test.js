let s = "<p>A dramatic police mystery, exposes the unending prejudice faced by the only female detective in a male-dominated police squad.</p>"

console.log(removeHtmlTags(s));


function removeHtmlTags(summary) {
    let cleanText = summary.replace(/<\/?[^>]+(>|$)/g, "");

    return cleanText
}