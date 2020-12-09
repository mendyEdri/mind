import React, { useState, useMemo, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";

import { AuthContext } from "../Context/auth";
import { REGISTER_USER } from "../Queries/register";
import {useForm} from '../Utils/hooks';

type InputData = {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  type: string;
  error: boolean;
  onChange: (event: any) => void;
};

type RegisterFormType = {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

const Register = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState<RegisterFormType | undefined>({});

  const initialState: RegisterFormType = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const {onChange, onSubmit, values} = useForm<RegisterFormType>(hoistedRegisterUser, initialState);

  const onRequestUpdate = (_, {data: {register: userData}}) => {
    context.login(userData);
    props.history.push('/')
  }

  const onRequestError = (err) => {
    setErrors(err?.graphQLErrors[0]?.extensions?.exception?.errors);
  }

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update: onRequestUpdate,
    onError: onRequestError,
    variables: values,
  });

  function hoistedRegisterUser() {
      addUser();
  }

  const renderInput = (data: InputData) => {
    return <Form.Input {...data} />;
  };

  const renderButton = () => {
    return (
      <Button type="submit" secondary>
        Register
      </Button>
    );
  };

  const errorsLabels = useMemo((): JSX.Element => {
    if (Object.keys(errors).length > 0) {
      return (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => {
              return (<li key={value + ''}>{value}</li>)
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
          label: "username",
          placeholder: "Username..",
          name: "username",
          type: "text",
          value: values.username,
          error: errors.username ? true : false,
          onChange,
        })}
        {renderInput({
          label: "Email",
          placeholder: "Email..",
          name: "email",
          type: "email",
          error: errors.email ? true: false,
          value: values.email,
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
        {renderInput({
          label: "Confirm Password",
          placeholder: "Confirm Password..",
          type: "password",
          name: "confirmPassword",
          value: values.confirmPassword,
          error: errors.confirmPassword ? true : false,
          onChange,
        })}
        {renderButton()}
      </Form>
      {errorsLabels}
    </div>
  );
};

export default Register;
export type {
    InputData,
    RegisterFormType
};