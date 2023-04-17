const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RncpTitleSchema = new Schema(
  {
    short_name: {
      type: String,
      default: '',
    },
    long_name: {
      type: String,
      default: '',
    },
    rncp_code: {
      type: String,
      default: '',
    },
    rncp_level: {
      type: String,
      default: '',
    },
    rncp_level_europe: {
      type: String,
      default: '',
    },
    rncp_logo: {
      type: String,
      default: '',
    },
    is_published: {
      type: Boolean,
      default: false,
    },
    is_certifier_also_pc: {
      type: Boolean,
      default: false,
    },
    journal_text: {
      type: String,
      default: '',
    },
    journal_date: {
      type: String,
    },
    classes: [
      {
        type: Schema.ObjectId,
        ref: 'class',
      },
    ],
    status: {
      type: String,
      enum: ['active', 'archived'],
      default: 'active',
    },
    year_of_certification: {
      type: String,
    },
    name_of_signatory: String,
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
    toObject: {
      getters: true,
    },
  }
);

//pre validate functions
RncpTitleSchema.pre('validate', function (next) {
  if (this.isNew || this.isModified('short_name') || this.isModified('long_name') || this.isModified('certifier')) {
    var RncpTitle = mongoose.model('rncp_title');

    RncpTitle.find({
      $and: [
        {
          short_name: this.short_name,
        },
        {
          long_name: this.long_name,
        },
        {
          certifier: this.certifier,
        },
      ],
    }).exec((errFind, schools) => {
      if (errFind || schools.length) {
        return next(new Error('titleExists'));
      } else {
        return next();
      }
    });
  } else {
    return next();
  }
});

const RncpModel = mongoose.model('rncp_title', RncpTitleSchema)

module.exports = { RncpModel }