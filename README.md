## Extract trySolveCell

Before we move forward fixing other return codes and CQS (**C**ommand **Q**uery **S**eparation) violations, let's improve the code that has just become simpler. Let's extract this block to the function trySolveCell. Yeah, it violates CQS, but we are going to fix it in a few steps. For now, just let this block of code to be a function.

---

## Move result actions to top level function

Now we can see that inside tryFindSimpleSolution high-level things like composing the solution and print message to result mixed with more low-level things like an iteration of tries to solve cells. Let's move high-level things to findSimpleSolution function.

---

## Extract trySolveSudoku

Also let's separate a cycle of solution tries for the whole table from cells iteration by extracting a function.

---

## Introduce ComplexSudokuError

Ok, another return code can be replaced with an error. If the program cannot do anything with a table, then it should exit with a message that sudoku is too complex. Here we can introduce ComplexSudokuError instead of the return code. Comments are not needed anymore.

---

## Missing Rename

Oops, retCode is not a return code anymore. It is some kind of solvedCell now.

---

## How to fix the problem?

Ok, now let's think about functions trySolveCell and trySolveSudoku. There is a CQS violation. This functions try to do actions and return boolean in order to inform a caller whether there is performed an action or not. Moreover, these flags do not make the code readable and easy to understand. How can we solve it? The very first idea is - exception. But what exception? We might create two exceptions: "NoCellActionException" and "NoTableActionException". But in this case, stuff with unreadable flags will become even worse.

Another solution - "SolvedCellException". But throwing an exception on a case which is not exceptional at all won't make the code readable.

Any other ideas? Think yourself before going to the next page.

---

## Introduce noTableAction flag

What if instead of different flags passed through our functions we will have one module level flag - noTableAction. We can set it to true before each trying to solve sudoku, and set to false after each time we solve some cell. And now we can remove other flags.

---

## Extract Small functions

Good job so far.

Now we can go through all the code once again and make it really readable by extracting small functions with explanatory names.

This try-catch block can be a separate function on anther abstraction layer. And BTW, it is a good idea to rename this function according to the name of new function below.

This block just begging to be extracted to a separate function getCellVariants. Also, tiny functions like getSingle, isMany, isEmpty and removeAll can increase readability by covering some low-level details.

The block table[i][j] != 0 is repeating in the code and also should be a low level small function isSolvedCell. Whereas table[i][j] == 0 - should be isNotSolvedCell which is just invert of isSolvedCell.

This block also does a separate thing on a separate abstraction layer, let's extract it to assertActionPerformed.

---

## DRY

We can see in the code very interesting DRY violation: this block

```
for (int i = 0; i < 9; i++)
    for (int j = 0; j < 9; j++)
        ...
        ...
```
is repeated all the time in the code: lines `35-38`, `141-142` and `168-169`.

---

## Functional style

In order to fix it we can use functional style and iterate table in a more meaningful way. isSolved function checks whether every cell in every row is solved.

setSolution function reduces rows and cells into a string.

initTableCellsFromInput function maps input characters into a table's digits and initializes two dimensional array table. Let's move initialization and mapping to a separate functions.

trySolveSudoku function iterates over each row and cell.

---

## Extract forEachCellInSector function

Sector iteration can be extracted to forEachCellInSector function which makes the code more readable.

Seems like this is the last piece of code that has to be fixed. This function collects all solved cells in the sector. In order to do this, we have to know border indexes to iterate for vertical and horizontal dimensions.

---

## Remove max indexes

Now let's finally do something with this ugly block. There is also a DRY violation. This and this blocks are pretty much the same. But we cannot extract a function because the function cannot return 2 things. Wait a minute, do we actually need maxi and maxj? We can always calculate it by adding 2 to the mini or minj.

---

## Extract getStartSectorIndex

Now we can extract a function. It's easy.

---

## Readable names

Now let's add good names for our variables. Magic numbers can be readable constants. mini and minj can be rowStart and columnStart.

---

## The last Magic Number

9 is another one magic number in our code. It should be the constant.