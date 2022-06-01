This is a difficult project that I am undertaking. Here are the following goals and tasks necessary to achieve them.


### Easy
These goals are simple and I should be able to implement them in a half an hour or less 
      - **Cursor Input**: Most of this functionality is provided by Paper.js
      - **Bounds**: A simple google search should be able to tell me how to set the bounds of this 'game' to the max browser width and height
      - **GUI**: There will be sparse GUI elements necessary; a floating title card perhaps, very brief floating instructions 

### Medium
These goals are challenging but quite reasonable to implement in a short time frame. 
      - **Gravity**: The basic logic as to how various bodies will interact and exert force on one another has already been covered in other projects. I'll need to dissect them and figure out how to implement it in this game. 
            - Look through bereft.yyz to investigate how they handled gravity in their game 
            - Implement a basic gravity 
      - **Map-Generation**: The player should be unbounded in their movement, and so there should be a solution to make sure the player never runs out of content to interact with. Either the map should wrap and elements should spawn in periodically off screen or when the player goes off bounds all the previous elements should be deleted and a new solar system generated
      - **Camera Movement**: To support the feeling of motion, the camera should have it's own velocity and position independent of the player and follow their movements with slight lag. Examples of this should be found in my game maker studio projects. 

### Hard
These goals are going to be difficult to achieve in the short time frame, but possible with hard work
      - **Game Feel**: An intangible yet tactile quality; playing the game should be inherently enjoyable and satisfying. This is the hardest to pin down and we should set up gravity and player movement in such a way to tinker with these variables 


### Tasks
- Implement Cursor Movement
- Implement Window Bounds 
- Implement "Universe" game object that holds Solar Systems 
- Deeply investigate yyz projects for the following
      - Gravity Physics and logic 
      - Camera movement 
