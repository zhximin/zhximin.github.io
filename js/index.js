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
            //每次得到一个下标
            suiji = Math.round(Math.random() * (cnarr.length - 1) + 0);
            acn.textContent = cnarr[suiji];//将得到的内容的两边的空格去掉然后得到这个值。//李银河 李银河
        } while (list.includes(suiji))
        list.push(suiji)//我这里不写这个就死循环了
        console.log(list);
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