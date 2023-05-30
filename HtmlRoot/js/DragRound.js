const _MouseMove = 'mousemove';
const _Blur = 'blur';
const _MouseUp = 'mouseup';
const _MouseDown = 'mousedown';


class DragRound {
    constructor(dnm) {
        this.#m_dgrid = document.getElementById(dnm);

        this.#m_dx = 0;
        this.#m_dy = 0;

        this.#m_sl = 0;
        this.#m_st = 0;

        window.addEventListener(_MouseDown, this.#fn_MouseDown);
        Object.freeze(this);
    }

    #m_dgrid = null;

    #m_dx = 0;
    #m_dy = 0;

    #m_sl = 0;
    #m_st = 0;


    #fn_MouseMove = (e) => {
        // console.log(_MouseMove);
        // console.log(e);

        let lx = this.#m_dx - e.x;
        let ly = this.#m_dy - e.y;
        // console.log(lx, ly);

        let sl = this.#m_sl + lx;
        let st = this.#m_st + ly;
        // console.log(sl, st);

        this.#m_dgrid.scroll(sl, st);
    };


    #fn_MouseUp = (e) => {
        // console.log(_MouseUp);

        window.removeEventListener(_MouseMove, this.#fn_MouseMove);
        window.removeEventListener(_MouseUp, this.#fn_MouseUp);
        window.removeEventListener(_Blur, this.#fn_MouseUp);

        // let sl = this.#m_dgrid.scrollLeft;
        // let st = this.#m_dgrid.scrollTop;
        // console.log(sl, st);
    };


    #fn_MouseDown = (e) => {
        // console.log(_MouseDown);

        if (e.button === 0) {
            window.addEventListener(_MouseMove, this.#fn_MouseMove);
            window.addEventListener(_MouseUp, this.#fn_MouseUp);
            window.addEventListener(_Blur, this.#fn_MouseUp);

            this.#m_dx = e.x;
            this.#m_dy = e.y;
            // console.log(this.#m_dx, this.#m_dy);
            // console.log(this);

            this.#m_sl = this.#m_dgrid.scrollLeft;
            this.#m_st = this.#m_dgrid.scrollTop;

            this.#fn_MouseMove(e);
        }
    };



    Dispose = () => {
        this.#fn_MouseUp();
        window.removeEventListener(_MouseDown, this.#fn_MouseDown);
        this.#m_dgrid = null;
    };

}

export { DragRound };