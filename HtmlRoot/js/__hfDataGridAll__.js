const _MouseMove = 'mousemove';
const _Blur = 'blur';
const _MouseUp = 'mouseup';
const _MouseDown = 'mousedown';
const _Resize = 'resize';
const _Scroll = 'scroll';




/**
 * 데이터그리드 이벤트
 */
class hfDGEvent extends Event
{
    static Dispatch = (et, ao) =>
    {
        if ((et instanceof EventTarget) === false) return;

        if (ao instanceof Event)
        {
            const evt = new hfDGEvent(ao.type);
            et.dispatchEvent(evt);
        }
        else if (typeof ao === 'object')
        {
            const evt = new hfDGEvent(ao.type, ao.options);
            evt.#pevt = ao.pevt;
            et.dispatchEvent(evt);
        }
    };


    /**
     * 생성자
     * @param {object} ao
     */
    constructor(type, options)
    {
        super(type, options);

        Object.freeze(this);
    };

    #pevt = null;
    PassEvent = () =>
    {
        return this.#pevt;
    };

};



/**
 * 드래그 라운드
 */
class hfDragRound extends EventTarget
{
    constructor(dgrid)
    {
        super();

        this.#m_dgrid = dgrid;

        window.addEventListener(_MouseDown, this.#MouseDown);
        window.addEventListener(_Resize, this.#Resize);
        this.#m_dgrid.addEventListener(_Scroll, this.#Scroll);

        Object.freeze(this);
    };

    #m_dgrid = null;    // Grid DIV

    #m_bmd = false;     // Bool MouseDown
    #m_dx = 0;          // MouseDown X
    #m_dy = 0;          // MouseDown Y
    #m_sl = 0;          // Scroll Left
    #m_st = 0;          // Scroll Top



    #MouseMove = (e) =>
    {
        // console.log(_MouseMove, e);
        if (this.#m_bmd === false) return;

        let lx = this.#m_dx - e.x;
        let ly = this.#m_dy - e.y;
        // console.log(lx, ly);
        let sl = this.#m_sl + lx;
        let st = this.#m_st + ly;
        // console.log(sl, st);
        this.#m_dgrid.scroll(sl, st);

        hfDGEvent.Dispatch(this, e);
    };


    #MouseUp = (e) =>
    {
        // console.log(_MouseUp, e);
        if (this.#m_bmd === false) return;

        window.removeEventListener(_MouseMove, this.#MouseMove);
        window.removeEventListener(_MouseUp, this.#MouseUp);
        window.removeEventListener(_Blur, this.#MouseUp);
        this.#m_bmd = false;

        // let sl = this.#m_dgrid.scrollLeft;
        // let st = this.#m_dgrid.scrollTop;
        // console.log(sl, st);

        hfDGEvent.Dispatch(this, e);
    };


    #MouseDown = (e) =>
    {
        // console.log(_MouseDown, e);
        if (e.button === 0)
        {
            if (this.#m_bmd === true) return;

            window.addEventListener(_MouseMove, this.#MouseMove);
            window.addEventListener(_MouseUp, this.#MouseUp);
            window.addEventListener(_Blur, this.#MouseUp);
            this.#m_bmd = true;

            this.#m_dx = e.x;
            this.#m_dy = e.y;
            // console.log(this.#m_dx, this.#m_dy);

            this.#m_sl = this.#m_dgrid.scrollLeft;
            this.#m_st = this.#m_dgrid.scrollTop;
            // console.log(this.#m_sl, this.#m_st);

            hfDGEvent.Dispatch(this, e);
            this.#MouseMove(e);
        }
    };


    #Resize = (e) =>
    {
        if (e !== null)
        {
            hfDGEvent.Dispatch(this, e);
        }
    };


    #Scroll = (e) =>
    {
        if (e !== null)
        {
            hfDGEvent.Dispatch(this, e);
        }
    };



    Dispose = () =>
    {
        if (this.#m_dgrid === null) return;

        this.#MouseUp();

        window.removeEventListener(_MouseDown, this.#MouseDown);
        window.removeEventListener(_Resize, this.#Resize);

        this.#m_dgrid.removeEventListener(_Scroll, this.#Scroll);
        this.#m_dgrid = null;
    };

};



export
{
    _MouseMove, _Blur, _MouseUp, _MouseDown, _Resize, _Scroll,
    hfDGEvent, hfDragRound
};




/**
 * 데이터그리드 컬럼아이템
 */
class hfColumnItem
{
    constructor(colName, propName, width, height)
    {
        this.#colName = colName;
        this.#propName = propName;
        this.#width = width;
        this.#height = height;

        Object.freeze(this);
    };

    #colName = '';
    ColumnName = (tv) =>
    {
        if (typeof tv !== 'string')
            return this.#colName;
        else
            this.#colName = tv;
    };

    #propName = '';
    PropName = (tv) =>
    {
        if (typeof tv !== 'string')
            return this.#propName;
        else
            this.#propName = tv;
    };

    #width = 70;
    Width = (tv) =>
    {
        if (typeof tv !== 'number')
            return this.#width;
        else
            this.#width = tv;
    };

    #height = 30;
    Height = (tv) =>
    {
        if (typeof tv !== 'number')
            return this.#height;
        else
            this.#height = tv;
    };

};



/**
 * 데이터그리드 로우아이템
 */
class hfRowItem
{
    constructor(colArr)
    {
        this.#colArr = colArr;
        this.#cl = this.#colArr.length;
        this.#arr = new Array(this.#cl);

        Object.freeze(this);
    };

    #colArr = null;
    #cl = 0;

    #arr = null;
    GetArr = (tp) =>
    {
        return this.#arr;
    };
    GetValue = (tp) =>
    {
        return this.#arr[tp];
    };
    SetValue = (tp, tv) =>
    {
        this.#arr[tp] = tv;
    };

}



/**
 * 데이터그리드 객체
 */
class hfDataGrid extends EventTarget
{
    constructor(dgrid)
    {
        super();

        this.#dgrid = dgrid;
        this.#dgbg = document.querySelector('#d_gbg');
        // console.log(this.#m_dgrid);
        // console.log(this.#m_dgbg);
        this.#drr = new hfDragRound(this.#dgrid);
        this.#drr.addEventListener(_MouseMove, this.#HandlerAll);
        this.#drr.addEventListener(_Blur, this.#HandlerAll);
        this.#drr.addEventListener(_MouseUp, this.#HandlerAll);
        this.#drr.addEventListener(_MouseDown, this.#HandlerAll);
        this.#drr.addEventListener(_Resize, this.#HandlerAll);
        this.#drr.addEventListener(_Scroll, this.#HandlerAll);

        Object.freeze(this);
    };

    #dgrid = null;
    #dgbg = null;
    #drr = null;

    #colArr = [];
    #rowArr = [];

    #raw = 70;
    #rah = 30;


    AddColumn = (colName, propName, width, height) =>
    {
        let ci = new hfColumnItem(colName, propName, width, height);
        this.#colArr.push(ci);
        return ci;
    };


    AddRow = () =>
    {
        const ri = new hfRowItem(this.#colArr);
        this.#rowArr.push(ri);
        return ri;
    };


    Render = () =>
    {
        let tw = 0;
        let th = 0;

        for (let ci of this.#colArr)
        {
            tw += ci.Width();
            if (th === 0)
                th = ci.Height();
        }

        this.#raw = tw;
        this.#rah = th * this.#rowArr.length;
        // console.log(this.#raw, this.#rah);

        // const st1 = getComputedStyle(this.#dgbg);
        const st1 = this.#dgbg.style;
        st1.width = `${this.#raw}px`;
        st1.height = `${this.#rah}px`;
        // console.log(st1);
    };



    /**
     *
     * @param {*} e
     */
    #HandlerAll = (e) =>
    {
        // console.log(e);
        hfDGEvent.Dispatch(this, e);




        // let st1 = getComputedStyle(this.#dgrid);
        // // console.log(this.#dgrid.clientWidth);
        // let blw = parseFloat(st1.borderLeftWidth, 10);
        // let btw = parseFloat(st1.borderTopWidth, 10);
        // let brw = parseFloat(st1.borderRightWidth, 10);
        // let bbw = parseFloat(st1.borderBottomWidth, 10);
        // // console.log(parseFloat(st1.borderLeftWidth, 10));
        // // console.log(st1.getPropertyValue('border-left-width'));

        // // console.log(this.#dgbg.offsetWidth);
        // // console.log(this.#dgbg.innferWidth);
        // let dr1 = this.#dgrid.getBoundingClientRect();
        // // console.log(dr1);
        // let dr2 = this.#dgbg.getBoundingClientRect();
        // // console.log(dr2);
        // let dr3 = new DOMRect();
        // // dr3.width = dr1.width - blw - brw;
        // // dr3.height = dr1.height - btw - bbw;
        // dr3.width = this.#dgrid.clientWidth;
        // dr3.height = this.#dgrid.clientHeight;
        // dr3.x = dr2.left - blw;
        // dr3.y = dr2.top - btw;
        // console.log(dr3);

        const fn_GetRenderRect = () =>
        {
            const de1 = this.#dgrid;
            const de2 = this.#dgbg;
            const st1 = getComputedStyle(de1);
            const st2 = getComputedStyle(de2);
            // console.log(st2.borderWidth);

            let bw1 = parseFloat(st1.borderWidth, 10);
            let bw2 = parseFloat(st2.borderWidth, 10);
            // console.log(bw1, bw2);

            // let blw = parseFloat(st1.borderLeftWidth, 10);
            // let btw = parseFloat(st1.borderTopWidth, 10);

            // let dr2 = de2.getBoundingClientRect();
            // let dr3 = new DOMRect();
            // dr3.width = de1.clientWidth;
            // dr3.height = de1.clientHeight;
            // dr3.x = dr2.left - blw;
            // dr3.y = dr2.top - btw;

            // console.log(dr3);
            // return dr3;

            // let dr2 = de2.getBoundingClientRect();
            // let dr3 = new DOMRect();
            // dr3.width = de1.clientWidth;
            // dr3.height = de1.clientHeight;
            // // dr3.x = (dr2.left - bw1) + bw2;
            // // dr3.y = (dr2.top - bw1) + bw2;
            // let rx = bw1 - (dr2.left + bw2);
            // dr3.x = (rx < 0) ? 0 : rx;
            // let ry = bw1 - (dr2.top + bw2);
            // dr3.y = (ry < 0) ? 0 : ry;

            // console.log(dr3.width, dr3.height, dr3.left, dr3.top);
            // console.log(this.#colArr.length, this.#rowArr.length);



            const  dr2 = de2.getBoundingClientRect();

            let rw = de1.clientWidth;
            let rh = de1.clientHeight;
            let rx = bw1 - (dr2.left + bw2);
            if (rx < 0) rx = 0;
            let ry = bw1 - (dr2.top + bw2);
            if (ry < 0) ry = 0;

//             de2.innerHTML = `
// <div style="position: absolute;
//     width: ${rw}px; height: ${rh}px;
//     left: ${rx}px; top: ${ry}px;
//     background-color: rgba(165, 42, 42, 0.288);"></div>
//             `.trim();





            const trsa = [];
            let l = this.#colArr.length;
            let i = 0;
            for (let tc of this.#colArr)
            {
                let xc = i % l;
                let tx = tc.Width() * xc;
                let ty = 0;

                trsa.push(`
<div style="position: absolute;
    width: ${tc.Width()}px; height: ${tc.Height()}px;
    left: ${tx}px; top: ${ty}px;
    background-color: red;
    box-sizing: border-box;
    border: 2px solid greenyellow;"></div>
                `);

                ++i;
            }

            // console.log(trsa);

            de2.innerHTML = '';
            for (const trs of trsa)
            {
                de2.insertAdjacentHTML('beforeend', trs);
                // console.log(trs);
            }

            // return dr3;
        };

        fn_GetRenderRect();
    };


    /**
     *
     * @returns
     */
    Dispose = () =>
    {
        if (this.#dgrid === null) return;

        this.#dgrid = null;
        this.#dgbg = null;
        this.#drr.Dispose();
        this.#drr = null;
    };

}



export { hfDataGrid, hfColumnItem, hfRowItem };
