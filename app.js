const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


const questions = [
    {
        question: "What is the capital of France?",
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answer: "Mars"
    }
];

app.get('/', (req, res) => {
    res.render('home');
});
app.get('/Day-1', (req, res) => {
    res.render('quiz', { questions });
})
app.post('/submit', (req, res) => {
    const submittedAnswers = req.body;

    // Compare submitted answers with the correct answers
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (submittedAnswers[`answer${i}`] === questions[i].answer) {
            score++;
        }
    }

    // Render the score page with the calculated score
    res.render('score', { score, questions });
});

app.listen(3000, () => {
    console.log('Quiz app running on port 3000');
});


module.exports = app