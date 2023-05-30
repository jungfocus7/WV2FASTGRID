const fn_CreateColumnElement = (ci) => {
    const tag = `
<span style="color: black; background-color: darkgray; font-size: 20px;
    display: inline-block; width: ${ci.width}px;">${ci.name.toUpperCase()}</span>
    `.trim();
    // <label>${ci.name}</label>
    m_drcont.insertAdjacentHTML('beforeend', tag);
};


const fn_CreateRowElement = (ri) => {
    const arr = ri.values;
    if (arr.length !== m_colItemArr.length) return;

    const l = arr.length;
    // console.log(arr, l, m_colItemArr.length);
    m_drcont.insertAdjacentHTML('beforeend', '<br/>');

    for (let i = 0; i < l; ++i) {
        const ci = m_colItemArr[i];
        const tv = arr[i];
        // console.log(tv);
        const tag = `
<span style="color: black; background-color: darkgray; font-size: 15px;
    display: inline-block; width: ${ci.width}px;">${tv}</span>
        `.trim();
        m_drcont.insertAdjacentHTML('beforeend', tag);
    }
};


const fn_SettingElements = () => {
    for (const ci of m_colItemArr) {
        fn_CreateColumnElement(ci);
    }

    for (const ri of m_rowItemArr) {
        fn_CreateRowElement(ri);
    }
};


const fn_InitOnce = () => {
    const tag = `
<button class="c_bt"><span>01) </span></button>
<button class="c_bt"><span>02) </span></button>
<button class="c_bt"><span>03) </span></button>
<button class="c_bt"><span>04) </span></button>
<button class="c_bt"><span>05) </span></button>
<button class="c_bt"><span>06) </span></button>
<button class="c_bt"><span>07) </span></button>
<button class="c_bt"><span>08) </span></button>
<button class="c_bt"><span>09) </span></button>
<button class="c_bt"><span>10) </span></button>
<button class="c_bt"><span>11) </span></button>
<button class="c_bt"><span>12) </span></button>
    `.trim();
    m_dlmenu.innerHTML = tag;


    fn_SettingElements();

};


const m_droot = document.getElementById('droot');
const m_dlmenu = document.getElementById('dlmenu');
const m_drcont = document.getElementById('drcont');

const m_colItemArr = [
    Object.freeze({
        type: 'text',
        name: 'num',
        index: 0,
        width: 80
    }),
    Object.freeze({
        type: 'text',
        name: 'name',
        index: 1,
        width: 200
    }),
    Object.freeze({
        type: 'text',
        name: 'email',
        index: 2,
        width: 400
    }),
    Object.freeze({
        type: 'text',
        name: 'desc',
        index: 3,
        width: 700
    }),
    Object.freeze({
        type: 'text',
        name: 'etc',
        index: 4,
        width: 100
    })
];

const m_rowItemArr = [
    Object.freeze({
        values: ['001', '박종명', 'pook61@naver.com', '고등학교 친구 베스트 1', '기타설명']
    }),
    Object.freeze({
        values: ['002', '임헌진', 'inoff79@naver.com', '고등학교 친구 베스트 2', '기타설명']
    }),
    Object.freeze({
        values: ['003', '정희범', 'jhb0b@naver.com', '고등학교 친구 베스트 3', '기타설명']
    })
];



fn_InitOnce();















// const fn_SVG_Resize = (e) => {
//     const st1 = getComputedStyle(m_rsvg);
//     // console.log(st1.width);

//     const hec = m_rsvg.children;

//     const gw = parseInt(st1.width, 10);
//     const gh = parseInt(st1.height, 10);
//     // console.log(gw, gh);

//     const w = 100, h = 40;
//     const l = hec.length;
//     const j = Math.floor(gw / w);
//     // console.log(l, j);

//     for (let i = 0; i < l; ++i) {
//         const q = (j <= 0) ? 0 : i % j;
//         const r = (j <= 0) ? 0 : Math.floor(i / j);
//         // console.log(q, r);

//         const x = w * q;
//         const y = h * r;
//         // console.log(x, y);

//         const he = hec[i];
//         // console.log(he);
//         he.setAttribute('x', x);
//         he.setAttribute('y', y);
//     }
// };


// const fn_SVG_AppendRect = (w, h, x, y) => {
//     w -= 1; h -= 1;
//     const tag = `
// <rect width="${w}" height="${h}" x="${x}" y="${y}"
//     style="cursor: pointer; pointer-events: none; fill: #ff0000;"
//     />
//     `.trim();
//     m_rsvg.insertAdjacentHTML('beforeend', tag);
// };


// const fn_SVG_CreateElements = () => {
//     const w = 100, h = 40;
//     const l = 400;
//     for (let i = 0; i < l; ++i) {
//         const x = 0;
//         const y = 0;
//         // console.log(x, y);
//         fn_SVG_AppendRect(w, h, x, y);
//     }
// };


// const fn_SVG_FirstInit = () => {
//     fn_SVG_CreateElements();

//     m_wnd.addEventListener('resize', fn_SVG_Resize);
//     fn_SVG_Resize(null);

//     // const x1 = getComputedStyle(m_rsvg);
//     // console.log(x1);
//     // x1.setProperty('overflow-x', 'auto');
//     const st = m_rsvg.style;
//     st.setProperty('overflow-x', 'scroll');
//     st.setProperty('overflow-y', 'visible');
// };








