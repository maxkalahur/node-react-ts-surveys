import mysql from "mysql";
import mongoose from "mongoose";
import util from "util";
const { Schema } = mongoose;

// preset: npm package.json type: module
// Mongo Setup

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Surveys");
mongoose.set("toJSON", {
    virtuals: true,
    transform: (_, converted) => {
        delete converted._id;
    },
});

const FolderSchema = new Schema({
    sqlId: { type: Number },
    name: { type: String, required: [true, "Field is required"] },
    oraganizationId: { type: Number, unique: true, required: [true, "Field is required"] },
    isActive: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true }
);
const Folder = mongoose.model('Folder', FolderSchema);

const SurveySchema = new Schema({
    sqlId: { type: Number },
    title: { type: String, required: [true, "Field is required"] },
    locationId: { type: Number, unique: true, required: [true, "Field is required"] },
    folder: { type: Schema.Types.ObjectId, ref: 'Folder', index: true, required: [true, "Field is required"] },
    isActive: { type: Boolean, default: true },
    isMultipleProviders: { type: Boolean, default: false },
    isContactPageOff: { type: Boolean, default: false },
    requestContactName: { type: String },
    requestContactEmail: { type: String },
    code: { type: String, unique: true, required: [true, "Field is required"] },
    isLanguageForMedspaOff: { type: Boolean, default: false }
  },
  { versionKey: false, timestamps: true }
);
const Survey = mongoose.model('Survey', SurveySchema);

const ResponderSchema = new Schema({
    sqlId: {type: Number},
    email: { type: String, index: true },
    survey: { type: Schema.Types.ObjectId, ref: 'Survey', index: true, required: [true, "Field is required"] },
    promoterId: { type: String, index: true },
    ehrPlatform: { type: String },
  },
  { versionKey: false, timestamps: true }
);
const Responder = mongoose.model('Responder', ResponderSchema);

const ResponseSchema = new Schema({
    sqlId: { type: Number },
    survey: { type: Schema.Types.ObjectId, ref: 'Survey', index: true, required: [true, "Field is required"] },
    responder: { type: Schema.Types.ObjectId, ref: 'Responder', index: true, required: [true, "Field is required"] },
    deviceType: { type: String, required: [true, "Field is required"] },
    browserType: { type: String, required: [true, "Field is required"] },
    score: { type: Number },
    why: { type: String },
    provider: { type: String },
    name: { type: String },
    isContactMe: { type: Boolean },
    email: { type: String },
    phone: { type: String },
    isActive: { type: Boolean, default: true },
    isCompleted: { type: Boolean, default: false, index: true },
    completedAt:  { type: Date },
    status: { type: ['Opened', 'Started', 'Completed'] }
  },
  { versionKey: false, timestamps: true }
);
const Response = mongoose.model('Response', ResponseSchema);

const RestartedResponseSchema = new Schema({
    response: { type: Schema.Types.ObjectId, ref: 'Response', index: true, required: [true, "Field is required"] },
    score: { type: Number },
    why: { type: String },
    provider: { type: String },
    name: { type: String },
    isContactMe: { type: Boolean },
    email: { type: String },
    phone: { type: String },
  },
  { versionKey: false, timestamps: true }
);
const RestartedResponse = mongoose.model('RestartedResponse', RestartedResponseSchema);

const UserSchema = new Schema({
    apiKey: { type: String, index: true, required: [true, "Field is required"] },
    isSuperAdmin: { type: Boolean, required: [true, "Field is required"] },
  },
  { versionKey: false, timestamps: true }
);
const User = mongoose.model('User', UserSchema);


// MySQL setup and data transfer

const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 7001,
  user     : 'surveys',
  password : '123123',
  database : 'surveys'
});

connection.connect();

const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

