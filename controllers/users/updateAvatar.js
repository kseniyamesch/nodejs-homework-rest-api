const fs = require ("fs").promises;
const path = require("path");
const Jimp = require('jimp')

const {User} = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
try {
    const {path: tempUpload, filename} = req.file;

    Jimp.read(tempUpload)
    .then(avatar => {
      return avatar
        .resize(250, 250) 
        .write(tempUpload); 
    })
    .catch(err => {
      next(err);
    });

    const {_id} = req.user;
    const [extention] = filename.split(".").reverse();
    const avatarName = `${_id}.${extention}`;
    const resultUpload = path.join(avatarsDir, avatarName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", resultUpload);
    await User.findByIdAndUpdate(_id, {avatarURL});
    res.json({
        avatarURL
    })

} catch (error) {
    await fs.unlink(req.file.path);
    throw error;
}
}

module.exports = updateAvatar;