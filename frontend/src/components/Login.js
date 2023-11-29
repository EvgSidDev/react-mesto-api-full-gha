import Sign from "./Sign";

function Login({ onSubmit }) {
  return (
    <Sign title={"Вход"} buttonText={"Войти"} onSubmit={onSubmit} name={"sign-in"} visibleSignIn={false}/>
  );
}

export default Login;
