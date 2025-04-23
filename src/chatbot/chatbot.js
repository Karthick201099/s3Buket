const dialogFlow = require("dialogflow");
const { PROJECT_ID, PRIVATE_KEY, CLIENT_EMAIL } = require("../config");
const uuid = require("uuid");

const projectId = PROJECT_ID;
const sessionId = uuid.v4();

const credentials = {
    client_email: CLIENT_EMAIL,
    private_key: PRIVATE_KEY
};

const sessionClient = new dialogFlow.SessionsClient({ projectId, credentials });

const textQuery = async (usertext, userId) => {
    try {
        // Validate inputs
        console.log("Project ID:", projectId);
        console.log("Session ID:", sessionId);
        console.log("User ID:", userId);

        const sessionPath = sessionClient.sessionPath(projectId, `${userId || "default"}-${sessionId}`);

        const request = {
            session: sessionPath,
            queryInput: { // Corrected key name
                text: {
                    text: usertext,
                    languageCode: "en-US",
                },
            },
        };

        const response = await sessionClient.detectIntent(request);
        console.log("Dialogflow response:", response);
        return response[0].queryResult.fulfillmentText;
    } catch (err) {
        console.error("Error in Dialogflow query:", err.message);
        throw err; // Rethrow the error for better handling upstream
    }
};

module.exports = {
    textQuery,
};
