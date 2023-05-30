const m_wnd = window;
const m_doc = document;
const m_droot = m_doc.getElementById('droot');
const m_dlmenu = m_doc.getElementById('dlmenu');
const m_drcont = m_doc.getElementById('drcont');


let m_rsvg = null;


const fn_Resize = (e) => {
    console.log('>>>');
    const st1 = getComputedStyle(m_droot);
    const ts = `width: ${st1.width}, height: ${st1.height}`;
    console.log(ts);
};


// const fn_gllr = function(l, j, i) {
//     if (typeof l !== 'number') return i;
//     if (typeof j !== 'number') return i;
//     if (typeof i !== 'number') return i;
//     if (l < j) return i;

//     let m = Math.ceil(l / j);
//     let r = Math.floor(i / j);
//     let h = i % j;
//     let k = (m * h) + r;
//     k = Math.round(k);
//     // console.log(k);
//     return k;
// };


const fn_SVG_AppendRect = (w, h, x, y) => {
    // const sr = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    // // sr.setAttribute('fill', 0xff0000);
    // sr.setAttribute('width', w);
    // sr.setAttribute('height', h);
    // sr.setAttribute('x', x);
    // sr.setAttribute('y', y);

    // const ss = 'cursor: pointer; pointer-events: none; fill: #ff0000;';
    // sr.setAttribute('style', ss);
    // // console.log(sr);
    // m_rsvg.appendChild(sr);
    // // console.log(m_rsvg.innerHTML);
    w -= 4; h -= 4;
    const tag = `
<rect width="${w}" height="${h}" x="${x}" y="${y}"
    style="cursor: pointer; pointer-events: none; fill: #ff0000;"
    />
    `.trim();
    m_rsvg.insertAdjacentHTML('beforeend', tag);
};

const fn_SVG_CreateElements = () => {
    const w = 100, h = 40;
    const l = 40;
    const j = 4;
    for (let i = 0; i < l; ++i) {
        const q = i % j;
        const r = Math.floor(i / j);
        // console.log(q, r);

        const x = w * q;
        const y = h * r;
        console.log(x, y);

        fn_SVG_AppendRect(w, h, x, y);
    }
};


const fn_GridDraw = () => {
    const tag = `
<svg id="rsvg">
</svg>
    `.trim();

    m_drcont.innerHTML = tag;
    m_rsvg = m_drcont.querySelector('#rsvg');
    // console.log(m_rsvg);


//     m_rsvg.innerHTML = `
// <rect id="r1" fill="red" width="100" height="40" x="10" y="10"/>
//     `.trim();

    // const cr = m_rsvg.children;
    // console.log(cr);

    fn_SVG_CreateElements();
};


const fn_InitOnce = () => {
    const tag = `
<button class="c_bt"><span>01) TimeStamp Tool</span></button>
<button class="c_bt"><span>02) Base64 Tool</span></button>
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
<button class="c_bt"><span>13) </span></button>
<button class="c_bt"><span>14) </span></button>
<button class="c_bt"><span>15) </span></button>
<button class="c_bt"><span>16) </span></button>
<button class="c_bt"><span>17) </span></button>
<button class="c_bt"><span>18) </span></button>
<button class="c_bt"><span>19) </span></button>
<button class="c_bt"><span>20) </span></button>
<button class="c_bt"><span>21) </span></button>
<button class="c_bt"><span>22) </span></button>
<button class="c_bt"><span>23) </span></button>
<button class="c_bt"><span>24) </span></button>
<button class="c_bt"><span>25) </span></button>
<button class="c_bt"><span>26) </span></button>
<button class="c_bt"><span>27) </span></button>
<button class="c_bt"><span>28) </span></button>
<button class="c_bt"><span>29) </span></button>
    `.trim();
    m_dlmenu.innerHTML = tag;


    fn_GridDraw();


    m_wnd.addEventListener('resize', fn_Resize);
    fn_Resize(null);

};




fn_InitOnce();
