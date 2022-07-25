# Colors in Space 

### Background 
An interactive visual and auditory experience where players control a comet streaking across space, colliding into planets in spectacular splashes of color and light, navigating the gravity and orbits of other celestial bodies while slowing growing and drawing more objects into its own orbit. The intent of this isn't to provide a challenging or competitive game experience, but something relaxing and visually pleasing with tactile appeal. 

***

### Functionality and MVPs
In Colors in Space, users will be able to:
- Use cursor input to move around a 'Comet', with fine control of velocity
- Navigate a randomly generated and limitless space filled with celestial bodies. They will be able to pause and reset the field 
- Intereact with other celestial bodies using the Comet they controlled
    * **Gravitational Pull**: Celestial bodies will exert forces based on mass. The player comet will also draw objects into its orbit, and gain mass as it grows 
    * **Impacts**: On impacts, Celestial bodies will react in a visually satisfying manner
    * **Destruction**: Comets can destroy planetoids, growing in mass and creating visual spectacles and showers of smaller asteroids which will be subject to gravitational forces 

In addition, this project will include: 
- An about modal describing the background and controls for the experience
- A production README


***

### Technologies, Libraries, and APIs
As of now, the project only uses basic canvas functionality. But as the project grows in complexity, I'd like to take a look at libraries that simplify vector match for when I implement gravity motion, since the math for that can be quite complex. Paper.js showcased some visual applications that would be super cool to incorporate for more interesting kinetics. I'd also like to experiment with 3JS and see if I can incorporate it somehow into a more 2.5D visual experience. A stretch goal is the implementation of music input to alter the color gradients and kinetics of the game objects, which would also require a library to parse audio input for BPM, pitch, etc. 

***

### Implementation Timeline
My overall goals for the project involve the implementation of the following features
- Responsive and enjoyable movement based on cursor position input 
- A dynamic camera that drags behind the player based on the Comet velocity for optimal game feel
- Robust and responsive gravity physics to interacting with celestial bodies and asteroids 
- Seamless map generation so that players can fly in any direction and find stuff to interact with, including different types of "Solar Systems" with different presets. 
- Effecient garbage Collection to keep performance costs low 
- Impressive visual spectacle for planetoids based around trails and potentially other properties from APIs (Paper.js is what i'm looking at)

#### My timeline is as follows
- **Friday & Weekend**: Refactor the project so far to fit our setup guildeines. Dig into the various libraries I'm interested in and gauge the difficulty and time investment necessary to achieve some of my stretch goals. I also want to create a functional prototype of cursor-input movement, gravity physics, and dynamic camera movement. 
- **Monday**: Get basic map generation functionality in place and tweak the camera accordingly to allow for seamless, unbounded movement on the 2D plane
- **Tuesday / Wednesday / Thursday**: Once I have the above in place, the rest of my time is going to be an intensely iterative process of tweaking the following: 
   * player movement and camera to have the best game feel possible. Responsiveness and sense of motion are the most important factors 
   * the visual and auditory effects for planets, celestial bodies, and impacts and explosions. These will be the main jolts of dopemine the game is meant to provide, and the visuals can always be scaled and tweaked
   * gravity physics to tow the line between being engaging to navigate with the player object without being frustrating. It should also lead to visual spectacles which will require a lot of fine tuning to make sure the celestial bodies and their orbiting objects behave as intended. 

***

## Bonus Features
A stretch goal is implementing audio input (via video links or uploads) where sound will change the color gradients and pace of kinetic elements in the visualizer.

In addition, due to the nature of this project it will be possible to scale the visual spectacle up with more time.

One other idea is to make it a full page application where the 'camera' view is as large as the browser window.
