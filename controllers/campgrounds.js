const Campground = require('../models/campground');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const token = process.env.MAPBOX_TOKEN
const geocoder = mbxGeocoding({accessToken: token})
const {cloudinary} = require('../cloudinary')



module.exports.renderIndex = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })}

module.exports.renderNewForm = (req, res) => {
        res.render('campgrounds/new')}


module.exports.new = async (req, res, next) => {
            const geodata = await geocoder.forwardGeocode({query: req.body.campground.location, limit: 1}).send()
            const campground = new Campground(req.body.campground);
            campground.geometry = await geodata.body.features[0].geometry 
            campground.images = req.files.map(f => ({url: f.path, filename: f.filename}))
            campground.author = req.user._id
            await campground.save();
            console.log(campground.geometry)
            req.flash('success', 'New campground added!');
            res.redirect(`/campgrounds/${campground._id}`)
        }

module.exports.renderDetails = async (req, res,) => {
    const campground = await Campground.findById(req.params.id).populate(
        {
          path: 'reviews',
          populate: {path: 'author'}  
        }
    ).populate('author');
    if(!campground){
        req.flash('error', 'campground not found');
        return res.redirect('/campgrounds')
    }
    
    res.render('campgrounds/show', { campground });
}

module.exports.renderEdit = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
        res.render('campgrounds/edit', { campground });
}

module.exports.update = async (req, res) => {
    const { id } = req.params;
    console.log(req.body)
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}))
    campground.images.push(...imgs)
    if(req.body.deleteImages){
        for(filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename)
        }
    await campground.updateOne({$pull:{images: {filename:{$in: req.body.deleteImages}}}})
    
}
    await campground.save()
    req.flash('success', 'Succesfully updated campground')
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.delete = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Campground Deleted')
    res.redirect('/campgrounds');
}