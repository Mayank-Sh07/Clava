const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.promoteUser = functions.https.onCall(async (data, context) => {
  const user = await admin.auth().getUserByEmail(data.email);
  if (context.auth.token.email !== "mayank.sharma2019@vitstudent.ac.in") {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only Administrator can request this endpoint"
    );
  } else if (user.customClaims && user.customClaims.member === true) {
    throw new functions.https.HttpsError(
      "already-exists",
      "User is already a club Member"
    );
  } else return admin.auth().setCustomUserClaims(user.uid, { member: true });
});
