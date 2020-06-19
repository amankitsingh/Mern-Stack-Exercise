const express = require("express");
const router = express.Router();
const Exercise = require("../models/exercise.model");

const permitted_params = ['username', 'description', 'duration', 'date']

const {
    route
} = require("./users");


// get the list of all the exercise in the db
router.get("/", (req, res) => {
    Exercise.find()
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error:' + err));
});

// get the specific exercise id from db
router.get("/:id", (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error:' + err));
});


// add the new execise in db
router.post("/add", (req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    })

    newExercise.save()
        .then(() => res.json("Exercise Added"))
        .catch(err => res.status(400).json('Error:' + err));
});

function validate_request_params(params) {
    if (params.id.length != 24) {
        return ('No a valid request!!');
    }
}
// delete the exercise in db
router.delete("/:id", (req, res) => {
    validate = [];
    validate["error"] = validate_request_params(req.params);
    if (validate["error"])
        res.json(validate["error"]);

    Exercise.findByIdAndDelete(req.params.id)
        .then((err) => {
            if (err != null)
                res.json('Exercise Deleted!!');
            else
                res.json('No data found!!');
        })
        .catch(err => {
            res.status(400).json('Error:' + err);
            console.log(err);
        });
});


// update the exisiting exercise in db 
router.put("/update/:id", (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            if (req.body.username)
                exercise.username = req.body.username;
            if (req.body.description)
                exercise.description = req.body.description;
            if (req.body.duration)
                exercise.duration = Number(req.body.duration);
            if (req.body.date)
                exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated'))
                .catch(err => res.status(400).json('Error:' + err));
        })
        .catch(err => res.status(400).json('Error Occured while updating:' + err));
});

// export the exercise to server
module.exports = router;