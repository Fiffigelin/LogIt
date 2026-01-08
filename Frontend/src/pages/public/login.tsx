import { useCallback, useState } from "react";
import type { LoginRequestDto } from "../../api/client";
import AuthForm from "../../component/auth-form/auth-form";
import { useAuthContext } from "../../context/auth-context";
import type { RegisterFormModel } from "../../view-models/view-models";

function Login() {
  const [regUser, setRegUser] = useState<RegisterFormModel>({
    fullName: "",
    email: "",
    password: "",
    confirmation: ""
  });
  const [loginUser, setLoginUser] = useState<LoginRequestDto>({
    email: "",
    password: ""
  });
  const {login, register, loading, status, clearStatus } = useAuthContext();

  const handleRegistration = useCallback(
    (property: keyof RegisterFormModel, value: string | undefined) => {
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
      await login(loginUser);
    },
    [login, loginUser]
  ); 

  const handleSubmitRegister = useCallback(async () => {
    const { confirmation, ...apiDto } = regUser;
    const result = await register(apiDto);

    if (result.success) {
      setRegUser({ fullName: "", email: "", password: "", confirmation: "" });
    }
  }, [register, regUser]);


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