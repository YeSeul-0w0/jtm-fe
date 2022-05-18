import React from 'react';
import GoToLogin from './components/GoToLogin';
// import EnvConfig from './components/config/EnvConfig';
// import KakaoLogin from './components/kakao/KakaoLogin';
// import InputEmail from './components/kakao/InputEmail';
// import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import SignUp from './components/sign_up/SignUp';
import LoginEmail from './components/login/LoginEmail';
import AppLayout from './components/layout/AppLayout';

function App() {
  // const [REST_API, set_REST_API] = useState<string>('');
  // const [CLIENT_SECRET, set_CLIENT_SECRET] = useState<string>('');

  // useEffect(() => {
  //   axios
  //     .get(EnvConfig.REST_API)
  //     .then(function (res) {
  //       set_REST_API(res.data.result);
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //     });
  //   axios
  //     .get(EnvConfig.CLIENT_SECRET)
  //     .then(function (res) {
  //       set_CLIENT_SECRET(res.data.result);
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //     });
  // }, []);
  // console.log(EnvConfig.REST_API);
  
  return (
    <BrowserRouter>
        
          <Routes>
            <Route element={<AppLayout />}>
              {/* <Route path="/" element={<GoToLogin api={REST_API} />} /> */}
              {/* <Route path="/inputEmail" element={<InputEmail />}></Route> */}
              <Route path="/login" element={<LoginEmail />} />
              {/* <Route
                path="/oauth/kakao/callback"
                element={<KakaoLogin api={REST_API} client={CLIENT_SECRET} />}
                /> */}
              {/* <Route path="/signUp" element={<SignUp />} /> */}
              </Route>
          </Routes>
    </BrowserRouter>
  );
}

export default App;
