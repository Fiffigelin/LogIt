import { useCallback, useState } from "react";
import type { LoginRequestDto, RegisterRequestDto } from "../../api/client";
import AuthForm from "../../component/auth-form/auth-form";
import { useAuthContext } from "../../context/auth-context";

function Login() {
  const [regUser, setRegUser] = useState<RegisterRequestDto>({
    fullName: "",
    email: "",
    password: ""
  });
  const [loginUser, setLoginUser] = useState<LoginRequestDto>({
    email: "",
    password: ""
  });
  const {login, register, loading, status, clearStatus } = useAuthContext();

  const handleRegistration = useCallback(
    (property: keyof RegisterRequestDto, value: string | undefined) => {
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
        status={status}
        clearStatus={clearStatus}
        onRegistration={handleRegistration}
        onLogin={handleLogin}
        onSubmitLogin={handleSubmitLogin}
        onSubmitRegister={handleSubmitRegister}
      />
    </section>
  )
}

export default Login;