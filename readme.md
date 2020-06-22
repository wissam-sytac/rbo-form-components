# Rbo Form Components

## Introduction
This document provides the details pertaining to our enclosed technical solution.

I hope you have as much fun reviewing it as I did building and delivering it for you!

## Budget
roughly 10hours

Breakdown:
- 4 hours: exploring StencilJS, web components spec, CSS variables.
- 5 hours: implementation
- 1 hour: documentation

## Technical Solution
Our solution was designed from a component-based perspective, with minor shortcuts taken due to time budget restrictions.

#### Components

Form component:
- encapsulates the logic for capturing values from the enclosed input fields.
- listens for errors from child inputs and prevents form submissions if any errors are detected
- intercepts the form submission events, and emits the `formSubmittedEvent` event.

Currency Input component:
- Collects values from two separate text inputs and calculates a single float number which is then communicated upsteam to the parent form.

Button component:
- Wrapper component around browser-native button.

#### Global styles / variables
As recommnded by the StencilJS team, we've declared our theming css variables in this file:
```
src/global/variables.css
```

## Example usage:
```html
<rbo-form>
  <rbo-currency-input name="downPayment" required="true"></rbo-currency-input>
</rbo-form>

<script>
const rboForm = document.querySelector('rbo-form');
rboForm.addEventListener('formSubmittedEvent', function(evt) {
  const inputValues = evt.detail.values;
  // Send API request...
})
</script>
```

## The Stack
As per the assignment instructions, we've opted for StencilJS to spin up and package our Web Components.

## Local Development
#### Prerequisites
Make sure that Node and npm are installed on your machine.

#### Install dependencies
```
npm i
```

#### Dev server
```
npm start
```

#### Tests
```
npm t
```

## Improvements
- Since the currency input component can be repurposed to any decimal number type of input, it probably would have made more sense to 
name it as "decimal input".