new Promise( function(resolve, reject) {
    connection.query('SELECT * FROM folders', async function(err, rows, fields) {
      if (err) throw err;
      for (let index = 0; index < rows.length; index++) {

        const row = rows[index];

        await new Folder({
          sqlId: row.id,
          name: row.name,
          oraganizationId: row.org_id,
          isActive: row.active,
        }).save();
      }

      resolve();
    });
  }
).then((res) => {
  return new Promise( function(resolve, reject) {
    connection.query('SELECT * FROM surveys', async function(err, rows, fields) {
      if (err) throw err;
      for (let index = 0; index < rows.length; index++) {
    
        const row = rows[index];
    
        const folder = await Folder.findOne({ sqlId: row.folder_id }).exec();
    
        await new Survey({
          sqlId: row.id,
          title: row.title,
          locationId: row.loc_id,
          folder: folder.id,
          isActive: row.active,
          isMultipleProviders: row.is_multiple_providers,
          isContactPageOff: row.is_contact_page_off,
          requestContactName: row.request_contact_name,
          requestContactEmail: row.request_contact_email,
          code: row.code,
          isLanguageForMedspaOff: row.is_language_for_medspa_off
        }).save()
      }

      resolve();
    });
  });


}).then(res => {
  return new Promise( function(resolve, reject) {

    connection.query('SELECT * FROM responders', async function(err, rows, fields) {
      if (err) throw err;
      for (let index = 0; index < rows.length; index++) {
    
        const row = rows[index];
    
        const survey = await Survey.findOne({ sqlId: row.survey_id }).exec();

        if( survey ) {
          await new Responder({
            sqlId: row.id,
            email: row.email,
            survey: survey.id,
            promoterId: row.promoter_id,
            ehrPlatform: row.ehr_platform,
          }).save();
        }
      }
      resolve();
    });

  });
}).then(res => {
    return new Promise( async function(resolve, reject) {

      // need to add index `response_items`.`response_id`
      const rows = await util.promisify(connection.query).call( connection, `SELECT *from responses` );
    
      for (let index = 0; index < rows.length; index++) {
    
        let row = rows[index];
    
        if( row.id%100 === 0 ) {
          console.log(row.id)
        }

        const rows2 = await util.promisify(connection.query).call( connection, `SELECT * FROM response_items WHERE response_id=${row.id}`);
    
        for (let index2 = 0; index2 < rows2.length; index2++) {
        
          let row2 = rows2[index2];
    
          if( row2.item_type.includes('MultipleChoiceItem') ) {
            row.provider = row2.answer;
          }
          else if( row2.item_type.includes('QuestionItem') ) {
            row.why = row2.answer;
          }
          else if( row2.item_type.includes('PatientNameItem') || row2.item_type.includes('PatientNameDetractorItem') ) {
            row.name = row2.answer;
          }
          else if( row2.item_type.includes('ConditionalItem') ) {
            row.isContactMe = row2.answer === 'Yes' ? 1 : 0;
          }
          else if( row2.item_type.includes('ContactItem') ) {
    
            const rows3 = await util.promisify(connection.query).call( connection, `SELECT * FROM response_item_multis WHERE response_item_id=${row2.id}`);
    
            for (let index3 = 0; index3 < rows3.length; index3++) {
    
              let row3 = rows3[index3];
    
              if( regexExp.test(row3.answer) ) {
                row.email = row3.answer;
              }
              else {
                row.phone = row3.answer;
              }
            }
          }
        }
      }
      
      resolve(rows);

    });
}).then(res => {
  return new Promise( async function(resolve, reject) {
    
    for (let index = 0; index < res.length; index++) {
    
      let row = res[index];

      const survey = await Survey.findOne({ sqlId: row.survey_id }).exec();
      const responder = await Responder.findOne({ sqlId: row.responder_id }).exec();

      if( responder && survey ) {
        await new Response({
          sqlId: row.id,
          survey: survey.id,
          responder: responder.id,
          deviceType: row.device_type,
          browserType: row.browser_type,
          score: row.score,
          
          why: row.why,
          provider: row.provider,
          name: row.name,
          isContactMe: row.isContactMe,
          email: row.email,
          phone: row.phone,
    
          isActive: row.active,
          isCompleted: row.complete,
          completedAt: row.completed_at,
          status: row.status
        }).save();
      }
    }
    resolve();
    
  });
}).then(res => {

  connection.query('SELECT * FROM restarted_responses', async function(err, rows, fields) {
    if (err) throw err;
    for (let index = 0; index < res.length; index++) {
    
      let row = res[index];

      const response = await Response.findOne({ sqlId: row.response_id }).exec();

      if( response ) {

        await new RestartedResponse({
          response: response.id,
          score: row.score,
          why: row.why,
          provider: row.provider,
          name: row.name,
          isContactMe: row.is_contacted === 'Yes' ? 1 : 0,
          email: row.email,
          phone: row.phone,
        }).save();
      }
    }
    resolve();

  });


}).then(res => {

  connection.query('SELECT * FROM users', async function(err, rows, fields) {
    if (err) throw err;
    for (let index = 0; index < res.length; index++) {
    
      let row = res[index];

      new User({
        apiKey: row.api_key,
        isSuperAdmin: row.is_superadmin,
      }).save()
    }
    resolve();

  });

}).then(res => {

  connection.end();

  let res = await Folder.updateMany({}, { $unset: { sqlId: 1 } }, { strict: true } );
  console.log('Modified: '+res.modifiedCount);
  res = await Responder.updateMany({}, { $unset: { sqlId: 1 } }, { strict: true } );
  console.log('Modified: '+res.modifiedCount);
  res = await Response.updateMany({}, { $unset: { sqlId: 1 } }, { strict: true } );
  console.log('Modified: '+res.modifiedCount);
  res = await Survey.updateMany({}, { $unset: { sqlId: 1 } }, { strict: true } );
  console.log('Modified: '+res.modifiedCount);

  resolve();
}).catch(e => {
  console.log(e.message);
});


