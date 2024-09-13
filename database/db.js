// import mongoose from "mongoose";

// export const connectDb = async () => {
//   try {
//     await mongoose.connect(process.env.DB);
//     console.log("Database Connected");
//   } catch (error) {
//     console.log(error);
//   }
// };
import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      connectTimeoutMS: 10000,  // waktu timeout 10 detik
      socketTimeoutMS: 45000    // waktu timeout 45 detik
    });
    console.log("Database Connected");
  } catch (error) {
    console.log("Error connecting to the database:", error);
  }
};
