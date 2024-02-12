import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { SignUpCredentials } from "../api/note_api";
import * as NoteApi from "../api/note_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TexInputField from "./form/TexInputField";
import styleUtils from "../styles/utils.module.css";
import { useState } from "react";
import { ConflictError } from "../errors/http_errors";

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

export default function SignUpModal({
  onDismiss,
  onSignUpSuccessful,
}: SignUpModalProps) {
  const [errorText, setErrorText] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await NoteApi.signUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      if (error instanceof ConflictError) setErrorText(error.message);
      alert(error);
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TexInputField
            name="username"
            error={errors.username}
            label="username"
            registerOptions={{ required: "Please provide a name" }}
            type="text"
            placeholder="Username"
            register={register}
          />
          <TexInputField
            error={errors.email}
            name="email"
            label="Email"
            registerOptions={{ required: "Please provide an email" }}
            type="email"
            placeholder="email@example.com"
            register={register}
          />
          <TexInputField
            name="password"
            error={errors.password}
            label="Password"
            registerOptions={{ required: "Password required" }}
            type="password"
            placeholder="password"
            register={register}
          />
          <Button
            disabled={isSubmitting}
            type="submit"
            className={styleUtils.fullWidth}
          >
            Sign up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
