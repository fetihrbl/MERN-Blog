import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({ message: "Api is working" });
};

export const updateUser = async (req, res, next) => {
  try {
    // 1) kimlik kontrolü
    if (!req.user || req.user.id !== req.params.userId) {
      return next(errorHandler(403, "You are not allowed to update this user"));
    }

    // 2) updates objesi sadece var olan alanları içerecek
    const updates = {};

    // password
    if (req.body.password) {
      if (typeof req.body.password !== "string" || req.body.password.length < 6) {
        return next(errorHandler(400, "Password must be at least 6 characters"));
      }
      updates.password = await bcryptjs.hash(req.body.password, 10);
    }

    // username
    if (req.body.username) {
      const username = String(req.body.username);
      if (username.length < 7 || username.length > 20) {
        return next(errorHandler(400, "Username must be between 7 and 20 characters"));
      }
      if (username.includes(" ")) {
        return next(errorHandler(400, "Username cannot contain spaces"));
      }
      if (username !== username.toLowerCase()) {
        return next(errorHandler(400, "Username must be lowercase"));
      }
      if (!/^[a-z0-9]+$/.test(username)) {
        return next(errorHandler(400, "Username can only contain letters and numbers"));
      }
      updates.username = username;
    }

    // email (basit kontrollü)
    if (req.body.email) {
      const email = String(req.body.email).trim();
      // basit email kontrolü (isteğe bağlı daha güçlü kontrol ekleyebilirsin)
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        return next(errorHandler(400, "Invalid email format"));
      }
      updates.email = email;
    }

    // Eğer updates boşsa değiştirecek bir şey yok
    if (Object.keys(updates).length === 0) {
      return res.status(200).json({ message: "No changes provided" });
    }

    // 3) güncelleme
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

    // 4) parola dönülmemesi için kopya oluşturup password alanını kaldır
    const userObj = updatedUser.toObject();
    delete userObj.password;

    return res.status(200).json(userObj);
  } catch (err) {
    console.error("updateUser error:", err);
    // Eğer errorHandler beklenen şekilde çalışıyorsa:
    if (err && err.status && err.message) {
      return next(err);
    }
    // Aksi halde genel hata gönder
    return next(errorHandler(500, err.message || "Internal Server Error"));
  }
};
