import {
    _MouseMove, _Blur, _MouseUp, _MouseDown, _Resize, _Scroll,
    DragRound
} from "./js/DragRound.js";




const m_dgrid = document.getElementById('dgrid');
const m_dgbg = document.getElementById('dgbg');
const m_dgitc = document.getElementById('dgitc');



// const m_itemArr = [];

const m_dr = new DragRound(m_dgrid, (e) => {
    // m_dround.insertAdjacentHTML('afterbegin', '<button type="button">Click Me!</button>');
    // console.log(m_dround.children.length);
    // for (const he of m_dround.children) {
    //     console.log(he);
    //     // he.remove();
    // }

    // m_dround.innerHTML = `

    // `.trim();

    // m_itemArr.length = 0;
    // m_itemArr.push();

    // m_dicont.insertAdjacentHTML('afterbegin', '<button type="button">Click Me!</button><br/>');
    // console.log(type);
    // if (e.type === _Resize) {
    //     const stl = m_dicont.style;
    //     stl.width = '999px';
    // }
    // if ((e.type === _MouseMove) ||
    //     (e.type === _Resize) ||
    //     (e.type === _Scroll)) {
    //     // const stl = getComputedStyle(m_dicont);
    //     // console.log(JSON.stringify(stl, null, 2));

    //     const sl = m_dgrid.scrollLeft;
    //     const st = m_dgrid.scrollTop;
    //     // console.log(sl, st);
    //     const st1 = m_dicont.style;
    //     st1.setProperty('left', `${sl + 10}px`);
    //     st1.setProperty('top', `${st + 10}px`);
    //     st1.setProperty('right', `${10}px`);
    //     st1.setProperty('bottom', `${10}px`);
    //     // st1.setProperty('width', `calc(100% - ${st}px)`);
    //     // width: calc(100% - 20px); height: calc(100% - 20px);

    //     // const st2 = getComputedStyle(m_dicont);
    //     // const tw = st2.getPropertyValue('width');
    //     // const th = st2.getPropertyValue('height');
    //     // console.log(tw);
    // }
});

window.m_dr = m_dr;









// const fn_MouseMove = (e) => {
//     // console.log(e);

//     const lx = m_dx - e.x;
//     const ly = m_dy - e.y;
//     console.log(lx, ly);

//     const sl = m_sl + lx;
//     const st = m_st + ly;
//     // console.log(sl, st);

//     // // m_dgrid.scrollLeft = lx;
//     m_dgrid.scroll(sl, st);
// };

// const fn_MouseUp = (e) => {
//     window.removeEventListener(_MouseMove, fn_MouseMove);
//     window.removeEventListener(_MouseUp, fn_MouseUp);
//     window.removeEventListener(_Blur, fn_MouseUp);
//     console.log('MouseUp');

//     const sl = m_dgrid.scrollLeft;
//     const st = m_dgrid.scrollTop;
//     console.log(sl, st);
// };

// const fn_MouseDown = (e) => {
//     if (e.button === 0) {
//         window.addEventListener(_MouseMove, fn_MouseMove);
//         window.addEventListener(_MouseUp, fn_MouseUp);
//         window.addEventListener(_Blur, fn_MouseUp);
//         m_dx = e.x;
//         m_dy = e.y;
//         m_sl = m_dgrid.scrollLeft;
//         m_st = m_dgrid.scrollTop;
//         fn_MouseMove(e);
//     }
// };


// const fn_InitOnce = () => {
//     window.x1 = m_dround.style;

//     window.addEventListener(_MouseDown, fn_MouseDown);
// };



// const _MouseMove = 'mousemove';
// const _Blur = 'blur';
// const _MouseUp = 'mouseup';
// const _MouseDown = 'mousedown';


// const m_droot = document.getElementById('droot');
// const m_dgrid = document.getElementById('dgrid');
// const m_dround = document.getElementById('dround');


// let m_dx = 0;
// let m_dy = 0;

// let m_sl = 0;
// let m_st = 0;


// fn_InitOnce();
