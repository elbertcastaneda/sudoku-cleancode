## Extract trySolveCell

Before we move forward fixing other return codes and CQS violations, let's improve the code that has just become simpler. Let's extract this block to the function trySolveCell. Yeah, it violates CQS, but we are going to fix it in a few steps. For now, just let this block of code to be a function.

---

## Move result actions to top level function

Now we can see that inside tryFindSimpleSolution high-level things like composing the solution and print message to result mixed with more low-level things like an iteration of tries to solve cells. Let's move high-level things to findSimpleSolution function.

---

## Extract trySolveSudoku

Also let's separate a cycle of solution tries for the whole table from cells iteration by extracting a function.