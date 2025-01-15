/*--------------------------Hamburger nav--------------------------------*/

function toggleNav() {
    const navMobile = document.querySelector('.nav-mobile');
    const navLinks = document.querySelector('.nav-link');
    navMobile.classList.toggle('show-nav');
    navMobile.innerHTML = navLinks.innerHTML; // Copy links to the mobile menu
}

// function toggleNav() {
//     const navMobile = document.querySelector('.nav-mobile');
//     const isNavVisible = navMobile.classList.contains('show-nav');

//     if (isNavVisible) {
//         navMobile.classList.remove('show-nav');
//     } else {
//         navMobile.classList.add('show-nav');
//         if (!navMobile.hasChildNodes()) {
//             const navLinks = document.querySelector('.nav-link');
//             const linksHTML = navLinks ? navLinks.innerHTML : '';
//             navMobile.innerHTML = linksHTML;
//         }
//     }
// }

// Ensure click outside the menu closes it
window.addEventListener('click', (event) => {
    const navMobile = document.querySelector('.nav-mobile');
    const hamburger = document.querySelector('.hamburger');

    if (navMobile.classList.contains('show-nav') && !hamburger.contains(event.target) && !navMobile.contains(event.target)) {
        navMobile.classList.remove('show-nav');
    }
});




/*----------Contact page---------------------*/

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        emailInput.classList.add('invalid');
        emailError.textContent = 'Email is invalid.';
    } else {
        emailInput.classList.remove('invalid');
        emailError.textContent = '';
        alert('Message sent successfully!');
    }
});



document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('http://localhost:3000/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, subject, message }),
        });

        if (response.ok) {
            alert('Email sent successfully!');
        } else {
            alert('Failed to send email.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred.');
    }
});





const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send', async (req, res) => {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    const mailOptions = {
        from: email,
        to: 'mangeshnavghare1250@gmail.com',
        subject: `${subject} - Message from ${name}`,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
