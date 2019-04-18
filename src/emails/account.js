const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'pay.jhosehp@gmail.com',
        subject: 'Welcome to Task Manager',
        text: `Hi ${name}, Welcome to Task Manager app. with this new tool you can create you daily tasks and manage them in one place. Hope you enjoy it and do not hesitate to contact us f you have any question or problem.`
    })

}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'pay.jhosehp@gmail.com',
        subject: 'Sorry to see you go',
        text: `Hi ${name}, we are sorry to see you go but you can come back whenever you want :)`
    })

}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}
