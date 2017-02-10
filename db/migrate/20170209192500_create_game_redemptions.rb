class CreateGameRedemptions < ActiveRecord::Migration[5.0]
  def change
    create_table :game_redemptions do |t|
      t.references :user
      t.string :game, null: false
      t.string :result, null: false
      t.string :pin_code, null: false
      t.timestamps null: false
    end
  end
end
