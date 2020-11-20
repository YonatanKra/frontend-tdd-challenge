# The Front End TDD Challenge - building a modal window TDD style

In this challenge, you will build a vanilla Javascript modal window.

## The Three Rules of TDD

1. You are not allowed to write any production code unless it is to make a failing unit test pass.
2. You are not allowed to write any more of a unit test than is sufficient to fail; and compilation failures are failures.
3. You are not allowed to write any more production code than is sufficient to pass the one failing unit test.

Which means the workflow is:

1. Write a failing test. Stop writing the test as soon as it fails.
2. Write the minimal production code required for the test to pass. Stop writing any code once the test passes.
3. Refactor the test code and the production code without altering the functionality. All tests should pass.

## Running unit tests

Run `yarn test` to execute the unit tests via [Karma](https://karma-runner.github.io/latest/index.html).

## Before you start:
* Try not to read ahead. 
* Do one task at a time. The trick is to learn to work incrementally.
* All tests should always pass, regardless of environment conditions.

## The Kata
You are tasked with developing a modal window component.
`Note: it should be easy to develop the modal as a web component, but it can also just be a stand alone service`

1. Write a Modal class
2. The modal should have an overlay area
3. The modal should have a content area
2. The overlay background color should be black with opacity (`rgba(0,0,0,0.42)`)
2. The content area should appear above the overlay (hint: parent-child elements)
2. The content area should be in the center of the screen
3. The content's background color should be white
3. The content's dimensions should be 250x250 px
4. The modal should be invisible on init
5. Create an `open` method which turns the modal visible
6. The `open` method should get a string of HTML and add it to the content area
7. Create a `close` method that turns the modal invisible

Now that the modal is ready, you get new specifications:

1. The open method should get `width` and `height` parameters and set the content's area accordingly
2. The open method should get a `background` property and set the content's area's background accordingly
3. The open method should get a `showOverlay` property and show/hide the overlay accordingly (in order to maintain backwards compatibility, the default value is true)
2. The overlay area should appear above all content of the website (hint: z-index or click test)
