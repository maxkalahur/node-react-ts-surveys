require('dotenv').config({path: __dirname + '/../.env'});

const oneMonth = 1000 * 60 * 60 * 24 * 30;

const dev = {
    app: {
        port: parseInt(process.env.PORT!) || 3000,
        session: {
            secret: process.env.APP_KEY!,
            resave: false,
            saveUninitialized: true,
            cookie: { maxAge: oneMonth }
        },
        domain: `http://localhost:9001`
    },
    mongo: {
        url: process.env.MONGO_URL! || 'localhost',
    },
    promoterApi: {
        secretKey: process.env.SURVEY_KEY!,
        domain: process.env.PROMOTER_DOMAIN!,
    }
};

const test = {    
    app: {
        port: parseInt(process.env.PORT!) || 3000,
        session: {
            secret: process.env.APP_KEY!,
            resave: false,
            saveUninitialized: true,
            cookie: { maxAge: oneMonth }
        }
    },
    mongo: {
        url: process.env.MONGO_URL! || 'localhost',
    }
};

const production = {    
    app: {
        port: parseInt(process.env.PORT!) || 3000,
        session: {
            secret: process.env.APP_KEY!,
            resave: false,
            saveUninitialized: true,
            cookie: { maxAge: oneMonth, secure: true }
        }
    },
    mongo: {
        url: process.env.MONGO_URL! || 'localhost',
    }
};

const config: {
    [key: string]: any;
} = {
    dev,
    test,
    production,
};

const env: string = process.env.NODE_ENV!;

export default config[env];