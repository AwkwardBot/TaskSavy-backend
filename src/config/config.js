const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string()
            .valid('production', 'development', 'test')
            .required(),
        PORT: Joi.number().default(3000),
        MONGODB_URL: Joi.string().required().description('Mongo DB url'),
        JWT_SECRET: Joi.string().required().description('JWT secret key'),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
            .default(30)
            .description('minutes after which access tokens expire'),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
            .default(30)
            .description('days after which refresh tokens expire'),
        JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
            .default(10)
            .description('minutes after which reset password token expires'),
        JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
            .default(10)
            .description('minutes after which verify email token expires'),
        GOOGLE_CLIENT_ID: Joi.string()
            .required()
            .description('Google OAUTH Client ID'),
        GOOGLE_CLIENT_SECRET: Joi.string()
            .required()
            .description('Google OAUTH Secret Key'),
        GITHUB_CLIENT_ID: Joi.string()
            .required()
            .description('GITHUB Secret Key'),
        GITHUB_CLIENT_SECRET: Joi.string()
            .required()
            .description('GITHUB Secret Key'),
        SMTP_HOST: Joi.string().description('server that will send the emails'),
        SMTP_PORT: Joi.number().description(
            'port to connect to the email server'
        ),
        SMTP_USERNAME: Joi.string().description('username for email server'),
        SMTP_PASSWORD: Joi.string().description('password for email server'),
        EMAIL_FROM: Joi.string().description(
            'the from field in the emails sent by the app'
        ),
        QB_APP_ID: Joi.number().description('QuickBlox App ID').required(),
        QB_AUTH_KEY: Joi.string().description('QuickBlox Auth Key').required(),
        QB_AUTH_SECRET: Joi.string().description('QuickBlox Auth Secret').required(),
        QB_ACC_KEY: Joi.string().description('QuickBlox Account Key').required(),
        QB_BASE_URL: Joi.string().description('QuickBlox Base Url').required(),
        QB_API_KEY: Joi.string().description('QuickBlox Api key').required(),

        SB_API_TOKEN: Joi.string().description('SendBird Api key').required(),
        SB_BASE_URL: Joi.string().description('SendBird Base Url').required(),

    })
    .unknown(true);

const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    google_client_id: envVars.GOOGLE_CLIENT_ID,
    google_client_secret: envVars.GOOGLE_CLIENT_SECRET,
    github_client_id: envVars.GITHUB_CLIENT_ID,
    github_client_secret: envVars.GITHUB_CLIENT_SECRET,
    quickBlox_app_id: envVars.QB_APP_ID,
    quickBlox_auth_key: envVars.QB_AUTH_KEY,
    quickBlox_auth_secret: envVars.QB_AUTH_SECRET,
    quickBlox_acc_key: envVars.QB_ACC_key,
    quickblox_api_key: envVars.QB_API_KEY,
    quickblox_base_url: envVars.QB_BASE_URL,

    sendbird_api_token: envVars.SB_API_TOKEN,
    sendbird_base_url: envVars.SB_BASE_URL,

    mongoose: {
        url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false 
        }
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes:
            envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes:
            envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
    },
    email: {
        smtp: {
            host: envVars.SMTP_HOST,
            port: envVars.SMTP_PORT,
            auth: {
                user: envVars.SMTP_USERNAME,
                pass: envVars.SMTP_PASSWORD
            }
        },
        from: envVars.EMAIL_FROM
    }
};
