# NasaProject

The NASA Exoplanet Mission Scheduler is a comprehensive web application designed to facilitate the scheduling and exploration of habitable planets. Built upon the vast dataset provided by NASA's Exoplanet Archive, which collected information from the Kepler spacecraft launched into space in 2009, this app empowers users to delve into the exciting world of exoplanets.

With the NASA Exoplanet Mission Scheduler, users can leverage the power of data gathered by Kepler, which observed hundreds of thousands of stars and unveiled over four thousand planets. The app allows users to filter and discover habitable planets based on their own custom criteria. This robust filtering system ensures that users can narrow down their search to planets that meet specific requirements, such as size, distance from their star, and potential for sustaining life.

To enhance the experience further, the app integrates with the SpaceX API, providing users with up-to-date information on all launches made by SpaceX. This integration allows users to stay informed about the latest advancements in space exploration and witness the remarkable progress made by commercial space ventures.


## Technologies

- NodeJS, Express, Javascript, MongoDB, Mongoose, Docker, PM2, REST

## Created ES2 server on AWS. See live demo:

[nasa-project-live](http://3.83.232.210:5000/)

## Architecture Diagram


  <kbd>
    <img src="/assets/diagram.png" alt="book-home" width="800">
  </kbd>


## Endpoints

Planets:

- GET: http://3.83.232.210:5000/v1/planets

Launches:

- GET: http://3.83.232.210:5000/v1/launches
- POST: http://3.83.232.210:5000/v1/launches 
      body: {      
        mission: String,
        rocket: String,
        launchDate: Date,
        target: String }
- DELETE: http://3.83.232.210:5000/v1/launches/id


# Getting Started

To get a local copy up and running follow these simple example steps.


### Download it as a ZIP file
or

### Clone it in your local machine using GIT
to get a local copy , clone the repository using git clone
(git@github.com:Sanja969/NasaProject.git)

After you clone it run  the following commands:

- npm install
- create MongoDB database in MongoDB Atlas and create your own dotenv mongo data for connecting to database 
- npm run server

## Authors

👤 **Sanja Mandic**

I am an aspiring web developer from Serbia.
- GitHub: [@sanjaGit](https://github.com/Sanja969)
- Twitter: [@sanjaTwit](https://twitter.com/SanjaMandic42)
- LinkedIn: [@sanjaIn](https://linkedin.com/in/sanja-mandic-823995a2/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
