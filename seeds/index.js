const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: { type: 'Point', coordinates: [cities[random1000].longitude, cities[random1000].latitude ] },
            images: [
                {
                  
                  url: 'https://res.cloudinary.com/dguuftkii/image/upload/v1611972843/YelpCamp/oyqd4ljbnfq97oadxugy.jpg',
                  filename: 'YelpCamp/oyqd4ljbnfq97oadxugy'
                },
                {
                 
                  url: 'https://res.cloudinary.com/dguuftkii/image/upload/v1611972843/YelpCamp/zm8huk12wlpestl4cf5e.jpg',
                  filename: 'YelpCamp/zm8huk12wlpestl4cf5e'
                },
                {
                  
                  url: 'https://res.cloudinary.com/dguuftkii/image/upload/v1611972843/YelpCamp/o9dvxm5k0iyaw2u5vxge.jpg',
                  filename: 'YelpCamp/o9dvxm5k0iyaw2u5vxge'
                }
              ],
            author: '600a4c168b81780694d1ffc9',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})