# rubocop:disable Style/GuardClause

module Epsilon
  class NoOauthToken < StandardError; end

  class Client
    attr_accessor :user

    # "user" param should be a hash containing
    # - epsilon_profile_id
    # - email
    # - first_name
    # - last_name
    # - zip_code
    # - birthday (format TBD)
    def initialize(user)
      @user = user
    end

    def add_profile
      params = user_to_params

      resp = conn.post('/CPGWebServices/Profile/AddProfile/data') do |request|
        request.headers['Authorization'] = "VENDOR #{oauth_token}"
        request.headers['Content-Type'] = 'application/json'
        request.body = params.to_json
      end

      user[:epsilon_profile_id] = JSON.parse(resp.body)['NewProfileID']
      resp
    end

    def update_profile
      params = user_to_params
      params.merge('ProfileID' => user[:epsilon_profile_id])

      conn.post('/CPGWebServices/Profile/UpdateProfile/data') do |request|
        request.headers['Authorization'] = "VENDOR #{oauth_token}"
        request.headers['Content-Type'] = 'application/json'
        request.body = params.to_json
      end
    end

    def opt_in(sqaid)
      params = {
        'TransactionID' => transaction_id,
        'ClientID' => ENV['EPSILON_CLIENT_KEY'],
        'ProfileID' => user[:epsilon_profile_id],
        'SurveyProfileResponses' => [
          'SurveyQuestionAnswerID' => sqaid,
        ],
      }

      conn.post('/CPGWebServices/Survey/AddSurveyProfileResponses/data') do |request|
        request.headers['Authorization'] = "VENDOR #{oauth_token}"
        request.headers['Content-Type'] = 'application/json'
        request.body = params.to_json
      end
    end

    def get_profile_details
      params = {
        'ClientID' => ENV['EPSILON_CLIENT_KEY'],
        'ProfileID' => user[:epsilon_profile_id],
        'UserID' => user[:email],
      }

      conn.post('/CPGWebServices/Profile/GetProfileDetails/data') do |request|
        request.headers['Authorization'] = "VENDOR #{oauth_token}"
        request.headers['Content-Type'] = 'application/json'
        request.body = params.to_json
      end
    end

    def add_promotion(ccid)
      params = {
        'TransactionID' => transaction_id,
        'ClientID' => ENV['EPSILON_CLIENT_KEY'],
        'ProfileID' => user[:epsilon_profile_id],
        'PromotionResponses' => [
          'CampaignControlID' => ccid,
          'RecordDate' => "/Date(#{Time.now.to_i * 1000})/",
        ],
      }

      conn.post('/CPGWebServices/Promotion/AddPromotionResponses/data') do |request|
        request.headers['Authorization'] = "VENDOR #{oauth_token}"
        request.headers['Content-Type'] = 'application/json'
        request.body = params.to_json
      end
    end

    def transaction_id
      return @transaction_id if @transaction_id
      @transaction_id = conn.post('/CPGWebServices/Transaction/GetTransactionId/data').body[1..-2]
    end

    def oauth_token
      return @oauth_token if @oauth_token
      query_string = hash_to_query_string(grant_type: 'vendor',
                                          client_id: ENV['EPSILON_CLIENT_KEY'],
                                          client_secret: ENV['EPSILON_CLIENT_SECRET'])
      resp = conn.post "/CPGWebServices/Oauth2/AuthenticateVendor/Authorize?#{query_string}"
      data = JSON.parse(resp.body)
      if data['Success']
        @oauth_token = data['AccessToken']
      else
        raise NoOauthToken, resp.body
      end
    end

    protected

    def user_to_params
      {
        'Address' => {
          'ChannelCode' => 'AD',
          'ChannelLocationID' => 'P',
          'Country' => 'US',
          'DeliveryStatus' => 'G',
          'PostalCode' => user[:zip_code],
          'Status' => 'A',
          'IsPreferred' => 'Y',
        },
        'Emails' => [{
          'ChannelCode' => 'EM',
          'ChannelLocationID' => 'P',
          'DeliveryStatus' => 'G',
          'EmailAddr' => user[:email],
          'Status' => 'A',
          'IsPreferred' => 'Y',
        }],
        'FirstName' => user[:first_name],
        'LastName' => user[:last_name],
        'UserID' => '',
        'BirthDate' => user[:birthday] ? user[:birthday].strftime('%m/%d/%Y') : '',
        'AccountVerifyDate' => nil,
        'EncryptionType' => 0,
        'GlobalOptOut' => 0,
        'TransactionID' => transaction_id,
        'ClientID' => ENV['EPSILON_CLIENT_KEY'],
      }
    end

    def hash_to_query_string(h)
      h.map { |k, v| "#{k}=#{v}" }.join('&')
    end

    def conn
      @conn ||= Faraday.new(url: ENV['EPSILON_BASE_URL'], ssl: { verify: false })
    end
  end
end
