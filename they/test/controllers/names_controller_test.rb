require "test_helper"

class NamesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @name = names(:one)
  end

  test "should get index" do
    get names_url, as: :json
    assert_response :success
  end

  test "should create name" do
    assert_difference("Name.count") do
      post names_url, params: { name: { name: @name.name } }, as: :json
    end

    assert_response :created
  end

  test "should show name" do
    get name_url(@name), as: :json
    assert_response :success
  end

  test "should update name" do
    patch name_url(@name), params: { name: { name: @name.name } }, as: :json
    assert_response :success
  end

  test "should destroy name" do
    assert_difference("Name.count", -1) do
      delete name_url(@name), as: :json
    end

    assert_response :no_content
  end
end
