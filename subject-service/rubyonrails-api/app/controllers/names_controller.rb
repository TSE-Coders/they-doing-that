class NamesController < ApplicationController
  before_action :set_name, only: %i[ show update destroy ]

  # GET /names
  def index
    @names = Name.all

    render json: @names
  end

  # GET /names/1
  def show
    render json: @name
  end

  # GET /name/random

  def setRandomName
    randomId = Name.randomName
    @name = Name.find(randomId)
    render json: @name, status: :accepted
  end

  # POST /names
  def create
    @name = Name.new(name_params)

    if @name.save
      render json: @name, status: :created, location: @name
    else
      render json: @name.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /names/1
  def update
    if @name.update(name_params)
      render json: @name
    else
      render json: @name.errors, status: :unprocessable_entity
    end
  end

  # DELETE /names/1
  def destroy
    @name.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_name
      @name = Name.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def name_params
      params.expect(name: [ :name ])
    end
end
