#!/bin/bash

# Start Ruby on Rails API
(cd /Users/daniel.calderon/Projects/they-doing-that/they && rails s) &

sleep 5

# Start Next.js application
(cd /Users/daniel.calderon/Projects/they-doing-that/tdt-frontend && npm run dev) &
