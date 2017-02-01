class CreateGameScores < ActiveRecord::Migration[5.0]
  def change
    create_table :game_scores do |t|
      t.references  :user
      t.string      :game, null: false
      t.integer     :score, null: false
      t.boolean     :win, default: false, null: false

      t.timestamps null: false
    end

    add_index :game_scores, [:game, :score]
    add_index :game_scores, :game

    add_foreign_key :game_scores, :users, on_delete: :cascade
  end
end
