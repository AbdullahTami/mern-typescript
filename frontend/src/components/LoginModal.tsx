import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LoginCredentials } from "../api/note_api";
import * as NoteApi from "../api/note_api";
import { Button, Form, Modal } from "react-bootstrap";
import styleUtils from "../styles/utils.module.css";

import TexInputField from "./form/TexInputField";

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

export default function LoginModal({
  onDismiss,
  onLoginSuccessful,
}: LoginModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await NoteApi.login(credentials);
      onLoginSuccessful(user);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TexInputField
            register={register}
            registerOptions={{ required: "Please provide a username" }}
            placeholder="Username"
            name="username"
            label="Username"
            type="text"
            error={errors.username}
          />
          <TexInputField
            register={register}
            registerOptions={{ required: "Please provide a password" }}
            placeholder="Password"
            name="password"
            label="Password"
            type="text"
            error={errors.password}
          />
          <Button
            disabled={isSubmitting}
            type="submit"
            className={styleUtils.fullWidth}
          >
            Log in
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
