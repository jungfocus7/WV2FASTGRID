import { hfDataGrid } from "./js/__hfDataGridAll__.js";




const m_dataGrid = new hfDataGrid(document.getElementById('d_grid'));
for (let ic = 0; ic < 10; ++ic) {
    let tn = (ic + 1).toString().padStart(3, '0');
    m_dataGrid.AddColumn(`CN${tn}`, '', 100, 30);
}
for (let ir = 0; ir < 99; ++ir) {
    const ri = m_dataGrid.AddRow();
    // console.log(ri);
}
m_dataGrid.Render();












// class GridColumn {
//     constructor(colName, propName, width, height) {
//         this.#colName = colName;
//         this.#propName = propName;
//         this.#width = width;
//         this.#height = height;
//     }

//     #colName = '';
//     #propName = '';
//     #width = 70;
//     #height = 30;
// }

// const m_dataGridInfo = Object.seal({
//     columns: []
// });

// m_dataGridInfo.columns.push('xxxx');
// m_dataGridInfo.columns = null;

// console.log(m_dataGridInfo);






// const m_dr = new hfDragRound(m_dgrid, (e) => {

// });

