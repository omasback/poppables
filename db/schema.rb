# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170216011023) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "game_redemptions", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "game",       null: false
    t.string   "result",     null: false
    t.string   "pin_code",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_game_redemptions_on_user_id", using: :btree
  end

  create_table "game_scores", force: :cascade do |t|
    t.string   "game",                       null: false
    t.integer  "score",                      null: false
    t.boolean  "win",        default: false, null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.string   "initials",                   null: false
    t.index ["game", "score"], name: "index_game_scores_on_game_and_score", using: :btree
    t.index ["game"], name: "index_game_scores_on_game", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "zip_code"
    t.date     "dob"
    t.boolean  "opt_in"
    t.string   "provider"
    t.string   "uid"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.datetime "contacted_epsilon_at"
    t.string   "epsilon_profile_id"
    t.index ["contacted_epsilon_at"], name: "index_users_on_contacted_epsilon_at", using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

end
