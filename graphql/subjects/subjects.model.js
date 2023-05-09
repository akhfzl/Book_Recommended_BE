const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema(
  {
    subject_name: {
      type: String,
      default: '',
    },
    coefficient: {
      type: Number,
      min: 0,
      default: '',
    },
    minimum_score_for_certification: {
      type: Number,
      default: '',
    },
    count_for_title_final_score: {
      type: Boolean,
      default: true,
    },
    max_point: {
      type: Number,
      //min: 0,
      //max: 100,
      default: '',
    },
    rncp_title: {
      type: Schema.ObjectId,
      ref: 'rncp_title',
    },
    status: {
      type: String,
      enum: ['active', 'deleted'],
      default: 'active',
    },
    order: {
      type: Number,
    },
    page_break: {
      type: Boolean,
      default: false,
    },
    is_pfe: {
      type: Boolean,
      default: false,
    },
    credit: {
      type: Number,
      default: 0,
    },
    is_specialization: {
      type: Boolean,
      default: false,
    },
    pass_case: {
      case1: {
        type: Number,
        default: 0,
      },
      case2: {
        type: Number,
        default: 0,
      },
      case3: {
        type: Number,
        default: 0,
      },
      elimination_score: {
        type: Number,
        default: 0,
      },
    },
    is_subject_transversal_block: {
      type: Boolean,
      default: false,
    },
    books: [
      {
        title: {
          type: String
        },
        category: {
          type: String
        },
        book_id:  { type: Schema.ObjectId, ref: 'book'},
      }
    ],
  },
  {
    timestamps: true,
  }
);

const BookSchema = new Schema({
  title: { type: String },
  author: { type: String },
  google_id: { type: String },
  recommender: { type: String },
  recommender_count: { type: Number },
  category: { type: String },
  publication_date: { type: Number },
  pages: { type: Number },
  category_type: { type: String },
  url_image: {type: String},
  status: {type: String, default: 'active'}
})

const BookRecommendersSchema = new Schema({
  ISBN : { type: String },
	status : { type: String },
	image_url_m : { type: String },
	book_author : { type: String },
	book_title : { type: String },
	image_url_l : { type: String },
	publisher : { type: String },
	year_publication : { type: Number },
	image_url_s : { type: String },
  category_type: { type: String },
  status: {type: String, default: 'active'}
})

const SubjectModel = mongoose.model('subject', SubjectSchema);
const BookModel = mongoose.model('book', BookSchema);
const BookRecommenderModel = mongoose.model('book_recommender', BookRecommendersSchema);

module.exports = { SubjectModel, BookModel, BookRecommenderModel }