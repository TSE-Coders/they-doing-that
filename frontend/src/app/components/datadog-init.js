   // Necessary if using App Router to ensure this file runs on the client
   "use client";
    
    import { datadogRum } from "@datadog/browser-rum";
    
    datadogRum.init({
      applicationId: process.env.applicationId,
      clientToken: process.env.clientToken,
      site: "datadoghq.com",
      service: "theydoingthat",
      env: "development",
      // Specify a version number to identify the deployed version of your application in Datadog
      version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: "mask-user-input",
      // Specify URLs to propagate trace headers for connection between RUM and backend trace
      allowedTracingUrls: [(url) => url.startsWith("http://localhost:3001/")],
    });
    
    export default function DatadogInit() {
      // Render nothing - this component is only included so that the init code
      // above will run client-side
      return null;
    }
   
