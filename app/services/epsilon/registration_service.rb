# rubocop:disable Rails/Output

module Epsilon
  class RegistrationService
    def register_user(user)
      client = Epsilon::Client.new(
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        zip_code: user.zip_code,
        birthday: user.dob,
        epsilon_profile_id: user.epsilon_profile_id,
      )

      resp = client.add_profile
      unless client.user[:epsilon_profile_id]
        p JSON.parse(resp.body)
        raise StandardError, "Failed to generate epsilon_profile_id for user #{user.email}"
      end

      client.add_promotion(ENV['EPSILON_PROMOTION_ID'])
      client.opt_in(ENV['EPSILON_SQAID']) if user.opt_in

      user.epsilon_profile_id = client.user[:epsilon_profile_id]
      user.save!

      puts "Added #{user.email} to epsilon"
      user
    end
  end
end
