'use strict';

const ALL_DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let table = [],
    result = '',
    solution = '',
    input,
    noTableAction = true;

export const findSimpleSolution = () => {
    result = solution = '';
    initTableCellsFromInput();
    findSolutionOfTable();
}

const findSolutionOfTable = () => {
    try {
        tryFindSimpleSolution();
        setSolution();
        result = 'We did it ! Congratulations !\n' + 'Simple!\n';
    } catch (err) {
        if (err instanceof NoCellVariantsError) {
            result = 'ERROR: input is not a sudoku\n';
        } else if (err instanceof ComplexSudokuError) {
            result = 'Too complex sudoku';
        } else {
            throw err;
        }
    }
}

const initTable = () => {
    table = [];

    for (let i = 0; i < 9; i++) {
        table[i] = [];

        for (let j = 0; j < 9; j++) {
            table[i][j] = 0;
        }
    }
}

const initTableCellsFromInput = () => {
    initTable();
    const inputRows = input.split('\n');

    table = table.map((row, i) => row.map((cell, j) => mapInputChar(inputRows[i][j])))
}

const mapInputChar = c => {
    if (+c <= 9 && +c >= 0) {
        return +c;
    } else if (c !== ' ') {
        throw 'Wrong input format';
    }
}

const tryFindSolvedCell = (str, col) => {
    const variants = getCellVariants(str, col);

    if (isMany(variants)) {
        return 0;
    }
    if (isEmpty(variants)) {
        throw new NoCellVariantsError();
    }

    return getSingle(variants);
}

const getSingle = variants => variants[0];
const isMany = variants => variants.length > 1;
const isEmpty = variants => variants.length === 0;

const getCellVariants = (str, col) => {
    let variants = [...ALL_DIGITS];
    const variantsToExclude = [
        ...getSolvedByRow(col),
        ...getSolvedByColumn(str),
        ...getSolvedBySector(str, col)
    ];
    return removeAll(variants, variantsToExclude);
}

const isNotIncluded = (array, item) => !array.includes(item);
const removeAll = (array, removingItems) => array.filter(item => isNotIncluded(removingItems, item));

const getSolvedBySector = (str, col) => {

    let variants = [];
    forEachCellInSector(str, col, (i, j) => {
        if (isSolvedCell(i, j)) {
            variants.push(table[i][j]);
        }
    });

    return variants;
}

const forEachCellInSector = (str, col, action) => {
    let mini, minj;

    if (str <= 2) {
        mini = 0;
    } else if (str <= 5) {
        mini = 3;
    } else {
        mini = 6;
    }
    if (col <= 2) {
        minj = 0;
    } else if (col <= 5) {
        minj = 3;
    } else {
        minj = 6;
    }

    for (let i = mini; i <= (mini + 2); i++) {
        for (let j = minj; j <= (minj + 2); j++) {
            action(i, j);
        }
    }
}

const getSolvedByColumn = (str) => {
    let variants = [];
    for (let j = 0; j < 9; j++) {
        if (isSolvedCell(str, j)) {
            variants.push(table[str][j]);
        }
    }
    return variants;
}

const getSolvedByRow = (col) => {
    let variants = [];
    for (let i = 0; i < 9; i++) {
        if (isSolvedCell(i, col)) {
            variants.push(table[i][col]);
        }
    }
    return variants;
}

const isSolvedCell = (str, col) => table[str][col] !== 0;
const isNotSolvedCell = (str, col) => !isSolvedCell(str, col);

const setSolution = () => {
    solution = table.reduce((accRows, row) =>
        `${accRows}${row.reduce((accCells, cell) => `${accCells}${cell}`, '')}\n`,
        ''
    );
}

const tryFindSimpleSolution = () => {
    while (true) {
        if (isSolved()) {
            return;
        }

        trySolveSudoku();
        assertActionPerformed();
    }
}

const assertActionPerformed = () => {
    if (noTableAction) {
        throw new ComplexSudokuError();
    }
}

const trySolveSudoku = () => {
    noTableAction = true;
    table.forEach((row, i) => row.forEach((cell, j) => {
        if (isNotSolvedCell(i, j)) {
            trySolveCell(i, j);
        }
    }));
}

const trySolveCell = (i, j) => {
    let solvedCell = tryFindSolvedCell(i, j);

    if (solvedCell > 0) {
        table[i][j] = solvedCell;
        noTableAction = false;
    }
}

const isSolved = () => table.every((row, i) => row.every((cell, j) => isSolvedCell(i, j)));

export const setInput = value => {
    input = value;
}

export const getResult = () => result;
export const getSolution = () => solution;

class NoCellVariantsError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class ComplexSudokuError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}