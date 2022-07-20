document.addEventListener('DOMContentLoaded', () => {
    let cnarr = str.split('//')
    let enarr = eng.split('//')
    const userpost = getDom('.user_new_post')
    var temparr = [];
    for (let i = 0; i < 5; i++) {
        let li = document.createElement('li')
        let acn = document.createElement('a')
        acn.href = 'javascript:;'
        let suiji = Math.round(Math.random() * (cnarr.length - 1) + 0);
        do {
            suiji = Math.round(Math.random() * (cnarr.length - 1) + 0);
            temparr[i] = suiji;
            acn.textContent = cnarr[suiji];
        } while (!temparr.includes(suiji));
        li.append(acn);
        acn.addEventListener('mouseenter', () => {
            acn.textContent = enarr[suiji]
        });
        acn.addEventListener('mouseleave', () => {
            acn.textContent = cnarr[suiji]
        })
        userpost.appendChild(li)
    }


})