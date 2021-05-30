# OGG Explorer

This is an utility application that allows you to load a directory and display all ogg files inside it and play them. It was created from the need to have an UI for a bunch of ogg files downloaded from whatsapp web. 

The project was created with the angular cli and it's based on electron. 

# TODOs
- [ ] Recursive search over the selected directory. Show each dir as foldable element in the UI.
- [ ] Label the voice notes. Add side bar to show the labels, and display only the labeled voice notes.
- [ ] Is angular lib the best way to build main and interfaces?

## Run

Run `npm run build:start:electron` to run a dev build of the application.

## Build

Run `npm run release:electron` to bundles the application to an executable (for the current platform) and ready for distribution. The executable will be stored in the `release/` directory.

## Test

Run `npm run test:all` to run a all tests of the application.

## Want to contribute?

Take a look at the TODOs above and just create a feature branch or fork the repo and make a pull request. Other ideas and featureas are also welcome :).