# tray-robot-test

Hi tray.io team, thanks for reading over this! The full solution is working, 
and fully tested with unit, acceptance, and QA tests.

## Dependencies

* Node.js version (ideally `4.x.x` or later)
* NPM 
* Grunt CLI

## Installation & running

1. Clone this repository
2. Run `npm install`
3. Set the `input.txt` file contents with valid input contents
4. Run `npm start`
5. The output will be logged to the console

## Tests

To run unit & acceptance tests:

```
grunt test
```

## Assumptions

* The input is always complete & valid:
  * non-zero width & height
  * co-ordinates always sit within the grid
  * directions are only `NESW`
* It's possible for big piles of dirt to be in one cell - hoovering over the cell will result in hoovering everything up


## The grid

As mentioned in the task:

* If there are X columns and Y rows, the number of cells is `X x Y`
* The bottom left cell is the original, with co-ordinates `(0, 0)`

This is slightly counter intuitive, and means that the co-ordinates are actually __one less__ 
than the number of cells along.

For example, here are the co-ordinates for each cell in a 3x4 grid:

```
| 0,3 | 1,3 | 2,3 |
| 0,2 | 1,2 | 2,2 |
| 0,1 | 1,1 | 2,0 |
| 0,0 | 1,0 | 2,0 |
```

The above is slightly counter intuitive due to the first cell being zero - but we can roll with that.
