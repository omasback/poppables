task send_users_to_epsilon: :environment do
  require 'parallel'
  require 'epsilon/registration_service'

  Parallel.each(User.where(contacted_epsilon_at: nil), in_threads: 4) do |user|
    begin
      service = Epsilon::RegistrationService.new
      service.register_user(user)
      user.update_column(:contacted_epsilon_at, Time.now)
    rescue StandardError => e
      puts e
      # Raven.capture_exception(e)
    end
  end
end
