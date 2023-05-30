const m_wnd = window;
const m_doc = document;

const m_droot = m_doc.getElementById('droot');
const m_dlmenu = m_doc.getElementById('dlmenu');
const m_drcont = m_doc.getElementById('drcont');

const m_svgrt = m_drcont.querySelector('#svgrt');


const m_colItems = [
    Object.freeze({
        type: 'text',
        name: 'num',
        with: 40
    }),
    Object.freeze({
        type: 'text',
        name: 'name',
        with: 200
    }),
    Object.freeze({
        type: 'text',
        name: 'email',
        with: 400
    }),
    Object.freeze({
        type: 'text',
        name: 'desc',
        with: 700
    }),
    Object.freeze({
        type: 'text',
        name: 'etc',
        with: 100
    })
];


const fn_SVG_Resize = (e) => {
    const st1 = getComputedStyle(m_rsvg);
    // console.log(st1.width);

    const hec = m_rsvg.children;

    const gw = parseInt(st1.width, 10);
    const gh = parseInt(st1.height, 10);
    // console.log(gw, gh);

    const w = 100, h = 40;
    const l = hec.length;
    const j = Math.floor(gw / w);
    // console.log(l, j);

    for (let i = 0; i < l; ++i) {
        const q = (j <= 0) ? 0 : i % j;
        const r = (j <= 0) ? 0 : Math.floor(i / j);
        // console.log(q, r);

        const x = w * q;
        const y = h * r;
        // console.log(x, y);

        const he = hec[i];
        // console.log(he);
        he.setAttribute('x', x);
        he.setAttribute('y', y);
    }
};


const fn_SVG_AppendRect = (w, h, x, y) => {
    w -= 1; h -= 1;
    const tag = `
<rect width="${w}" height="${h}" x="${x}" y="${y}"
    style="cursor: pointer; pointer-events: none; fill: #ff0000;"
    />
    `.trim();
    m_rsvg.insertAdjacentHTML('beforeend', tag);
};


const fn_SVG_CreateElements = () => {
    const w = 100, h = 40;
    const l = 400;
    for (let i = 0; i < l; ++i) {
        const x = 0;
        const y = 0;
        // console.log(x, y);
        fn_SVG_AppendRect(w, h, x, y);
    }
};


const fn_SVG_FirstInit = () => {
    fn_SVG_CreateElements();

    m_wnd.addEventListener('resize', fn_SVG_Resize);
    fn_SVG_Resize(null);

    // const x1 = getComputedStyle(m_rsvg);
    // console.log(x1);
    // x1.setProperty('overflow-x', 'auto');
    const st = m_rsvg.style;
    st.setProperty('overflow-x', 'scroll');
    st.setProperty('overflow-y', 'visible');
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


    fn_SVG_FirstInit();

};




fn_InitOnce();
