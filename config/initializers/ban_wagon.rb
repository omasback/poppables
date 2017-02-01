def configure_ban_wagon
  BanWagon.configure(
    game_start_user: {
      limit: ENV['LOAD_TEST'] ? 5000 : 5,
      period: 23,
      ban_time: 5.minutes,
      meta: {
        user: true,
        desc: 'started a game',
      },
    },
    game_start_ip: {
      limit: ENV['LOAD_TEST'] ? 15000 : 15,
      period: 1.minute,
      ban_time: 5.minutes,
      meta: {
        desc: 'started a game',
      },
    },
    game_win_user: {
      limit: ENV['LOAD_TEST'] ? 3000 : 3,
      period: 23,
      ban_time: 11.minutes,
      meta: {
        user: true,
        desc: 'won a game',
      },
    },
    game_win_ip: {
      limit: ENV['LOAD_TEST'] ? 12000 : 12,
      period: 1.minute,
      ban_time: 5.minutes,
      meta: {
        desc: 'won a game',
      },
    },
    game_start_logged_out: {
      limit: ENV['LOAD_TEST'] ? 3000 : 3,
      period: 5.minute,
      ban_time: 20.minutes,
      meta: {
        user: true,
        desc: 'started a game while logged out then logged in',
      },
    },
  )
end

configure_ban_wagon

Rails.configuration.to_prepare do
  configure_ban_wagon
end
