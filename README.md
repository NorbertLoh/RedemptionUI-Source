<p align="center">
  <img src="./readme/present.png" alt="react" />
</p>

# Redemption System
## This is a system built using React, NestJS and PostgresSQL for Govtech's take-home assignment.

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react" alt="react" />
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs" alt="GitHub repo size" />
  <img src="https://img.shields.io/badge/Cypress-69D3A7?style=for-the-badge&logo=" alt="GitHub issues" />
  <img src="https://img.shields.io/badge/PostgresSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="GitHub issues" />
</p>

<p align="center">
  <img src="./readme/website.png" alt="react" />
  <h1 align="center"><a href="https://norbertloh.github.io/RedemptionUI/">Live Demo Here!</a></h1>
</p>




## Technologies Used
* **Frontend**: React single page application
* **Frontend Testing**: Cypress
* **Backend**: NestJS for REST API
* **Database**: PostgreSQL for data storage

## Motivation Behind the Design
Initially, I was considering creating a simple program that reads the CSV and allows users to perform actions through the terminal and then write the redemption data in another CSV file. However, I decided that it would not be scalable as the program can only be used on the computer where the program is stored. Similarly, if the system is used during an event where many people might be redeeming things, we cannot have multiple redemption counters.

So I thought, what if I created an interface with React and stored the redemption data in Google Firebase / MongoDB? This brings up another issue where all the storing logic will be stored in the React front-end. Storing application logic in the front-end is also unsafe as it exposes to potential attacks about the system and data model.

Therefore, I concluded that the best way to do this is to separate the client and server. Therefore, the client will only be in charge of serving the information in an interface to the user, and the server will handle all the business logic.

## Architechture
<p align="center">
    <img src="./readme/arch.drawio.png" alt="architecture image">
</p>

### React
React was chosen for its ability to create Single Page Applications (SPAs), allowing for data and UI updates without full page reloads. TypeScript was used to handle all the API calls within each component.

### NestJS
I used NestJS during my GIC internship previously and absolutely fell in love with it. NestJS is built on top of express and provides a given structure and guidelines. Furthermore, since Typescript is a strongly typed programming language, NestJS was the perfect choice as it comes loaded with many safety features. One such feature is ensuring information recieved matches the type defined.

### PostgresSQL
Initially I started with MySQL as it was one of the more common databases. However, I wanted to host the website so that you will be able to interact with it without having to download everything. Since I found a free provider that allows me to host my web service with their PostgresSQL for free, I decided to move to PostgresSQL

## Set up
If you would like to view the code in the machine,
1. Clone the repository
2. Install the dependencies using `npm install`
3. Change `config.ts` accordingly
    ```TSX
    const config = {
        API_BASE_URL: 'YOUR_API_BASE_URL',
        BASE_URL: "THIS_PROJECT_BASE_URL"
    };

    export default config;
    ```
4. Start the frontend application locally using `npm run start`

## Testing
Of course, no software will be complete without automated testing!
We can create AAA quality tests by following the AAA principle which is, Arrange-Act-Assert.

You run Cypress and the e2e test by,
1. Running `npm run cypress:open` in the root directory
2. E2E Testing
3. Select the browser you want to run on
4. Select `spec.cy.ts` or any test you want to run

<p align="center">
    <img src="./readme/e2etest.gif">
</p>



