import "../../sass/Register.scss";

const RegisterPage = () => {
  return (
    <>
      <div className="register">
        <div className="container">
          <div className="title">
            <p>Register</p>
          </div>
          <form className="form">
            <input type="text" placeholder="Firstname" />

            <input type="text" placeholder="Lastname" />

            <input type="text" placeholder="Username" />

            <input type="text" placeholder="Password" />

            <button>Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
