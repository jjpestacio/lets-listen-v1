# Who's Djing?

Have you ever been in a situation where you're listening to music with friends? I bet you have a ton of times! This web app allows you to jam to music with friends with ease. No more walking over to your friend's phone/laptop to play a song you want to play and no more pressure for the designated DJ. 

Create a room and have your friends join. Then queue music to be played from either SoundCloud or YouTube!

## Installation

TODO: Describe the installation process

## Usage

[Here's a live demo!](http://whosdjing.herokuapp.com/)

If you would like to try the application out on your own: 

```javascript
git clone https://github.com/jjpestacio/whos-djing.git
cd whos-djing
npm install
webpack
node ./server/index.js
```

## Features

*Separate rooms
*Specify a DJ for the room who actually plays the music through his/her device
*Queue music from both SoundClound and YouTube
*Everyone in the room is in sync; everyone can see what is currently playing and what songs have been added to the queue

I decided not to use a database for this project since the data does not need to be persisted.

## Known Bugs

*Users using mobile get disconnected after some time if they are not on the web page

## Notes

I created this web app as a project to practice ReactJS, Socket.io, and web development in general. I am still a newbie in web development, so my code has anti-patterns, some of which I am aware of and some of which I am not. For those that I am aware of, I will try to fix in my future projects. I want to learn and do better.

Things I would like to do for future projects:
***Better code reuse**
- request forms could have been made to be reused
- a lot of styles were redundant (although I am not too sure on the best practices for inlining styles in React ... are they supposed to go with their respective components, all in one folder, etc.)
***Server side rendering**
***Use webpack dev server**
- webpack's watch feature and nodemon were a great help for this project though
***Keep bootstrap in mind**
- I didn't think about styling until much later in the project and I realized that bootstrap would have been a big help in laying my page out in a grid
***Spend more time designing and learn some design principles**
- I spent time initially designing how the project would look, what features I wanted, and what components I'd have, but I did not even consider UX, scalability, or anything else. I believe I would have benefited from spending more time designing the project initially. I want to learn design principles so that I know what I should focus on while designing and how to properly design.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT License
