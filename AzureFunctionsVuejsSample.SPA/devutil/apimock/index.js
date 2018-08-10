var MockAdapter = require('axios-mock-adapter')

export default (instance) => {
  let mock = new MockAdapter(instance, {
    delayResponse: 1000 // 擬似的に1000msの遅延を発生
  })

  // enviroment mock data
  const envdata = {
    AZURE_FUNCTIONS_ENDPOINT: 'http://localhost:7071/api'
  }
  const base64envjson = window.btoa(unescape(encodeURIComponent(JSON.stringify(envdata))))
  mock.onGet('/env.php').reply(200, base64envjson)

  mock.onGet('/.auth/me').reply(200, [{
    access_token: '__API_MOCK_DUMMY_TOKEN__',
    user_id: 'apimockdummy@example.com'
  }])

  // Recall that the order of handlers is significant
  // Note that passThrough requests are not subject to delaying by delayResponse.
  mock.onAny().passThrough()
}
