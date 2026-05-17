import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://921ed8d02b8531d229b09edafcf395e6@o4511407792062464.ingest.us.sentry.io/4511407794290688',
  tracesSampleRate: 0.1,
  enableLogs: true,
})
