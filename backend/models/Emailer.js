import NodeMailer from 'nodemailer'

    import { google } from 'googleapis';

export default async function Emailer (receiver,subject,text){

    

    const CLIENT_ID = '86329919887-80vce67hj7sju62qp8cso53d7fl11mb2.apps.googleusercontent.com'
    const CLIENT_SECRET = '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'
    const REFRESH_TOKEN = '1//04sk0RjaNRyNKCgYIARAAGAQSNwF-L9IrF1QS-qayzRyj1lfhkiLGd01yLF9FEmslABXIIPR8_wO-HhsP47ReHhJizECuqXmO45Q'
    const REDIRECT_URL = 'https://developers.google.com/oauthplayground'

// Generate SMTP service account from ethereal.

    const  oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
    oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});


        try{
            const accessToken = await oAuth2Client.getAccessToken()

            const transport = NodeMailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: 'sdmtester0107@gmail.com',
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken
                },
            });

            const mailOptions = {

                from: 'SDM Information Systems Team <sdmtester0107@gmail.com>',

                to: receiver,

                // Subject of the message
                subject: subject,

                // plaintext body
                text: text,

                // HTML body
                // html: <p><b>Hello</b> to myself </p>,
                };

                const result = transport.sendMail(mailOptions)
                return result;


            } catch (error){
                return error;
            }


}

