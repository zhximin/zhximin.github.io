function getDom(str) {
    return document.querySelector(str)
}
function local(dm, event, url) {
    dm.addEventListener(event, () => {
        location.href = url
    })
}