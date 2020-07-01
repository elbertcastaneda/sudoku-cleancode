'use strict';

const ALL_DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let array = [],
    result = '',
    solution = '',
    input;

export const findSimpleSolution = () => {
    result = solution = '';
    initCellsFromInput();
    const r = mainCycle();
    if (r === 0) {
        result = 'We did it ! Congratulations !\n' + 'Simple!\n';
    }
    if (r === -2) {
        result = 'Too complex sudoku';
    }
}

const initCellsFromInput = () => {
    array = [];
    const rows = input.split('\n');

    for (let i = 0; i < 9; i++) {
        array[i] = [];

        for (let j = 0; j < 9; j++) {
            const c = rows[i][j];

            if (c === ' ') {
                array[i][j] = 0;
            } else if (+c <= 9 && +c >= 0) {
                array[i][j] = +c;
            } else {
                throw 'Wrong input format';
            }
        }
    }
}

/**
 * Verify variants of the cell
 * if single variant is left -- it is a solution,  return it
 * if more then 1 variant -  return 0 (no solution yet)
 * if no variants -- error, return "-1"
 */
const checkMe = (str, col) => {
    let variants = [...ALL_DIGITS];
    const variantsToExclude = [
        ...getSolvedByRow(col),
        ...getSolvedByColumn(str),
        ...getSolvedBySector(str, col)
    ];

    variants = variants.filter(variant => !variantsToExclude.includes(variant));

    if (variants.length > 1) {
        return 0;
    }
    if (variants.length === 0) {
        return -1;
    }
    return array[str][col] = variants[0];
}

const getSolvedBySector = (str, col) => {
    let mini, maxi, minj, maxj;
    let variants = [];

    if (str <= 2) {
        mini = 0;
        maxi = 2;
    } else if (str <= 5) {
        mini = 3;
        maxi = 5;
    } else {
        mini = 6;
        maxi = 8;
    }
    if (col <= 2) {
        minj = 0;
        maxj = 2;
    } else if (col <= 5) {
        minj = 3;
        maxj = 5;
    } else {
        minj = 6;
        maxj = 8;
    }

    for (let i = mini; i <= maxi; i++) {
        for (let j = minj; j <= maxj; j++) {
            if (array[i][j] !== 0) {
                variants.push(array[i][j]);
            }
        }
    }
    return variants;
}

const getSolvedByColumn = (str) => {
   let variants = [];
    for (let j = 0; j < 9; j++) {
        if (array[str][j] !== 0) {
            variants.push(array[str][j]);
        }
    }
    return variants;
}

const getSolvedByRow = (col) => {
    let variants = [];
    for (let i = 0; i < 9; i++) {
        if (array[i][col] !== 0) {
            variants.push(array[i][col]);
        }
    }
    return variants;
}

const show = () => {
    let s = '';
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            s += array[i][j];
        }
        s += '\n';
    }
    solution = s;
}

/**
 * Return 0 - solved
 * ret -1 -- error
 * ret -2 -- cannot resolve
 */
const mainCycle = () => {
    for (; ; ) {
        if (isSolved()) {
            show();
            return 0;
        }

        let isNotPerformedAction = true;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {

                let retCode = 0;
                let isCellActionPerformed = false;
                if (array[i][j] === 0) {
                    retCode = checkMe(i, j);
                    if (retCode > 0) {  // cell was solved
                        isCellActionPerformed = true;
                    }
                }
                if (retCode === -1) {
                    result = 'ERROR: input is not a sudoku\n';
                    return -1;
                }
                if (isCellActionPerformed) {
                    isNotPerformedAction = false;
                }

            }
        }

        if (isNotPerformedAction) {  // no action for whole table of cells
            return -2;
        }

    }
}

const isSolved = () => {
    let isSolved = true;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (array[i][j] === 0) {
                isSolved = false;
            }
        }
    }
    return isSolved;
}

export const setInput = value => {
    input = value;
}

export const getResult = () => result;
export const getSolution = () => solution;