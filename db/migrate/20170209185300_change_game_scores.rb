class ChangeGameScores < ActiveRecord::Migration[5.0]
  def change
    remove_column :game_scores, :user_id
    add_column :game_scores, :initials, :string, null: false
  end
end
