import { createApp } from 'vue'
import App from './hosted/App.vue'

const app = createApp(App)
app.mount('#app')
// This is needed to calm Vue down when a non critical error is triggered, the app runs fine despite of the error.
// But haven't found a fix for that error as i have trouble determining it's cause, so until then this statement should stay here until it's fixed.
// refer to web console when Hello World app is running and you you will know what errors im talking about
app.config.errorHandler = (err, vm, info) => {
  // Get error and print to console
  console.error(err, info)
}
