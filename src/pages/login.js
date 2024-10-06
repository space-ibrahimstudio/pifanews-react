import React, { Fragment, useState } from "react";
import { Navigate } from "react-router-dom";
import { Input } from "@ibrahimstudio/input";
import { Button } from "@ibrahimstudio/button";
import { useDocument, inputValidator } from "../libs/plugins/helpers";
import useAuth from "../libs/guards/auth";
import useGraph from "../components/content/graph";
import { SEO } from "../libs/plugins/seo";
import Page, { Container, Section, Header } from "../components/layout/frames";
import Form from "../components/formel/form";
import Img from "../components/media/image";

const LoginPage = () => {
  const { short } = useDocument();
  const { isLoggedin, login } = useAuth();
  const { H1, P } = useGraph();
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
      await login(inputData);
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
      <Page pageid={id}>
        <Container alignSelf="stretch" alignItems="center">
          <Form as="portal" onSubmit={handleLogin}>
            <Header isasChild>
              <H1 size="lg" color="var(--color-primary)" align="center">
                Login
              </H1>
              <P align="center">Login dulu biar bisa komen, bikin konten dan atur notifikasi konten favoritmu. Yuk!</P>
            </Header>
            <Section alignItems="center" gap="var(--pixel-10)">
              <Input id="username" isLabeled={false} type="text" name="username" value={inputData.username} placeholder="Telepon atau Email" isRequired onChange={handleInputChange} errorContent={errors.username} />
              <Input id="password" isLabeled={false} type="password" name="password" value={inputData.password} placeholder="Password" isRequired onChange={handleInputChange} errorContent={errors.password} />
            </Section>
            <Section alignItems="center" gap="var(--pixel-10)">
              <Button id="submit-login" type="submit" isFullwidth buttonText="Login" isLoading={loading} />
              <Button id="submit-forgot" isFullwidth variant="hollow" color="var(--color-primary)" buttonText="Lupa Password?" />
            </Section>
            <Section alignItems="center" gap="var(--pixel-10)">
              <Button id="fb-oauth" isFullwidth variant="line" color="var(--color-secondary)" buttonText="Masuk dengan Facebook" startContent={<Img style={{ width: "var(--pixel-20)", height: "auto", position: "relative" }} src="/svg/fb-auth.svg" />} onClick={() => {}} />
              <Button id="g-oauth" isFullwidth variant="line" color="var(--color-secondary)" buttonText="Masuk dengan Google" startContent={<Img style={{ width: "var(--pixel-20)", height: "auto", position: "relative" }} src="/svg/gm-auth.svg" />} onClick={() => {}} />
            </Section>
            <Section alignItems="center" gap="var(--pixel-10)">
              <P size="xsm" align="center">
                Belum Punya Akun?
              </P>
              <Button id="signup" isFullwidth variant="line" color="var(--color-primary)" buttonText="Daftar Sekarang" onClick={() => {}} />
            </Section>
          </Form>
        </Container>
      </Page>
    </Fragment>
  );
};

export default LoginPage;
