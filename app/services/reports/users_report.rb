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
        'Epsilon Opt In'  => -> m { m.opt_in ? 'yes' : 'no' },
      }
    end

    def row_query
      User
    end
  end
end
