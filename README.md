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