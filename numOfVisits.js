const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;


app.use(cookieParser());

app.get('/', (req, res) => {
    let visits = req.cookies.visits ? parseInt(req.cookies.visits) : 0;
    let lastVisit = req.cookies.lastVisit ? new Date(req.cookies.lastVisit) : null;

    visits += 1;

    res.cookie('visits', visits, { maxAge: 900000, httpOnly: true });
    res.cookie('lastVisit', new Date().toISOString(), { maxAge: 900000, httpOnly: true });

    let responseMessage = '';

    if (visits === 1) {
        responseMessage = 'Welcome to my webpage! It is your first time that you are here.';
    } else {
        const formatDate = (date) => {
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            const day = days[date.getDay()];
            const month = months[date.getMonth()];
            const dateNum = date.getDate();
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');


            return `${day} ${month} ${dateNum} ${hours}:${minutes}:${seconds} EST ${year}`;
        };

        const lastVisitString = lastVisit ? formatDate(lastVisit) : '';

        responseMessage = `Hello, this is the ${visits} time that you are visiting my webpage. Last time you visited my webpage on: ${lastVisitString} (EST = Eastern Standard Time Zone)`;
    }

    res.send(`
            <p>${responseMessage}</p>
     `);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});





