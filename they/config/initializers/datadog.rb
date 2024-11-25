require 'datadog'


Datadog.configure do |c|
  # Add additional configuration here.
  # Activate integrations, change tracer settings, etc...
  c.tracing.instrument :rails
  c.service = 'they'
  c.env = 'dev'
  c.tracing.log_injection = true
  c.agent.port = 8136
  
end 
