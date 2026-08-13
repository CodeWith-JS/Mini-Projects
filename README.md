# 1 Minimalist Digital Clock

A sleek, browser-based digital clock widget with a dynamic greeting, built as part of a daily coding challenge. 

## Features
* **12-Hour Format:** Displays time in a standard 12-hour AM/PM format using real-time system data.
* **Dynamic Greeting:** Automatically updates the greeting (Good Morning, Good Afternoon, Good Evening) based on the local time.
* **Minimalist Aesthetic:** Features a clean, dark grey UI designed for distraction-free viewing.

## Technologies Used
* HTML5
* CSS3 (Flexbox)
* Vanilla JavaScript

## How to Run
1. Download or clone these files to your local machine.
2. Locate the `DynamicClock.html` file.
3. Double-click `index.html` to open it in any modern web browser. No local server or installation is required!

<br>
<br>
----
# Random Quote Generator

A minimalist, browser-based application that serves up random quotes at the click of a button. Built as Day 2 of a daily coding challenge series.

## Features
* **Randomization Logic:** Utilizes JavaScript's `Math.random()` to dynamically select and display quotes from a custom data array.
* **Curated Content:** Pre-loaded with iconic quotes from anime series including *Attack on Titan*, *One Punch Man*, and *Chainsaw Man*.
* **Minimalist UI:** Designed with a sleek, dark grey aesthetic and smooth CSS transitions for a polished user experience.

## Technologies Used
* HTML5
* CSS3
* Vanilla JavaScript

## How to Run
1. Download or clone this repository to your local machine.
2. Locate the `RandomQuoteGen.html` file.
3. Double-click the file to open it in any modern web browser. No server setup or installation is required!

## Project Learnings
* Storing data in JavaScript arrays and objects.
* Using mathematical functions (`Math.floor` and `Math.random`) to generate random indices.
* Connecting HTML button elements to JavaScript functions using event listeners (`onclick`).

<br>
<br>
----
# 3 Car Loan Calculator

A browser-based financial calculator that computes monthly car loan payments based on vehicle price, interest rate, term length, and down payment. Built as Day 3 of a daily coding challenge series.

## Features
* **Amortization Math:** Uses standard loan calculation formulas to determine exact monthly payments.
* **Textarea Output:** Dynamically generates a clean, readable text summary of the loan breakdown inside a readonly `<textarea>` element.
* **Error Handling:** Validates user input to ensure empty or invalid fields trigger a helpful error message rather than breaking the application.
* **Minimalist UI:** Maintains the series' signature dark grey aesthetic.

## Technologies Used
* HTML5
* CSS3
* Vanilla JavaScript

## How to Run
1. Locate the `carLoanInfo.html` file.
2. Double-click the file to open it in any modern web browser. 

## Project Learnings
* Retrieving and parsing string values from HTML inputs into JavaScript numbers (`parseFloat` and `parseInt`).
* Handling conditional logic for optional inputs (like Down Payments).
* Using JavaScript Template Literals (backticks) to format multi-line strings easily.
* Displaying output inside a `<textarea>` instead of standard HTML `<div>` elements.

<br>
<br>
----
# 4 Timer

A distraction-free, browser-based Pomodoro timer designed to track 25-minute focus sessions. Built as Day 4 of a daily coding challenge series.

## Features
* **Session Management:** Standard 25-minute countdown with intuitive Start, Pause, and Reset controls.
* **Glassmorphism UI:** Features a dynamic, blurred background image with a frosted glass effect on the central timer card.
* **Bulletproof Centering:** Utilizes absolute positioning (`top: 50%`, `left: 50%`) to ensure the timer card remains perfectly centered regardless of the viewport or flexbox quirks.
* **Dynamic Tab Title:** Automatically updates the browser tab title so you can track your remaining time while working in other tabs.
* **Tabular Typography:** Utilizes CSS `font-variant-numeric: tabular-nums` to ensure the numbers remain a fixed width, preventing the layout from jittering as the seconds change.
* **State Protection:** Built-in JavaScript logic prevents users from accidentally triggering multiple overlapping intervals.

## Technologies Used
* HTML5
* CSS3
* Vanilla JavaScript

## How to Run
1. Download or clone this repository to your local machine.
2. Locate the `Timer.html` file.
3. Double-click the file to open it in any modern web browser. No server setup is required!

## Project Learnings
* Managing state variables (`isRunning`) in JavaScript to control application behavior.
* Using `setInterval()` to create loops based on real-time clock cycles, and `clearInterval()` to destroy those loops.
* Utilizing CSS pseudo-elements (`::before`) to create independent background layers for blur effects without affecting the foreground content.
* Implementing absolute positioning for foolproof vertical and horizontal centering.
