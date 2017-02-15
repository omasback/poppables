Rails.application.routes.draw do
  namespace :admin do
    resource :sessions, only: [:new, :create, :destroy]
    resources :reports, only: [:index, :show]
    root to: 'reports#index'
  end

  if ENV['COMING_SOON']
    root to: 'pages#coming_soon'
    break
  end

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    omniauth_callbacks: 'users/omniauth_callbacks',
  }

  resources :games, only: [:index, :show], constraints: { id: /(#{Game::NAMES.keys.join('|')})/ }

  namespace :api do
    resources :games, only: [] do
      collection do
        post :fetch_token
        post :record_score
        get  :leaderboard_status
      end
    end
  end

  get '/about', to: 'pages#about', as: 'about'
  get '/gallery', to: 'pages#gallery', as: 'gallery'
  get '/faq', to: 'pages#faq', as: 'faq'
  get '/upgrade', to: 'pages#upgrade', as: 'upgrade'
  get '/coming-soon', to: 'pages#coming_soon', as: 'coming_soon'
  get '/buy', to: 'pages#where_to_buy', as: 'where_to_buy'

  unless Rails.env.production?
    get '/redemption-winner', to: 'pages#redemption_winner', as: 'redemption_winner'
    get '/redemption-error', to: 'pages#redemption_error', as: 'redemption_error'
  end

  root to: 'pages#home'
end
