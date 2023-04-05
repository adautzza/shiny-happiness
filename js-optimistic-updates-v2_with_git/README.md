# Meister JavaScript Challenge

## App Overview

Our App primarily shows a list of "persons" - each person is an object containing `id` and `name` properties.

You are able to create new entries by clicking on the "Create Person" button and you are able to rename each person, after clicking the respective "Save Name" buttons.

The App features "optimistic updates", meaning that we do not wait for responses from our Server, but rather display the results immediately. When any response does arrive later on, we patch the Client state as necessary.

## Commands & Structure

After installing dependencies, running `npm run start` starts an instance of an express nodejs server at `localhost:3000`. The app has the following routes:
- `/app` - Serves the client UI as a html response, a react app bundled by esbuild
- `/persons` - An endpoint which accepts GET, POST, PATCH requests for fetching and modifying persons on the server & returns a json response
- `/reset` - An endpoint which resets the server state with a POST request

You may also notice a `npm run test` command in the `package.json` file, `playwright` as a dev dependency & `data-test-...` attributes on some elements. These are used for evaluating the challenge solution together with test files (in the `/tests` directory) which may be included.
- If the test files are included please feel free to use the test suite to help guide your solution
- If the test files are not included please ignore and leave the included test code intact with your submission.

The most relevant folders are
- `/server` - Code for the server, which you **should not modify** but may look at to determine behavior
- `/client` - Code for the client react app, you will need to modify this code to complete the challenge

## Issues

Here are the issues you need to find solutions for:

- [] In the current implementation, creating a new person will result with two persons being displayed on the Client

- [] Editing the name of person that has not been persisted on the Server yet (editing their name very shortly after creation) will result with a new person being created

- [] Editing the name of a person multiple times in quick succession may result with a random name ending up on the Client, due to the latency

- [] Editing the name of a person multiple times in quick succession, for example once to "123" and then to "456", will result with the App showing "456", then as the response for the first request arrives "123", later on again "456" for the second request - we want to show only the last version the user has submitted

## Rules / Notes

- Your solution should work in the case where there could be multiple client instances communicating with a single server instance at the same time

- Do not block user interactions. It must be possible to edit persons and create new persons at all times, regardless of pending server requests. Optimistic updates must remain intact!

- Do not modify the server code, you will not always have the luxury of being able to do so in a real world scenario

- The client app behaving correctly for the user should not come at the cost of bad data being stored on the server. Treat the server data store like an actual database that has to be kept clean

- You are free to pick your weapons of choice, for example if you do not feel comfortable with React, want to solve the issue with Redux, or want to use other tooling

- Please follow the prevailing syntax and don't reformat the existing challenge code with new linting rules (e.g. indentation, line-splitting)

- If you wish, you can modify the UI and styling

- We will be testing your submission in Chrome, don't worry about other browsers

- You are free to ask us any questions you might have

- Please make sure to not include `node_modules` with your submission

Good luck! :)