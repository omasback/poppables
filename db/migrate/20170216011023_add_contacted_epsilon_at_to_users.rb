class AddContactedEpsilonAtToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :contacted_epsilon_at, :datetime
    add_index :users, :contacted_epsilon_at

    add_column :users, :epsilon_profile_id, :string
  end
end
