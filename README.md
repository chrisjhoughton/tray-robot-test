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
  * All key lines are added
* It's possible for big piles of dirt to be in one cell - hoovering over the cell will result in hoovering everything up
* The grid is structured as below - meaning the hoover takes up the space of one cell, rather than a single point 

### The grid

As mentioned in the task:

* A room that has dimensions X: 5 and Y: 5 has 5 columns and 5 rows, so 25 possible hoover positions
* The bottom left corner is the point of origin for our coordinate system, with co-ordinates `(0,0)`

This is slightly counter intuitive, and means that the max co-ordinate on each axis are actually __one less__ 
than the number of cells. (In a 5x5 grid, there are 25 possible positions, which means there are 5 co-ordinates on each axis: 0-4, 0-4)

For example, here are the co-ordinates for each cell in a 5x4 grid:

```
| 0,3 | 1,3 | 2,3 | 3,3 | 4,3 |
| 0,2 | 1,2 | 2,2 | 3,2 | 4,2 |
| 0,1 | 1,1 | 2,1 | 3,1 | 4,1 |
| 0,0 | 1,0 | 2,0 | 3,0 | 4,0 |
```

The above is slightly counter intuitive due to the first cell being zero. It also means that when the 
hoover gets to the `4,y` and `x,3` co-ordinates that they've reached the edge of the room.
