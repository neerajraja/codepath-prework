# Pre-work - _Lights and Sounds Memory Game_

**Lights and Sounds Memory Game** is a Light & Sound Memory game to apply for CodePath's Futureforce Tech Launchpad Program.

Submitted by: **Neeraj Raja**

Time spent: **11** hours spent in total

Link to project: (insert your link here, should start with https://glitch.com...)

## Required Functionality

The following **required** functionality is complete:

- [*] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
- [*] "Start" button toggles between "Start" and "Stop" when clicked.
- [*] Game buttons each light up and play a sound when clicked.
- [*] Computer plays back sequence of clues including sound and visual cue for each button
- [*] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess.
- [*] User wins the game after guessing a complete pattern
- [*] User loses the game after an incorrect guess

The following **optional** features are implemented:

- [*] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
- [*] Buttons use a pitch (frequency) other than the ones in the tutorial
- [*] More than 4 functional game buttons
- [*] Playback speeds up on each turn
- [*] Computer picks a different pattern each time the game is played
- [*] Player only loses after 3 mistakes (instead of on the first mistake)
- [*] Game button appearance change goes beyond color (e.g. add an image)
- [*] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [*] Computer randomly selects one of the 12 major scales as the game buttons.

## Video Walkthrough (GIF)
  
This GIF shows the player winning the game and starting another one. Notice the notes change.
<img src="http://g.recordit.co/ClAMKHeRVJ.gif"><br>
This GIF shows the player running out of time on a turn.
<img src="http://g.recordit.co/BSvASrc0Qc.gif"><br>
This GIF shows the player getting three strikes and losing.
<img src="http://g.recordit.co/cT5e0se256.gif">

## Reflection Questions

1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here.
   
   - <a href="https://www.w3schools.com/">www.w3schools.com</a><br>
   I used w3schools to help me with much of the JavaScript functionality in my game, such as setInterval and switch statements.
   - <a href="https://pages.mtu.edu/~suits/notefreqs.html">https://pages.mtu.edu/~suits/notefreqs.html</a><br>
   I used this website to find the frequencies for each musical note.

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words)
   
   - The biggest challenge I encountered in creating this submission occurred when I was implementing the timer. 
   I originally created a loop that called a setTimeout() every iteration to change the text on the screen every second. 
   However, when clearTimeout() was called, the countdown continued. After many efforts at debugging, I fixed this by 
   changing my repeated setTimeout() to a single setInterval() that got successfully cleared when I called 
   clearInterval() once. I also had to research and use the innerHtml() function as well as the Date.now() function 
   to continually update the time.
   
   - Another challenge I encountered was displaying the correct letter on the correct button at the correct time. 
   I originally added the "hidden" class to the letters and, similar to the start and stop buttons, I removed the class
   whenever the respective button was clicked. However, the buttons with text in them (unhidden letters) were no longer 
   in-line with the buttons with no text in them (hidden letters). To solve this, instead of actively hiding and unhiding
   the letters, I just set the font-color as well as the button backgrounds to white in my style.css page. This way, 
   the letters became effectively "hidden" against the button backgrounds, but "revealed" when the buttons change color.
   I used a case-switch block as well as innerHtml() to change the button letters each time the game started.
   

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words)
   
   - My favorite result of completing this project is that it showed me just how much more there is to learn. The reference sheets 
   I used while researching JavaScript and CSS on w3schools were all very extensive and I would like to explore them more. 
   A big question I have is: what other ways can web pages process user input other than buttons, and how can web developers
   implement code to validate user input and throw errors. I also would like to explore the best methods of implementing time
   into my web pages, especially since I struggled the most with implementing my timer. However, the biggest thing I now want 
   to know is what the source code for popular websites looks like because I can better read and understand HTML, CSS, and JavaScript 
   after completing this submission.
   
   
4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words)
   
   - Research and try to implement a better timer. Right now, it starts when the computer starts playing the clue 
   sequence; however, I wanted it to start when the computer finished playing it and was unable to figure that out.
   
   - Add an option for the user to select which scale they want to play. Right now, the computer randomly selects a scale 
   at the start of each game. I could also add different types of scales (minor scales, blues scales, pentatonic scales) which 
   would add more depth and complexity.
   
   - Experiment with the noise output and try to make the computer play a song. I could change the length of time each note 
   plays by changing the sound functions provided. Then, I could create functions that played certain songs and link 
   them to buttons with an onclick attribute.
   
   - Add a difficulty aspect where the user can select a game mode. The game could be made harder or easier several different ways, 
   including changing the time between/for each clue, removing the colors resulting in an audio-only version, or changing the number 
   of strikes.

## Interview Recording URL Link

[My 5-minute Interview Recording](your-link-here)

## License

    Copyright [Neeraj Raja]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
