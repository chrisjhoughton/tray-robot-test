# tray-robot-test

## Assumptions

* The input is always complete & valid:
  * non-zero width & height
  * co-ordinates always sit within the grid
  * directions are only `NESW`


## The grid

As mentioned in the task:

* If there are X columns and Y rows, the number of cells is X x Y
* The bottom left cell is the original, with co-ordinates (0, 0)

This is slightly counter intuitive, and means that the co-ordinates are actually __one less__ 
than the number of cells along.

For example, with a 3x4 grid:

```
| 0,3 | 1,3 | 2,3 |
| 0,2 | 1,2 | 2,2 |
| 0,1 | 1,1 | 2,0 |
| 0,0 | 1,0 | 2,0 |
```

The above is slightly counter intuitive due to the first cell being zero - but we can roll with that.
