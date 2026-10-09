cmake_minimum_required(VERSION 3.16)
project(ChickenStock)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find packages
find_package(CURL REQUIRED)
find_package(nlohmann_json REQUIRED)

# Add executable
add_executable(${PROJECT_NAME} src/main.cpp)

# Link libraries
target_link_libraries(${PROJECT_NAME} CURL::libcurl nlohmann_json::nlohmann_json)

# Include directories
target_include_directories(${PROJECT_NAME} PRIVATE include/)