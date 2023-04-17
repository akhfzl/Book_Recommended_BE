const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const StudentSchema = new Schema(
    {
      rncp_title: { type: Schema.ObjectId, ref: 'rncp_title'},
      incorrect_email: {
        type: Boolean,
        default: false,
      },
      first_name: {
        type: String,
        default: '',
      },
      last_name: {
        type: String,
        default: '',
      },
      first_name_used: {
        type: String,
        default: '',
      },
      last_name_used: {
        type: String,
        default: '',
      },
      civility: {
        type: String,
        enum: ['MR', 'MRS', 'neutral', null],
      },
      sex: {
        type: String,
        enum: ['M', 'F', 'N', null],
        default: null,
      },
      email: {
        type: String,
        default: '',
      },
      email_before_change_to_lower_case: {
        type: String,
        default: '',
      },
      professional_email: {
        type: String,
        default: '',
      },
      date_of_birth: {
        type: String,
      },
      age: {
        type: Number,
      },
      description: {
        type: String,
        default: '',
      },
      identification_type: {
        type: String,
        default: '',
      },
      identification_number: {
        type: String,
        default: '',
      },
      place_of_birth: {
        type: String,
        default: '',
      },
      nationality: {
        type: String,
        default: '',
      },
      nationality_second: {
        type: String,
        default: '',
      },
      photo: {
        type: String,
        default: '',
      },
      is_photo_in_s3: {
        type: Boolean,
        default: false,
      },
      photo_s3_path: {
        type: String,
        default: '',
      },
      tele_phone: {
        type: String,
        default: '',
      },
      home_telephone: {
        type: String,
        default: '',
      },
      city_of_birth: {
        type: String,
        default: '',
      },
      country_of_birth: {
        type: String,
        default: '',
      },
      postal_code_of_birth: {
        type: String,
        default: '',
      },
      student_address: [
        {
          address: {
            type: String,
            default: '',
          },
          additional_address: {
            type: String,
            default: '',
          },
          postal_code: {
            type: String,
            default: '',
          },
          city: {
            type: String,
            default: '',
          },
          region: {
            type: String,
            default: '',
          },
          department: {
            type: String,
            default: '',
          },
          country: {
            type: String,
          },
          country_of_birth: { type: String },
          city_of_birth: { type: String },
          post_code_of_birth: { type: String },
          is_main_address: {
            type: Boolean,
            default: false,
          },
        },
      ],
      parents: [
        {
          relation: {
            type: String,
            default: '',
          },
          family_name: {
            type: String,
            default: '',
          },
          name: {
            type: String,
            default: '',
          },
          sex: {
            type: String,
            enum: ['F', 'M', null],
            default: null,
          },
          civility: {
            type: String,
            enum: ['MR', 'MRS', 'neutral', null],
            default: null,
          },
          is_same_address: {
            type: Boolean,
            default: false,
          },
          job: {
            type: String,
            default: '',
          },
          professional_email: {
            type: String,
            default: '',
          },
          profession: {
            type: String,
            default: '',
          },
          tele_phone: {
            type: String,
            default: '',
          },
          email: {
            type: String,
            default: '',
          },
          parent_address: [
            {
              address: {
                type: String,
                default: '',
              },
              postal_code: {
                type: String,
                default: '',
              },
              city: {
                type: String,
                default: '',
              },
              region: {
                type: String,
                default: '',
              },
              department: {
                type: String,
                default: '',
              },
              country: {
                type: String,
              },
              is_main_address: {
                type: Boolean,
                default: false,
              },
            },
          ],
          financial_support_status: {
            type: String,
            enum: ['not_financial_support', 'pending', 'validated', null],
          },
          is_parent_also_payment_support: { type: Boolean, default: false },
          iban: { type: String, default: '' },
          bic: { type: String, default: '' },
          account_holder_name: { type: String, default: '' },
          autorization_account: { type: Boolean, default: false },
          cost: Number,
          is_contact_person_in_emergency: Boolean
        },
      ],
      status: {
        type: String,
        enum: ['active', 'pending', 'deleted'],
        default: 'pending',
      },
      student_title_status: {
        type: String,
        enum: ['current_active', 'completed', 'suspended', 'deactivated', 'retaking'],
        default: 'current_active',
      },
      allow_final_transcript_gen: {
        type: Boolean,
        default: false,
      },
      certificate_issuance_status: {
        type: String,
        enum: ['sent_to_student', 'details_confirmed', 'details_need_revision', 'certificate_issued', 'details_revision_done'],
      },
      specialization: { type: Schema.ObjectId, ref: 'specialization' },
      certificate_issued_on: {
        year: Number,
        month: Number,
        date: Number,
      },
      certificate_pdf_link: {
        type: String,
      },
      identity_verification_status: {
        type: String,
        enum: ['not_sent', 'sent_to_student', 'details_confirmed', null],
        default: 'not_sent',
      },
      final_transcript_pdf_link: {
        type: String,
      },
      is_thumbups_green: {
        type: Boolean,
        default: false,
      },
      parallel_intake: {
        type: Boolean,
        default: false,
      },
      is_take_full_prepared_title: { type: Boolean, default: false },
      is_have_exemption_block: { type: Boolean, default: false },
      is_candidate_mentor: { type: Boolean, default: false },
      cpeb_ft_pdf: {
        type: String,
      },
      academic_pro_evaluation: {
        status: { type: String, enum: ['sent', 'opened', 'submitted'] },
      },
      soft_skill_pro_evaluation: {
        status: { type: String, enum: ['sent', 'opened', 'submitted'] },
      },
      grand_oral_pdfs: [
        {
          grand_oral_pdf_student: String,
          grand_oral_pdf_jury: String,
          grand_oral_pdf_result_student: String,
          grand_oral_pdf_result_jury: String,
          grand_oral_pdf_generation_dates: [
            {
              grand_oral_pdf_moved_date: '',
              grand_oral_pdf_moved_time: '',
              grand_oral_pdf_student: String,
              grand_oral_pdf_jury: String,
            },
          ],
        },
      ],
      grand_doc_n1b_sent: Boolean,
      school_mail: { type: String },
      initial_intake_channel: { type: String, default: '' },
      financial_situation: { type: String, enum: ['ok', 'not_ok'] },
      student_number: { type: String, default: '' },
      type_of_registration: { type: String, enum: ['readmission', 'admission'] },
      registration_date: {
        date: { type: String, default: '' },
        time: { type: String, default: '' },
      },
      student_status: { type: String, default: '' },
      wallpaper: {
        s3_file_name: String,
        wallpaper: String,
      },
      selected_theme: {
        type: String,
      },
      user_tour: {
        user_tour_finished: Boolean,
        last_user_tour_step: String,
      },
      is_parent_also_payment_support: {
        type: Boolean,
        default: false,
      },
      iban: {
        type: String,
      },
      bic: {
        type: String,
      },
      cost_coverage: {
        type: String,
      },
      account_holder_name: {
        type: String,
      },
      is_student_sent_by_cronjob: { type: Boolean, default: false },
      hyperplanning_id: String,
      is_hyperplanning_updated: Boolean,
      microsoft_email: { type: String, default: '' },
      microsoft_mail_nickname: { type: String, default: '' },
      is_microsoft_account_active: Boolean,
      compressed_photo: {
        type: String,
        default: '',
      },
      microsoft_current_token: {
        access_token: String,
        refresh_token: String,
      },
      psw_str: { type: String },
      psw_hash: { type: String },
      book_interest: [
        {
          title: { type: String },
          book_id: { type: Schema.ObjectId, ref: 'book_recommender'},
          createdAt: { type: String }
        }
      ]
    },
    {
      timestamps: true,
      toJSON: { getters: true },
      toObject: { getters: true },
    }
);

module.exports = mongoose.model('student', StudentSchema)