   // Necessary if using App Router to ensure this file runs on the client
   "use client";
    
   import { datadogRum } from "@datadog/browser-rum";
   import { datadogLogs } from '@datadog/browser-logs';

   datadogLogs.logger.setHandler("http"); // or "console" for local debugging
   datadogLogs.logger.setLevel("info");   // You can adjust this to debug, warn, error, etc.
    
    datadogRum.init({
      applicationId: "<YOUR_APPLICATION_ID>",
      clientToken: "<YOUR_CLIENT_TOKEN>",
      site: "datadoghq.com",
      service: "tdt-frontend",
      env: "development",
      // Specify a version number to identify the deployed version of your application in Datadog
      // version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 20,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: "mask-user-input",
      // Specify URLs to propagate trace headers for connection between RUM and backend trace
      allowedTracingUrls: [
        { match: "https://example.com/api/", propagatorTypes: ["tracecontext"] },
      ],
    });

    datadogLogs.init({
      clientToken: "<YOUR_CLIENT_TOKEN>",
      site: 'datadoghq.com',
      forwardErrorsToLogs: true,
      sampleRate: 100,
      service: 'frontend',
      env: 'tdt',
      tags: ['source:browser', 'team:frontend']
    });
    
    export default function DatadogInit() {
      // Render nothing - this component is only included so that the init code
      // above will run client-side
      return null;
    }
   
