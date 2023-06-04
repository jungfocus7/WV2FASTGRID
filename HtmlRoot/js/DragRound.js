const _MouseMove = 'mousemove';
const _Blur = 'blur';
const _MouseUp = 'mouseup';
const _MouseDown = 'mousedown';
const _Resize = 'resize';
const _Scroll = 'scroll';



class DragRound {
    constructor(dgrid, cbf) {
        this.#m_cbf = cbf;
        this.#m_dgrid = dgrid;
        window.addEventListener(_MouseDown, this.#fn_MouseDown);
        window.addEventListener(_Resize, this.#fn_Resize);
        this.#m_dgrid.addEventListener(_Scroll, this.#fn_Scroll);
        Object.freeze(this);
    }

    #m_dgrid = null;    //Grid DIV
    #m_cbf = null;      //Callback Function

    #m_bmd = false;     //Bool MouseDown
    #m_dx = 0;          //MouseDown X
    #m_dy = 0;          //MouseDown Y
    #m_sl = 0;          //Scroll Left
    #m_st = 0;          //Scroll Top


    #fn_MouseMove = (e) => {
        // console.log(_MouseMove, e);
        if (this.#m_bmd === false) return;

        let lx = this.#m_dx - e.x;
        let ly = this.#m_dy - e.y;
        // console.log(lx, ly);
        let sl = this.#m_sl + lx;
        let st = this.#m_st + ly;
        // console.log(sl, st);
        this.#m_dgrid.scroll(sl, st);

        this.#m_cbf?.(e);
    };


    #fn_MouseUp = (e) => {
        // console.log(_MouseUp, e);
        if (this.#m_bmd === false) return;

        window.removeEventListener(_MouseMove, this.#fn_MouseMove);
        window.removeEventListener(_MouseUp, this.#fn_MouseUp);
        window.removeEventListener(_Blur, this.#fn_MouseUp);
        this.#m_bmd = false;

        // let sl = this.#m_dgrid.scrollLeft;
        // let st = this.#m_dgrid.scrollTop;
        // console.log(sl, st);

        this.#m_cbf?.(e);
    };


    #fn_MouseDown = (e) => {
        // console.log(_MouseDown, e);
        if (e.button === 0) {
            if (this.#m_bmd === true) return;

            window.addEventListener(_MouseMove, this.#fn_MouseMove);
            window.addEventListener(_MouseUp, this.#fn_MouseUp);
            window.addEventListener(_Blur, this.#fn_MouseUp);
            this.#m_bmd = true;

            this.#m_dx = e.x;
            this.#m_dy = e.y;
            // console.log(this.#m_dx, this.#m_dy);
            this.#m_sl = this.#m_dgrid.scrollLeft;
            this.#m_st = this.#m_dgrid.scrollTop;
            // console.log(this.#m_sl, this.#m_st);

            this.#m_cbf?.(e);
            this.#fn_MouseMove(e);
        }
    };


    #fn_Resize = (e) => {
        if (e !== null)
            this.#m_cbf?.(e);
    };


    #fn_Scroll = (e) => {
        if (e !== null)
            this.#m_cbf?.(e);
    };



    Dispose = () => {
        this.#fn_MouseUp();
        window.removeEventListener(_MouseDown, this.#fn_MouseDown);
        window.removeEventListener(_Resize, this.#fn_Resize);
        this.#m_dgrid.removeEventListener(_Scroll, this.#fn_Scroll);
        this.#m_dgrid = null;
        this.#m_cbf = null;
    };

}

export {
    _MouseMove, _Blur, _MouseUp, _MouseDown, _Resize, _Scroll,
    DragRound
};
