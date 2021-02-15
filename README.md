<div align='center'>
<img src='https://user-images.githubusercontent.com/67812737/107834893-a5758900-6d65-11eb-9620-ef91823b7558.png' />
</div>
<h1 align='center'>ClimbInvest Documentation</h1>

<div align='center'>Built with 
<br>
<img src="https://img.icons8.com/color/48/000000/javascript.png"/>
<img src="https://img.icons8.com/color/48/000000/css3.png"/>
<img src="https://img.icons8.com/officel/40/000000/react.png"/>
<img src="https://img.icons8.com/color/48/000000/redux.png"/>
<img src="https://img.icons8.com/color/48/000000/postgreesql.png"/>
</div>
<div align='center'>By
<br>
<a href='https://www.linkedin.com/in/kyle-barthelmes-a5120b51/'>Kyle Barthelmes </a>
</div>
<br>
<div align='center' style='font-size: 25px'>
<a href='https://climbinvest.herokuapp.com/'>Live Link</a>
</div>


## Summary
ClimbInvest is a simulated stock trading platform that serves as a great risk-free exposure to the world of investing. Sign-up to be rewarded with an account worth $10,000 in simulated cash and trade your way to the top! Top performers ("Top Climbers") are highlighted on the home page as well as your current portfolio and a financial news feed. All prices are real-time via IEX Cloud Services api. 

## Features
### Dynamic Landing Page
- Changing image for every page visit

![Screen Shot 2021-02-15 at 11 23 29 AM](https://user-images.githubusercontent.com/67812737/107973173-e696b480-6f82-11eb-844e-5fd264a6e308.png)


### Account Portfolio with real-time data via iex cloud api
  - Account totals are updated with every page visit and every trade placed
  - Get recent financial news on home page
  - See list of top 10 ClimbInvest investors

![Screen Shot 2021-02-15 at 11 24 20 AM](https://user-images.githubusercontent.com/67812737/107973338-1d6cca80-6f83-11eb-8eae-a82d285b9400.png)

### Search for stocks and etfs with real-time data and historical 10 day chart
  - See if the market is currently open 
  - 10 day chart rendered with Highcharts JS library

  ![Screen Shot 2021-02-15 at 11 25 29 AM](https://user-images.githubusercontent.com/67812737/107973568-5ad15800-6f83-11eb-8050-f5b68f1266d1.png)

### Dynamic trade page allows you to buy stocks and etfs or sell what you currently have
  - Find valid stocks and etfs
  - Dynamic page responds to what stock you select and how many shares you currently own if any (with sell selection)

  ![Screen Shot 2021-02-15 at 11 25 55 AM](https://user-images.githubusercontent.com/67812737/107973993-f1057e00-6f83-11eb-817f-80ef9aaa7cbb.png)


# Database Schema
<img width="1458" alt="Screen Shot 2021-02-08 at 11 32 37 AM" src="https://user-images.githubusercontent.com/67812737/107974294-5f4a4080-6f84-11eb-869c-f91d34e12c49.png">
<br />

# Usage 

### Demo User
There is a **Demo** login for those wishing to tour the site.

## Contribution
If you would like to contribute to this project in any way, you may take the following steps
  1. Fork this repository
  2. Locally create a new branch `git checkout -b <new branch name>`
  3. Make updates and push branch up to repo `git push -u origin <new branch name>`
  4. Create a pull request
    - Please include clear details of changes 
  
  ### Reporting bugs
  Please report any bugs/issues you may find via opening an issue in this repo

  ## Development
  Follow these steps if you need guidance on setting up and running a local server for this project
  1. Clone or fork this repo
  2. **cd** into **backend** and run `npm install`
  3. **cd** into **frontend** and run `npm install`
  4. Create a **.env** file in the **backend** directory and follow the **.env.example** files
  6. You will need to create a free account with iexcloud to get an api key
  5. Create a postgresql database according to the `DB` sections in **.env.example**
  6. Start your Express server from **backend** with `npm start`
  7. Start your React app from **frontend** with `npm start`
  - Server will be on **http://localhost:3000/**

