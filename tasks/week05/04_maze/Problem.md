
# Maze

You have been tasked with writing a maze game and solver, this maze solver will be reading in a 2D grid of symbols from a file that will 

You have been tasked with reading in a grid that will have the following symbols


* `'0'` - This character is considered the player, there should only be one of these when rendering the board.

* `'X'` - This character is considered a wall and should

* `'S'` - This is the starting space in the maze. From this location, your maze solver will need to find the exit.

* `'E'` - This is the exit/endpoint of the maze.

* `' '` - With whitespace, this is considered traversable by the player but has been seen.

* `'#'` - It is not known if this is traversable or not, it reveals itself as an adjacent space as `' '` or `'X'`.


## Maze Description

The maze's are described using strings with each row ended by a new line. Below is an example of a maze that your game will load.

```
XXXXXXXXXXXXX\n
S         X X\n
 X X   X  X X\n
 X XX  X X  X\n
   XXX      X\n
XX     XXX  X\n
XXXXXXXXXXXEX\n
```

The above maze outlines all symbols except for: `'0'` for the player and `'#'` which outlines fog, those two symbols are only available during gameplay.

When the game is being played, the `'0'` and `'#'` will be used. In the initial state of the game, the board will look like this:


```
X############
0 ###########
 ############
#############
#############
#############
#############
```

In the initial state, you will notice that the board is mostly covered with `'#'`. This is because the player has not made much of a move outside of their starting point.

The player can try to move:

* `NORTH` - Will move the player north of the board, if it is traversable.

* `EAST` - Will move the player east of the board, if it is traversable.

* `SOUTH` - Will move the player south of the board, if it is traversable.

* `WEST` - Will move the player west of the board, if it is traversable.



## Maze Solver

This is where you get to cheat! Instead of playing the game, you get to make the computer play it for you and solve it (or find that it can't be solved).

Time to apply a BFS and discover the routes that can lead to an exit.

Consider each adjacent space to be a connection/edge. If the adjacent space is a `' '` or `'E'`, then this space should be factored into the route, if the space is a `'X'`, this space should be ignored as it is a wall. 

Your solver should be able to find all paths that reach the end the quickest.

You will need to implement the following:

* `WithLevel`

## How to test

You can test your program but running `npm test`, if you encounter an error, make sure you have installed the dependencies with `npm install`.
