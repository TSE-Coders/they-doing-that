   // Necessary if using App Router to ensure this file runs on the client
   "use client";
    
   import { datadogRum } from "@datadog/browser-rum";
   import { datadogLogs } from '@datadog/browser-logs';

   datadogLogs.logger.setHandler("http"); // or "console" for local debugging
   datadogLogs.logger.setLevel("info");   // You can adjust this to debug, warn, error, etc.
    
    datadogRum.init({
      applicationId: '38cb2d97-a73c-43b5-b833-23d2a496f1fb',
      clientToken: 'pub20b10fbf688df2e2bfb5270f1ded1306',
      site: "datadoghq.com",
      service: "tdt-frontend",
      env: "tdt",
      silentMultipleInit: true,
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
        { match: "*", propagatorTypes: ["tracecontext"] },
      ],
    });

    datadogLogs.init({
      clientToken: 'pub20b10fbf688df2e2bfb5270f1ded1306',
      site: 'datadoghq.com',
      forwardErrorsToLogs: true,
      silentMultipleInit: true,
      sampleRate: 100,
      service: 'tdt-frontend',
      env: 'tdt',
      tags: ['source:browser', 'team:frontend']
    });
    
    export default function DatadogInit() {
      // Render nothing - this component is only included so that the init code
      // above will run client-side
      return null;
    }
   
