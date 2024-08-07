import React, { Fragment, useState } from "react";
import { Navigate } from "react-router-dom";
import { Input } from "@ibrahimstudio/input";
import { Button } from "@ibrahimstudio/button";
import { useDocument } from "../libs/plugins/document";
import { useAuth } from "../libs/security/auth";
import { inputValidator } from "../libs/helpers";
import { SEO } from "../libs/plugins/seo";
import { PageLayout } from "../components/layouts/pages";
import Section from "../components/layouts/section";
import Form, { FormHead, FormFieldset } from "../components/user-inputs/form";
import { Image } from "../components/contents/image";

const LoginPage = () => {
  const { short } = useDocument();
  const { isLoggedin, login } = useAuth();
  const id = `${short}-login`;
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const requiredFields = ["username", "password"];
    const validationErrors = inputValidator(inputData, requiredFields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await login(inputData, "origin");
    } catch (error) {
      console.error("error when trying to login:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedin) {
    return <Navigate to="/" />;
  }

  return (
    <Fragment>
      <SEO title="Login" route="/login" />
      <PageLayout pageid={id}>
        <Section>
          <Form onSubmit={handleLogin}>
            <FormHead title="Login" desc="Login dulu biar bisa komen, bikin konten dan atur notifikasi konten favoritmu. Yuk!" />
            <FormFieldset>
              <Input id={`${id}-username`} isLabeled={false} type="text" name="username" value={inputData.username} placeholder="Telepon atau Email" isRequired onChange={handleInputChange} errorContent={errors.username} />
              <Input id={`${id}-password`} isLabeled={false} type="password" name="password" value={inputData.password} placeholder="Password" isRequired onChange={handleInputChange} errorContent={errors.password} />
            </FormFieldset>
            <FormFieldset>
              <Button id={`${id}-submit-login`} type="submit" isFullwidth buttonText="Login" isLoading={loading} />
              <Button id={`${id}-submit-forgot`} isFullwidth variant="hollow" color="var(--color-primary)" buttonText="Lupa Password?" />
            </FormFieldset>
            <FormFieldset>
              <Button id={`${id}-fb-oauth`} isFullwidth variant="line" color="var(--color-secondary)" buttonText="Masuk dengan Facebook" startContent={<Image style={{ width: "var(--pixel-20)", height: "auto", position: "relative" }} src="/svg/fb-auth.svg" />} onClick={() => {}} />
              <Button id={`${id}-g-oauth`} isFullwidth variant="line" color="var(--color-secondary)" buttonText="Masuk dengan Google" startContent={<Image style={{ width: "var(--pixel-20)", height: "auto", position: "relative" }} src="/svg/gm-auth.svg" />} onClick={() => {}} />
            </FormFieldset>
            <FormFieldset startContent="Belum Punya Akun?">
              <Button id={`${id}-signup`} isFullwidth variant="line" color="var(--color-primary)" buttonText="Daftar Sekarang" onClick={() => {}} />
            </FormFieldset>
          </Form>
        </Section>
      </PageLayout>
    </Fragment>
  );
};

export default LoginPage;
