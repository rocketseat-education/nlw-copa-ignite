import { useState } from "react";
import { Heading, useToast, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { api } from "../services/api";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');
  
  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleJoinPool() {
    try {
      setIsLoading(true);

      if(!code.trim()) {
        toast.show({
          title: 'Informe o código',
          placement: 'top',
          bgColor: 'red.500'
        });
      }

      await api.post('/pools/join', { code });

      toast.show({
        title: 'Você no bolão com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      });

      navigate('pools');

    } catch (error) {
      console.log(error);
      setIsLoading(false);

      if(error.response?.data?.message === 'Pool not found.') {
        toast.show({
          title: 'Não foi possível encontrar o bolão',
          placement: 'top',
          bgColor: 'red.500'
        });
        return;
      }

      if(error.response?.data?.message === 'You already joined this poll.') {
        toast.show({
          title: 'Você já está nesse bolão',
          placement: 'top',
          bgColor: 'red.500'
        });
        return;
      }
    }
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">

        <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
          Encontre um bolão através de{'\n'}
          seu código único
        </Heading>

        <Input 
          mb={2}
          placeholder="Qual o código do bolão?"
          autoCapitalize="characters"
          onChangeText={setCode}
        />

        <Button
          title="BUSCAR POR CÓDIGO"
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  )
}