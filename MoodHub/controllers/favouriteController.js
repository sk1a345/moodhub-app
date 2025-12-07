const FavouriteItem = require("../models/FavouriteItem");
const { uploadBufferToCloudinary } = require('../utils/cloudinary');

// -------------------------------
// SHOW MAIN PAGE (optional)
// -------------------------------
exports.showMainPage = (req, res) => {
  res.render("favourites/index", {
    currentPage: "favourites",
    pageTitle: "My Favourites"
  });
};

// SHOW ITEMS OF A CATEGORY//e.g all books all movies all music etc.

exports.showCategory = async (req, res) => {
  const { category } = req.params;

  const readableName =
    category.charAt(0).toUpperCase() + category.slice(1);

  const items = await FavouriteItem.find({
    user: req.userId,
    category
  });

  res.render("favourites/category", {
    currentPage: "favourites",
    pageTitle: `My ${readableName}`,
    categoryTitle: readableName,
    category,
    singleName: readableName,
    items,
    defaultPoster: `/images/defaults/${category}.png`,
  });
};

// -------------------------------
// SHOW ADD PAGE
// -------------------------------

exports.showAddPage = (req, res) => {
  const { category } = req.params;
  const readableName =
    category.charAt(0).toUpperCase() + category.slice(1);

  res.render("favourites/category-add", {
    currentPage: "favourites",
    pageTitle: `Add ${readableName}`,
    category,
    singleName: readableName,
  });
};

//Post add itemss:

exports.addItem = async (req, res) => {
  try {
    const { category } = req.params;
    const { title, description, rating, posterUrl } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).send("Title is required");
    }

    let finalPosterUrl;

    // 1️⃣ File Upload
    if (req.file && req.file.buffer) {
      const folder = `favourites/${category}`;
      const uploadResult = await uploadBufferToCloudinary(req.file.buffer, {
        folder,
        resource_type: "image",
        quality: "auto",
        fetch_format: "auto"
      });

      finalPosterUrl = uploadResult.secure_url;
    }

    // 2️⃣ Manual URL
    else if (posterUrl && posterUrl.trim() !== "") {
      finalPosterUrl = posterUrl.trim();
    }

    // 3️⃣ Default image (MATCHES your actual file names)
    else {
      finalPosterUrl = `/images/defaults/${category}.png`;
    }

    await FavouriteItem.create({
      user: req.userId,
      category,
      title: title.trim(),
      description: description?.trim() || "",
      rating: Number(rating) || 0,
      posterUrl: finalPosterUrl
    });

    res.redirect(`/favourites/${category}`);

  } catch (err) {
    console.error("addItem error:", err);
    res.status(500).send("Server error while adding item");
  }
};

module.exports.postDeleteItem = async(req,res,next) =>{
  console.log(req.params);
  console.log(req.userId);
  try{
    const {category, id} = req.params;
    await FavouriteItem.deleteOne({
      _id : id,
      user: req.userId //Ensure user can only delete their own items
    });
    res.redirect(`/favourites/${category}`);
  }catch(err){
    console.log("Delete error: ",err);
    res.status(500).send("Error while deleteing the item");
  }

}