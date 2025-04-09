require 'datadog'


Datadog.configure do |c|
  # Add additional configuration here.
  # Activate integrations, change tracer settings, etc...
  c.tracing.instrument :rails
  c.service = 'they-api'
  c.env = 'tdt'
  c.tracing.log_injection = true
  c.agent.port = 8136
  c.tracing.instrument :pg, comment_propagation: 'service'
  c.diagnostics.startup_logs.enabled = false
  
end 
