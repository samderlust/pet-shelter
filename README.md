# Pet Shelter API

## Overview

This is a web service API that provides info about pets.
Create and retrieve information of pets

### -GET: https://pet-shelter-samderlust.herokuapp.com/api/pets

- retrive list of pets

### -POST: https://pet-shelter-samderlust.herokuapp.com/api/pet

- post a new pet
- sample body
  <pre>{
      "name": "milu",
      "breed": "get",
      "type": "dog",
      "location": "ottawa",
      "latitude": 45.2487862,
      "longitude": -76.3606792
  }<pre>

### -GET: https://pet-shelter-samderlust.herokuapp.com/api/pet/:id

- retrive a specific pet based on the ID

## Set up in Local host

- git checkout at https://github.com/samderlust/pet-shelter.git
- yarn add to install all the dependencies
- yarn start to run on localmachine

## Testing

- run "yarn test" for tesing

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3031](http://localhost:3031) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
