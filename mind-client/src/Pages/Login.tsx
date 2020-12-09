import React, { useState, useMemo, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";

import { AuthContext } from "../Context/auth";
import { LOGIN_USER } from "../Queries/login";
import { useForm } from "../Utils/hooks";
import { InputData } from "./Register";

type LoginFormType = {
  username?: string;
  password?: string;
};

const Login = (props) => {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState<LoginFormType | undefined>({});

  const initialState: LoginFormType = {
    username: "",
    password: "",
  };

  const { onChange, onSubmit, values } = useForm<LoginFormType>(
    hoistedLoginUser,
    initialState
  );

  const onRequestUpdate = (_, { data: { login: userData } }) => {
    context.login(userData);
    props.history.push("/");
  };

  const onRequestError = (err) => {
    setErrors(err?.graphQLErrors[0]?.extensions?.exception?.errors);
  };

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update: onRequestUpdate,
    onError: onRequestError,
    variables: values,
  });

  function hoistedLoginUser() {
    loginUser();
  }

  const renderInput = (data: InputData) => {
    return <Form.Input {...data} />;
  };

  const renderButton = () => {
    return (
      <Button type="submit" secondary>
        Login
      </Button>
    );
  };

  const errorsLabels = useMemo((): JSX.Element => {
    if (Object.keys(errors).length > 0) {
      return (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => {
              return <li key={value + ""}>{value}</li>;
            })}
          </ul>
        </div>
      );
    }
  }, [errors]);

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} className={loading ? "loading" : ""}>
        {renderInput({
          label: "Username",
          placeholder: "Username..",
          name: "username",
          type: "text",
          value: values.username,
          error: errors.username ? true : false,
          onChange,
        })}
        {renderInput({
          label: "Password",
          placeholder: "Password..",
          name: "password",
          type: "password",
          value: values.password,
          error: errors.password ? true : false,
          onChange,
        })}
        {renderButton()}
      </Form>
      {errorsLabels}
    </div>
  );
};

export default Login;
