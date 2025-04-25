# Special Message Application

A beautiful web application for sharing special messages with authentication and email notifications.

## Features

- User authentication with name and date of birth
- Beautiful UI with animations
- Email notifications for responses
- Secure form submissions
- Real-time validation

## Setup

1. Clone the repository:
```bash
git clone https://github.com/moiz26/finallet.git
cd finallet
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
RECEIVER_EMAIL=your-email@example.com
```

4. For Gmail configuration:
   - Enable 2-Step Verification in your Google Account
   - Generate an App Password:
     - Go to Google Account Security settings
     - Under "2-Step Verification" find "App passwords"
     - Select "Mail" and generate password
     - Use this password in your .env file

## Development

Run the development server:
```bash
npm run dev
```

## Deployment to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add the following environment variables in Vercel:
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `RECEIVER_EMAIL`
4. Deploy!

## Environment Variables

Make sure to set these environment variables in Vercel:

- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: Your Gmail app password
- `RECEIVER_EMAIL`: Email address to receive notifications

## Important Notes

- Make sure to use Gmail App Password instead of your regular Gmail password
- Keep your environment variables secure
- Don't commit the .env file to version control

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Express.js
- Node.js
- Nodemailer 