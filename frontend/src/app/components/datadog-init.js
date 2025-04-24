   "use client";
    
    import { datadogRum } from "@datadog/browser-rum";
    import { datadogLogs } from '@datadog/browser-logs';

    datadogLogs.logger.setHandler("http"); // or "console" for local debugging
    datadogLogs.logger.setLevel("info");   // You can adjust this to debug, warn, error, etc.
    
    datadogRum.init({
      applicationId: "96a16c07-262b-45de-9785-fee4549fad0c",
      clientToken: "pub6a0a7c0d0afc72660183c1ca15f9926a",
      site: "datadoghq.com",
      service: "tdt-frontend",
      env: "development",
      // Specify a version number to identify the deployed version of your application in Datadog
      // version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: "mask-user-input",
      allowedTracingUrls: [(url) => url.startsWith("http://localhost:3001/")],
    });

    datadogLogs.init({
      clientToken: "pub6a0a7c0d0afc72660183c1ca15f9926a",
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
   
