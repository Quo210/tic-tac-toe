# tic-tac-toe
A tic-tac-toe practice program for The Odin Project course. See Read Me file for more details.

https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/tic-tac-toe 

Personal Notes:

One of the main objetives of this project is learning to use 'Modular' writing in JS. The features are:

- Modules are self contained - they have everything they need inside them.
- No global variables.
- Modules should manage only one thing. Otherwise it should be split up.
- Do not repeat yourself (DRY)
- No memory leaks
- Very few selections-selectors
- A function that lives inside an object is a *method*

(These are notes taken from the reading material provided from TOP)

CHANGELOG --

LOG_1 15/08/21 00:09pm

- Added first lines of code for the HTML and the JS
- Created first lines of modules
- Board module has
-- Generate board method that creates 9 divs inside a pre-existing HTML div and dinamically assigns them unique IDs plus a generic class to later tweak them easily.
-- Set Symbols method that checks the 'myBoard' Array and translates the content into the divs.
- Player Module has
-- Player Factory function that generates an object with the information of the player, which can be passed as arguments but in the case nothing is passed it generates one automacally based on a template.
- Changed looks of base document to be dark mode. 

LOG_2 15/08/21 21:23PM

- Created a board display to start working
- Created functions that reset board display and board array
- Created function that translates current board array to board display
- Created function that adds 'x' upon click
- Created button that resets board
- Changed listener from 'p' to use 'div' as it is larger
- Added possible sketch to check winCon
- Created the buttonModule
- Fixed several bugs that conflicted to identify source of clicks
- playerModule now has an array that stores the positions that were played, hope to use for winCon.

LOG_3 16/08/21 19:30pm

- Created logic that alternates symbol to be played by the user.
- Disabled box after inputing one play
- Reset renables all boxes
- Learned: Arrays can be compared directly with Arrays because JS uses their internal reference, not their actual content. 
- Some functions have been split to make it more modular.

