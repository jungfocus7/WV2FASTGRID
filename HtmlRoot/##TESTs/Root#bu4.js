import { DragRound } from "./js/DragRound.js";


const m_dr = new DragRound('dgrid', () => {
    console.log('개발자 옵션');
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
