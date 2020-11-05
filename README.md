
# Safe and Secure Elections 🇺🇸

## About ❓
The Safe and Secure Elections project is a collaborative effort at Georgia Tech to develop tools that will allow Fulton 
County election officials to balance competing demands of election management, help enhance security and safety during 
the Covid-19 pandemic at polling locations, reduce voting waiting times, and expand access.

This repository contains both a chatbot and website that allow voters in Fulton County to search for their polling
place and check live, estimated wait times reported by other voters. Express and React were used for our technology stack,
with Twilio providing the chatbot service.

## Setup 🛠

### Requirements 📝
1. First step is to clone or download this repository to your computer.
2. Make sure you have [Homebrew](https://brew.sh) installed.
3. Open your terminal and install Node: `brew install node`
4. Also install MariaDB: `brew install mariadb`
5. Once MariaDB installs, make sure to start it: `mysql.server start`

### Database ⚡️
Before working with databases, I highly recommend applying for a [JetBrains Education License](https://www.jetbrains.com/shop/eform/students).
There is a desktop app they have called DataGrip that's a life saver for database management. Download it or any other SQL
database IDE you're comfortable with.

Once you have it installed, open your terminal. We're going to create a new database user you'll need for accessing the database.
The `<>` characters denote values where you should insert your own information.
1. Start a MySQL session: `mysql`
2. Create a new database: `create database sse_db;`
3. Use that database: `use sse_db;`
4. Create a new user: `create user '<username>'@'localhost' identified by '<password>';`
5. Grant privileges to that user: `grant all privileges on sse_db.* to '<username>'@'localhost';`

Now that you've created a new database, along with a user that has access to it, you can use this to connect to the database.
Switch to your IDE of choice and create a new connection. For DataGrip, you can click the `+ > Data Source > MariaDB` on the left side panel
to create a new connection. Enter your credentials and click `Ok`. You're now connected to your database!

Finally, we need to set up the database structure. 
1. Open the `database` folder in the repository and copy the `sse_database.sql`code. 
2. Go back to DataGrip and open a new query console by right clicking on your database in the left side panel and clicking
`New > Query Console`
3. Paste the code you copied into the console and click the green play button in the toolbar to run it.

### App 🔥
Now to set up the actual app and website.
1. Open your terminal and `cd` into the repository
2. Run `sh install.sh` to install packages for the frontend and backend
3. Create a new file in the `app` folder called `.env`. This is where your database credentials and other important information goes.
4. Type all your environment variables with their respective values:
    - NODE_ENV=development
    - PORT=5000
    - DB_HOST=localhost
    - DB_DATABASE=sse
    - DB_USER=<your_database_user>
    - DB_PASSWORD=<your_database_password>
    - SECRET=<random_characters>
5. Save the file
6. Finally, open two separate terminal windows. In the first, `cd` into `app` and run `npm start`. In the second, do the 
same, but in the `frontend` folder.

The app should now be running locally on your computer!

## Data 🤓
Polling location information is located in the `database` folder. Just copy and paste the SQL code into DataGrip and execute it
to import them.

A python script was written to extract this data from the [Fulton County Government Website](https://gisdata.fultoncountyga.gov/datasets/voting-polls) and import it into the database
through a CSV. This is located in the `data` folder.

## Contact 📩
Email [koohang@gatech.edu](mailto:koohang@gatech.edu) if you have any questions.

