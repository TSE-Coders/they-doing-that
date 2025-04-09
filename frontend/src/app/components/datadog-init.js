   // Necessary if using App Router to ensure this file runs on the client
   "use client";
    
    import { datadogRum } from "@datadog/browser-rum";
    
    datadogRum.init({
      applicationId: "96a16c07-262b-45de-9785-fee4549fad0c",
      clientToken: "pub6a0a7c0d0afc72660183c1ca15f9926a'",
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
    
    export default function DatadogInit() {
      // Render nothing - this component is only included so that the init code
      // above will run client-side
      return null;
    }
   
