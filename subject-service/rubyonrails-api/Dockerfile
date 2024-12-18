FROM ruby:3.3.4
WORKDIR /they
COPY . . 
ENV BUNDLE_PATH=/gems
RUN bundle install
RUN rails s
EXPOSE 3000
