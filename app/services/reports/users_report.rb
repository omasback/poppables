module Reports
  class UsersReport < BaseReport
    def self.columns
      {
        'Email'           => -> m { m.email },
        'First Name'      => -> m { m.first_name },
        'Last Name'       => -> m { m.last_name },
        'DOB'             => -> m { m.dob },
        'Zip'             => -> m { m.zip_code },
        'Registered At'   => -> m { m.created_at },
        '# of Wins'       => -> m { m.num_wins },
      }
    end

    def row_query
      group = ['users.id', 'users.email', 'users.first_name', 'users.last_name', 'users.dob', 'users.zip_code', 'users.created_at']
      select = ['count(1) as num_wins']
      User.joins(:game_redemptions).select((group + select).join(',')).group(group)
    end
  end
end
