import React, { useEffect, useState } from "react";
import { Input, Center, Text, Button } from "native-base";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.trim(), password.trim())
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };
  return (
    <Center flex={1}>
      <Text color="darkPurple" fontSize="lg">
        Adresse mail
      </Text>
      <Input
        value={email}
        onChangeText={(text) => setEmail(text)}
        variant="inscription"
        placeholder="exemple@gmail.com"
      />
      <Text color="darkPurple" fontSize="lg">
        Mot de passe
      </Text>
      <Input
        value={password}
        onChangeText={(text) => setPassword(text)}
        variant="inscription"
        placeholder="Mot de passe"
      />
      <Button
        onPress={handleLogin}
        alignSelf="center"
        w={120}
        size="md"
        colorScheme="red"
        _text={{
          fontSize: "lg",
        }}
        variant="rounded"
      >
        Valider
      </Button>
    </Center>
  );
};

export default LoginScreen;
