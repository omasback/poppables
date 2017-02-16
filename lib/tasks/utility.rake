require 'parallel'

task send_users_to_epsilon: :environment do
  Parallel.each(User.where(contacted_epsilon_at: nil), in_threads: 4) do |user|
    begin
      service = Epsilon::RegistrationService.new
      service.register_user(user)
    rescue StandardError => e
      Raven.capture_exception(e)
    ensure
      user.update_column(:contacted_epsilon_at, Time.now)
    end
  end
end
