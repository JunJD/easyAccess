
import {
  CellSelection,
  TableMap,
  addColumn,
  addRow,
  findCell,
} from "@tiptap/pm/tables";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import fastDeepEqual from "fast-deep-equal";
import React, { Fragment, useEffect, useRef } from "react";
import {
  TableCellDimensions,
  getTableCellDimensions,
} from "./getTableCellDimensions";
import { isCellSelection } from "./isCellSelection";
import { useMutationObserver } from "@easy-access/hooks";
import { counterId } from "@easy-access/utils";
import './../index.css'
const TableInsert = (props: { onClick: (event: React.MouseEvent) => void }) => (
  <div onClick={(e)=>{props.onClick && props.onClick(e)}}> TableInsert </div>
)

const Icon = (props: any) => (
  <div {...props}>icon</div>
)

type TableColumnEntry = {
  id: string;
  width: number;
};

type TableRowEntry = {
  id: string;
  height: number;
};

type TableDimensions = {
  structure: {
    columns: TableColumnEntry[];
    rows: TableRowEntry[];
  };
  tableCellDimensions: TableCellDimensions;
};

/*
 * get the cell-positions (relative to the parent-table) of every first cell of each row
 *
 * input:
 *   [1, 5, 9, 15, 19, 23],
 *    3
 *
 * output:
 *   [1, 15]
 */
function extractRowStartPoints(tableMap: number[], width: number): number[] {
  const rowCount = Math.ceil(tableMap.length / width);
  // rearrange array to look like rows with the cellstarts when given the width of the table
  // (as the width is equal to the length of each row => 2 rows with 3 cells => width: 3)
  // [1, 5, 9, 15, 19, 23] => [[1, 5, 9], [15, 19, 23]]
  const rows = Array.from({ length: rowCount }, (_, i) =>
    tableMap.slice(i * width, (i + 1) * width)
  );
  // only return positions of first cell of each row => [1, 15]
  return rows.map((row) => row[0]);
}

/*
 * get the cell-positions (relative to the parent-table) of every first cell of each column
 *
 * input:
 *   [1, 5, 9, 15, 19, 23],
 *    3
 *
 * output:
 *   [1, 5, 9]
 */
function extractColumnStartPoints(tableMap: number[], width: number) {
  const columnStartPoints: number[] = [];
  for (let i = 0; i < width; i++) {
    columnStartPoints.push(tableMap[i]);
  }
  return columnStartPoints;
}

