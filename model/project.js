var mongoose = require('./db.js');

var project_schema = new mongoose.Schema(
    {
        project_id: Number,
        project_detail: {
            project_name: String, 
            project_id: Number
        },
        notifications: [
            {
                headlines: String,
                date: String,
                link: String,
                text: String,
                icon_type:String
            }   
        ]
    }
);

var project = mongoose.model('project', project_schema);

module.exports = project;