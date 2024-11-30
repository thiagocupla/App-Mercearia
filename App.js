import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const App = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [description, setDescription] = useState('');

  const handleCadastro = () => {
    if (!productName || !price || !description || !quantity) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios, exceto data de validade.');
      return;
    }

    // Validação de preço
    const numericPrice = parseFloat(price.replace(/[^0-9,-]+/g, '').replace(',', '.'));
    if (numericPrice <= 0) {
      Alert.alert('Erro', 'O preço deve ser maior que zero.');
      return;
    }

    // Validação de quantidade
    if (parseInt(quantity) <= 0) {
      Alert.alert('Erro', 'A quantidade deve ser um número maior que zero.');
      return;
    }

    // Validação de formato da data
    if (expiryDate && !/^\d{2}\/\d{2}\/\d{4}$/.test(expiryDate)) {
      Alert.alert('Erro', 'A data de validade deve estar no formato DD/MM/AAAA.');
      return;
    }

    Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
    setProductName('');
    setPrice('');
    setDescription('');
    setQuantity('');
    setExpiryDate('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cadastro de Produtos</Text>

      <Text style={styles.label}>Nome do Produto</Text>
      <TextInputMask
        type={'custom'}
        options={{ mask: '******************************' }}
        style={styles.input}
        placeholder="Digite o nome do produto"
        value={productName}
        onChangeText={setProductName}
      />

      <Text style={styles.label}>Preço</Text>
      <TextInputMask
        type={'money'}
        options={{
          precision: 2,
          separator: ',',
          delimiter: '.',
          unit: 'R$ ',
          suffixUnit: '',
        }}
        style={styles.input}
        placeholder="Digite o preço"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Quantidade</Text>
      <TextInputMask
        type={'only-numbers'}
        style={styles.input}
        placeholder="Digite a quantidade"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Data de Validade (opcional)</Text>
      <TextInputMask
        type={'datetime'}
        options={{ format: 'DD/MM/YYYY' }}
        style={styles.input}
        placeholder="Digite no formato DD/MM/AAAA"
        value={expiryDate}
        onChangeText={setExpiryDate}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInputMask
        type={'custom'}
        options={{ mask: '******************************' }}
        style={styles.textArea}
        placeholder="Digite uma breve descrição"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <Button title="Cadastrar Produto" onPress={handleCadastro} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
});

export default App;