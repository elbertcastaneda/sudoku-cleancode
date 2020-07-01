import { assert } from 'chai';

import { setInput, getResult, getSolution, findSimpleSolution } from 'Sudoku';

describe('findSimpleSolution', () => {
    it('should not solve complex sudoku', () => {
        setInput(
            '  53     \n' +
            '8      2 \n' +
            ' 7  1 5  \n' +
            '4    53  \n' +
            ' 1  7   6\n' +
            '  32   8 \n' +
            ' 6 5    9\n' +
            '  4    3 \n' +
            '     97  '
        );
        findSimpleSolution();

        assert.strictEqual(getResult(), 'Too complex sudoku');
        assert.strictEqual(getSolution(), '');
    });

    it('should solve simple sudoku', () => {
        setInput(
            '2  5  8 3\n' +
            '  6      \n' +
            '51   2 49\n' +
            '46    9 5\n' +
            '   1 3   \n' +
            ' 21     7\n' +
            ' 3 4   62\n' +
            '   3  5  \n' +
            '6 7  8  4'
        );
        findSimpleSolution();

        const expectedSolution =
            '294561873\n' +
            '376849251\n' +
            '518732649\n' +
            '463287915\n' +
            '785193426\n' +
            '921654387\n' +
            '839415762\n' +
            '142376598\n' +
            '657928134\n';

        assert.strictEqual(getResult(), 'We did it ! Congratulations !\nSimple!\n');
        assert.strictEqual(getSolution(), expectedSolution);
    });

    it('should not solve more complex sudoku', () => {
        setInput(
            '   5  8 3\n' +
            '3768492 1\n' +
            '       4 \n' +
            ' 6      5\n' +
            '   1 3   \n' +
            ' 2       \n' +
            '   4     \n' +
            '      5  \n' +
            '6    8  4'
        );
        findSimpleSolution();

        assert.strictEqual(getResult(), 'Too complex sudoku');
        assert.strictEqual(getSolution(), '');
    });

    it('should print error when sudoku is wrong', () => {
        setInput(
            '1  5  8 3\n' +
            '  6 49   \n' +
            '51   2 49\n' +
            '46    915\n' +
            '   1 3   \n' +
            '921    87\n' +
            '83 4   62\n' +
            '   37 5  \n' +
            '6 7  8  4'
        );
        findSimpleSolution();

        assert.strictEqual(getResult(), 'ERROR: input is not a sudoku\n');
        assert.strictEqual(getSolution(), '');
    });

    it('should trow exception when input contains not digits or spaces', () => {
        setInput('1  5  8 3\n' + 'tk6 49   \n');

        assert.throw(findSimpleSolution, 'Wrong input format');
    });

    it('should trow exception when not enough input', () => {
        setInput('1  5  8 3\n' + '  6 49   \n');

        assert.throw(findSimpleSolution, 'Wrong input format');
    });
});