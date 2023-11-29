import Sign from "./Sign";

function Register({ onSubmit }) {
  return (
    <Sign title={"Регистрация"} buttonText={"Зарегистрироваться"} onSubmit={onSubmit} name={"sign-in"} visibleSignIn={true}/>
  );
}

export default Register;
