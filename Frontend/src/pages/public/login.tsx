import { useCallback, useState } from "react";
import type { LoginRequestDto, RegisterUserDto } from "../../api/client";
import AuthForm from "../../component/auth-form/auth-form";
import { useAuthContext } from "../../context/auth-context";

function Login() {
  const [regUser, setRegUser] = useState<RegisterUserDto>({
    username: "",
    email: "",
    password: ""
  });
  const [loginUser, setLoginUser] = useState<LoginRequestDto>({
    email: "",
    password: ""
  });
  const {login, register, loading} = useAuthContext();

  const handleRegistration = useCallback(
    (property: keyof RegisterUserDto, value: string | undefined) => {
      setRegUser((prevState) => {
        return {
          ...prevState,
          [property]: value,
        };
      });
    },
    []
  );

  const handleLogin = useCallback(
    (property: keyof LoginRequestDto, value: string | undefined) => {
      setLoginUser((prevState) => {
        return {
          ...prevState,
          [property]: value,
        };
      });
    },
    []
  );
  
  const handleSubmitLogin = useCallback(
    async () => {
      console.log(loginUser);
      await login(loginUser);
    },
    [login, loginUser]
  ); 

  const handleSubmitRegister = useCallback(
    async () => {
      await register(regUser);
    },
    [register, regUser]
  ); 

  return (
    <section className="flex justify-center min-h-screen w-full">
      <AuthForm
        registrationUser={regUser}
        loginUser={loginUser}
        loading={loading}
        onRegistration={handleRegistration}
        onLogin={handleLogin}
        onSubmitLogin={handleSubmitLogin}
        onSubmitRegister={handleSubmitRegister}
      />
    </section>
  )
}

export default Login;