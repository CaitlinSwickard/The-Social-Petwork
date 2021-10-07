const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
    {
        memebers:{
            type: Array,
        }

    },
    {timestamps:true}
);


module.exports = mongoose.model("Concersation", ConversationSchema);