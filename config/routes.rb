Rails.application.routes.draw do
      namespace :admin do
      resource :sessions, only: [:new, :create, :destroy]
    end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
