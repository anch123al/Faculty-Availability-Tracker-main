const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
admin.initializeApp();

// Cloud Function: createUser
exports.createUser = functions.https.onCall(async (data, context) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new functions.https.HttpsError("invalid-argument", "Email and password are required");
  }

  try {
    // Check if the user already exists
    const userRecord = await admin.auth().getUserByEmail(email);
    return { message: "User already exists", uid: userRecord.uid };
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      // If user doesn't exist, create a new one
      const newUser = await admin.auth().createUser({
        email,
        password,
      });

      return { message: "User created successfully", uid: newUser.uid };
    } else {
      // Handle unexpected errors
      throw new functions.https.HttpsError("unknown", error.message);
    }
  }
});