export const Table = (props: any) => {
  const [rowSelected, setRowSelected] = React.useState<null | number>(null);
  const [columnSelected, setColumnSelected] = React.useState<null | number>(
    null
  );

  const [tableDimensions, setTableDimensions] = React.useState<TableDimensions>(
    {
      structure: { columns: [], rows: [] },
      tableCellDimensions: { columnWidths: [], rowHeights: [] },
    }
  );

  // example on how to expose utility functions to child components via the storage
  // props.editor.storage.table.setTableActive = setActive;

  const tableWrapperRef = useRef<HTMLDivElement>(null);

  // set to accumulate absolute position of marking elements
  let markRowTop = 0;
  let markColumnLeft = 0;

  // console.log("ROW SELECTED", rowSelected);
  // console.log("COLUMN SELECTED", columnSelected);

  const getTableInfo = () => {
    const editor = props.editor.storage.tableCell.currentEditor;
    const state = editor.view.state;
    const resolvedPos = state.doc.resolve(props.getPos());

    const table = props.node;
    const tableStart = resolvedPos.start(1);
    const tableMap = TableMap.get(table);

    return { table, tableMap, tableStart };
  };

  const getTableInsertInfo = (index: number, type: "row" | "column") => {
    const editor = props.editor.storage.tableCell.currentEditor;
    const state = editor.view.state;
    const resolvedPos = state.doc.resolve(props.getPos());

    const table = props.node;
    const tableStart = resolvedPos.start(1);
    const map = TableMap.get(table);

    const cellPos =
      type === "row"
        ? map.positionAt(index, 0, table)
        : map.positionAt(0, index, table);
    const resolvedCellPos = state.doc.resolve(tableStart + cellPos);

    const cellPositionInfo = findCell(resolvedCellPos);
    const tableRect = { ...cellPositionInfo, table, tableStart, map };
    return { tr: state.tr, tableRect, cellPositionInfo };
  };

  const getTableAddInfo = () => {
    const editor = props.editor.storage.tableCell.currentEditor;
    const state = editor.view.state;
    const resolvedPos = state.doc.resolve(props.getPos());

    const table = props.node;
    const tableStart = resolvedPos.start(1);
    const map = TableMap.get(table);

    const rowCount = map.height;
    const colCount = map.width;

    // info of last cell in table
    const cellPositionInfo = {
      left: colCount - 1,
      top: rowCount - 1,
      right: colCount,
      bottom: rowCount,
    };

    const tableRect = { ...cellPositionInfo, table, tableStart, map };
    return { tr: state.tr, tableRect, cellPositionInfo };
  };

  useMutationObserver(
    tableWrapperRef,
    () => {
      if (!tableWrapperRef.current) return;
      const dimensions = getTableCellDimensions(
        tableWrapperRef.current.children[0] as HTMLTableElement
      );
      // prevent unnecessary rerenders in case the table dimensions did not change
      if (fastDeepEqual(dimensions, tableDimensions.tableCellDimensions))
        return;
      setTableDimensions({
        tableCellDimensions: dimensions,
        structure: {
          columns: dimensions.columnWidths.map((width) => ({
            id: counterId().toString(),
            width,
          })),
          rows: dimensions.rowHeights.map((height) => ({
            id: counterId().toString(),
            height,
          })),
        },
      });
    },
    {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    }
  );

  useEffect(() => {
    props.editor.on("selectionUpdate", (params: any) => {
      const updateRowSelection = () => {
        // get the current selection
        const selection = params.editor.view.state.selection;

        // check if it is a CellSelection, otherwise return
        if (!isCellSelection(selection)) {
          setRowSelected(null);
          return;
        }

        // check if it is a RowSelection, otherwise return
        const isRowSelection = selection.isRowSelection();
        if (!isRowSelection) {
          setRowSelected(null);
          return;
        }

        // get the anchorCell out of the selection (as we now know there definitely is one)
        const { $anchorCell } = selection;

        // as we are on cell-level here we need to get the tableInfo manually
        const tableNode = selection.$anchorCell.node(-1);
        const tableMap = TableMap.get(tableNode);
        const tableStart = $anchorCell.start(-1); // tableStart is one lvl higher than Cell => -1

        // e.g. 121
        // console.log("row test start: ", tableStart);
        // map: [1, 5, 11, 15], height: 2, witdh: 2 (positions relative to table not in page context)
        // console.log("row test map: ", tableMap);
        // [1, 11] - relative position of first cells of each row
        // console.log(
        //   "row test restruct: ",
        //   extractRowStartPoints(tableMap.map, tableMap.width)
        // );

        // get all startingPoints of each row inside the table but relative to the document
        const startingPoints = extractRowStartPoints(
          tableMap.map,
          tableMap.width
        ).map((value) => value + tableStart);

        // [122, 132] => because 1 and 11 where the first cells of each row
        // console.log("row test points: ", startingPoints);
        // resolved pos of the anchorCell, e.g. {pos: 122, path: Array(9), parentOffset: 0, depth: 2}
        // console.log("row test anchorCell: ", $anchorCell);

        // check if the position of the anchorCell matches one of the row-starting points
        const rowNumber = startingPoints.indexOf($anchorCell.pos);
        if (rowNumber === -1) {
          setRowSelected(null);
        } else {
          setRowSelected(rowNumber);
        }
      };
      updateRowSelection();

      const updateColumnSelection = () => {
        // get the current selection
        const selection = params.editor.view.state.selection;

        // check if it is a CellSelection, otherwise return
        if (!isCellSelection(selection)) {
          setColumnSelected(null);
          return;
        }

        // check if it is a ColSelection, otherwise return
        const isColSelection = selection.isColSelection();
        if (!isColSelection) {
          setColumnSelected(null);
          return;
        }

        // get the anchorCell out of the selection (as we now know there definitely is one)
        const { $anchorCell } = selection;

        // as we are on cell-level here we need to get the tableInfo manually
        const tableNode = selection.$anchorCell.node(-1);
        const tableMap = TableMap.get(tableNode);
        const tableStart = $anchorCell.start(-1);

        // e.g. 121
        // console.log("col test start: ", tableStart);
        // map: [1, 5, 11, 15], height: 2, witdh: 2 (positions relative to table not in page context)
        // console.log("col test map: ", tableMap);
        // [1, 5] - relative position of first cells of each column
        // console.log(
        //   "col test extract: ",
        //   extractColumnStartPoints(tableMap.map, tableMap.width)
        // );

        // get all startingPoints of each row inside the table but relative to the document
        const startingPoints = extractColumnStartPoints(
          tableMap.map,
          tableMap.width
        ).map((value) => value + tableStart);

        // [122, 126] => because 1 and 5 where the first cells of each col
        // console.log("col test points: ", startingPoints);
        // resolved pos of the anchorCell, e.g. {pos: 126, path: Array(9), parentOffset: 4, depth: 2}
        // console.log("col test anchorCell: ", $anchorCell);

        const columnNumber = startingPoints.indexOf($anchorCell.pos);
        if (columnNumber === -1) {
          setColumnSelected(null);
        } else {
          setColumnSelected(columnNumber);
        }
      };
      updateColumnSelection();
    });
  }, [props.editor]);

  return (
    <NodeViewWrapper>
      <div ref={tableWrapperRef}>
        <NodeViewContent
          className={props.extension.options.HTMLAttributes.class}
          as="table"
        />
      </div>
      {/* <div
        onClick={() => {
          return null;
        }}
      >
        <Icon name="arrow-down-filled" /> {active ? "Active" : "Not Active"}
      </div> */}
      <div
        className="add add-column"
        onClick={() => {
          const editor = props.editor.storage.tableCell.currentEditor;
          const { tr, tableRect, cellPositionInfo } = getTableAddInfo();
          editor.view.dispatch(
            addColumn(tr, tableRect, cellPositionInfo.right)
          );
        }}
      >
        <Icon name="add-line" color="gray-600" />
      </div>
      <div
        className="add add-row"
        onClick={() => {
          const editor = props.editor.storage.tableCell.currentEditor;
          const { tr, tableRect, cellPositionInfo } = getTableAddInfo();
          editor.view.dispatch(addRow(tr, tableRect, cellPositionInfo.bottom));
        }}
      >
        <Icon name="add-line" color="gray-600" />
      </div>

      <div
        className={`mark-table ${
          rowSelected !== null && columnSelected !== null ? "active" : ""
        }`}
        onClick={() => {
          const editor = props.editor.storage.tableCell.currentEditor;
          const state = editor.view.state;

          const { tableMap, tableStart } = getTableInfo();

          const anchorPos = tableMap.map[0];
          const headPos = tableMap.map[tableMap.map.length - 1];

          const selection = new CellSelection(
            state.doc.resolve(tableStart + anchorPos),
            state.doc.resolve(tableStart + headPos)
          );
          editor.view.dispatch(state.tr.setSelection(selection));
        }}
      ></div>

      {/* insert and mark rows */}
      {tableDimensions.structure.rows.map(({ id, height }, index) => {
        markRowTop +=
          index > 0 ? tableDimensions.structure.rows[index - 1].height : 0;

        return (
          <Fragment key={id}>
            <div
              className="insert-row"
              style={{
                top: markRowTop,
              }}
              onMouseEnter={(event) => {
                let target = event.target;
                // @ts-expect-error
                let wrapper = target.closest(".table-wrapper");
                let row_line = wrapper.querySelector(".row-line");
                let offset =
                  // @ts-expect-error
                  target.getBoundingClientRect().top -
                  wrapper.getBoundingClientRect().top;

                let targetHeight = event.currentTarget.offsetHeight;

                // offset of dot + half a dot-height (16/2) - 1px as it needs to overlap the border
                row_line.style.top = `${offset + (targetHeight / 2 - 1)}px`;
                row_line.classList.remove("hidden");
              }}
              onMouseLeave={(event) => {
                let target = event.target;
                // @ts-expect-error
                let wrapper = target.closest(".table-wrapper");
                let row_line = wrapper.querySelector(".row-line");
                row_line.classList.add("hidden");
              }}
            >
              <TableInsert
                onClick={() => {
                  const editor = props.editor.storage.tableCell.currentEditor;
                  const { tr, tableRect, cellPositionInfo } =
                    getTableInsertInfo(index, "row");
                  editor.view.dispatch(
                    addRow(tr, tableRect, cellPositionInfo.top)
                  );
                }}
              />
            </div>
            <div
              className={`mark-row ${rowSelected === index ? "active" : ""}`}
              style={{
                top: markRowTop,
                height: index === 0 ? height : height - 1, // minus one border-width
              }}
              onClick={() => {
                const editor = props.editor.storage.tableCell.currentEditor;
                const state = editor.view.state;

                const { table, tableMap, tableStart } = getTableInfo();

                const cellPos = tableMap.positionAt(index, 0, table);
                const resolvedCellPos = state.doc.resolve(tableStart + cellPos);

                const rowSelection =
                  CellSelection.rowSelection(resolvedCellPos);
                editor.view.dispatch(state.tr.setSelection(rowSelection));
              }}
            ></div>
          </Fragment>
        );
      })}
      {/* mark columns */}
      {tableDimensions.structure.columns.map(({ id, width }, index) => {
        markColumnLeft +=
          index > 0 ? tableDimensions.structure.columns[index - 1].width : 0;

        return (
          <Fragment key={id}>
            <div
              className="insert-column"
              style={{
                left: markColumnLeft,
              }}
              onMouseEnter={(event) => {
                let target = event.target;
                // @ts-expect-error
                let wrapper = target.closest(".table-wrapper");
                let column_line = wrapper.querySelector(".column-line");
                let offset =
                  // @ts-expect-error
                  target.getBoundingClientRect().left -
                  wrapper.getBoundingClientRect().left;

                let targetWidth = event.currentTarget.offsetWidth;

                // offset of dot + half a dot-width (16/2) - 1px as it needs to overlap the border
                column_line.style.left = `${offset + (targetWidth / 2 - 1)}px`;
                column_line.classList.remove("hidden");
              }}
              onMouseLeave={(event) => {
                let target = event.target;
                // @ts-expect-error
                let wrapper = target.closest(".table-wrapper");
                let column_line = wrapper.querySelector(".column-line");
                column_line.classList.add("hidden");
              }}
            >
              <TableInsert
                onClick={(event) => {
                  const editor = props.editor.storage.tableCell.currentEditor;
                  const { tr, tableRect, cellPositionInfo } =
                    getTableInsertInfo(index, "column");
                  editor.view.dispatch(
                    addColumn(tr, tableRect, cellPositionInfo.left)
                  );
                  // manually remove the column line since onMouseLeave doesn't fire
                  // due a a re-render removing the elements due fresh Ids
                  let target = event.target;
                  let wrapper = (target as any).closest(".table-wrapper");
                  let column_line = wrapper.querySelector(".column-line");
                  column_line.classList.add("hidden");
                }}
              />
            </div>
            <div
              className={`mark-column ${
                columnSelected === index ? "active" : ""
              }`}
              style={{
                left: markColumnLeft,
                width: index === 0 ? width : width - 1, // minus one border-width
              }}
              onClick={() => {
                const editor = props.editor.storage.tableCell.currentEditor;
                const state = editor.view.state;

                const { table, tableMap, tableStart } = getTableInfo();

                const cellPos = tableMap.positionAt(0, index, table);
                const resolvedCellPos = state.doc.resolve(tableStart + cellPos);

                const colSelection =
                  CellSelection.colSelection(resolvedCellPos);
                editor.view.dispatch(state.tr.setSelection(colSelection));
              }}
            ></div>
          </Fragment>
        );
      })}
      <div className="row-line hidden"></div>
      <div className="column-line hidden"></div>
      <div className="table-selection hidden"></div>
    </NodeViewWrapper>
  );
};
