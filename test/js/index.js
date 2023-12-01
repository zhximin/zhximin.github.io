document.addEventListener('DOMContentLoaded', () => {
    let cnarr = str.split('//')
    let enarr = eng.split('//')

    const userpost = getDom('.user_new_post')

    var list = [];
    for (let i = 0; i < 5; i++) {
        let li = document.createElement('li')
        let acn = document.createElement('a')
        acn.href = 'javascript:;'
        let suiji = Math.round(Math.random() * (cnarr.length - 1) + 0);
        do {
            suiji = Math.round(Math.random() * (cnarr.length - 1) + 0);
            acn.textContent = cnarr[suiji];
        } while (list.includes(suiji))
        list.push(suiji)
        li.append(acn);
        acn.addEventListener('mouseenter', () => {
            acn.textContent = enarr[suiji]
        });
        acn.addEventListener('mouseleave', () => {
            acn.textContent = cnarr[suiji]
        })
        userpost.appendChild(li)
    }
    const calendar = getDom('.calendar')
    local(calendar, 'click', '../calendar/calendar.html')
    const clock = getDom('.clock')
    local(clock, 'click', '../clock/clock.html')
    const ImageCollection = getDom('.ImageCollection')
    local(ImageCollection, 'click', '../ImageCollection.html')
})