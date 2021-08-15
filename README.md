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

# 1 15/08/21 00:09pm

- Added first lines of code for the HTML and the JS
- Created first lines of modules
- Board module has
-- Generate board method that creates 9 divs inside a pre-existing HTML div and dinamically assigns them unique IDs plus a generic class to later tweak them easily.
-- Set Symbols method that checks the 'myBoard' Array and translates the content into the divs.
- Player Module has
-- Player Factory function that generates an object with the information of the player, which can be passed as arguments but in the case nothing is passed it generates one automacally based on a template.
- Changed looks of base document to be dark mode. 
